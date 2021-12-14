
import GetRepostitory from '../controller/GetRepostitory';
import { Place } from '../infra/entity/Place';
import { Request, Response, NextFunction } from 'express';

import firebase from "firebase-admin";
import { Attractions } from './entity/Attractions';
const serviceAccount = require('./firebase.json');

const bucket = 'traveller-f5929.appspot.com';

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    storageBucket: bucket
});

const storage = firebase.storage().bucket();


const strategy = (model: 'place' | 'attractions') => {
       const models = {
           place: Place,
           attractions: Attractions
       }
    return GetRepostitory.repostitory(models[model]);
};

export const uploadFiles = (req:Request,res:Response,next:NextFunction) => {
    if(!req.file) return next();
    const img = req.file;

    const array = img.originalname.split('.');
    const type = array[array.length - 1];
    const fileName = `${new Date().getTime()}.${type}`

    const file = storage.file(fileName);

    const stream = file.createWriteStream({
      contentType: img.mimetype
    });

    
    stream.on("error", (err) => console.log(err));
    stream.on("finish", async () => {
        await storage.makePublic();
        next();
    });
    
    req.body.img_url = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${fileName}?alt=media`
    stream.end(img.buffer);

};

export const updateFiles = async (req:Request,res:Response,next:NextFunction) => {
    
    if(!req.file) return next();
    const img = req.file;
    const id = req.params;

    const model = strategy((req.path.split('/')[1]) as 'place' | 'attractions');

    const {img_url} = await model.findOne(id);

    if(!img_url){
        return res.status(400).json({
            message: 'Registro não encontrado'
        });
    }
    
    const fileName = (img_url.split('/o/')[1].split('?')[0]);

    const file = storage.file(fileName);

    const stream = file.createWriteStream({
      contentType: img.mimetype
    });

    
    stream.on("error", (err) => console.log(err));
    stream.on("finish", async () => {
        await storage.makePublic();
        next();
    });
    
    req.body.img_url = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${fileName}?alt=media`;
    stream.end(img.buffer);

};

export const deleteFile = async (req:Request,res:Response,next:NextFunction) => {
    const places = strategy('place');
    const {id} = req.params;

    const toBeDeleted = await places.findOne(id);
    if(!toBeDeleted) return next();

    const fileToDelete = toBeDeleted.img_url;
    const fileName = (fileToDelete.split('/o/')[1].split('?')[0]);

    try {
      await storage.file(fileName).delete({ignoreNotFound: true});
    } catch (error) {
        console.log(error)
    }
    
    next();

};


