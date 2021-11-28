import Multer from 'multer';

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {fileSize: 1048576}
});

export default multer;