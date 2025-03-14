// api/upload.js

const fs = require('fs');
const path = require('path');
const { nanoid } = require('nanoid');  // Usa nanoid para generar un ID único
const multer = require('multer');

const upload = multer({ dest: 'uploads/' }); // Carpeta temporal para los archivos

module.exports = (req, res) => {
    upload.single('file')(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error al subir el archivo' });
        }

        const file = req.file;
        const uniqueID = nanoid();  // Generar ID único

        const newFilePath = path.join('uploads', uniqueID + path.extname(file.originalname));

        // Renombrar el archivo con el ID único
        fs.renameSync(file.path, newFilePath);

        // Generar la URL personalizada
        const fileUrl = `https://cdnmega.vercel.app/media/${uniqueID}`;

        return res.json({ success: true, url: fileUrl });
    });
};