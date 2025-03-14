const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar almacenamiento de archivos
const storage = multer.diskStorage({
    destination: "public/uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

app.use(express.static("public"));

app.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.json({ success: false, message: "No se subió ningún archivo." });
    }
    res.json({ success: true, url: `https://kirito-md.vercel.app/uploads/${req.file.filename}` });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});