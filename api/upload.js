import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false, // Desactiva el parser para manejar archivos grandes
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const form = new formidable.IncomingForm();
  form.uploadDir = "./public/media"; // Carpeta donde se guardarán los archivos
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: "Error al subir el archivo" });
    }

    const oldPath = files.file.filepath;
    const newFileName = `${Date.now()}-${files.file.originalFilename}`;
    const newPath = path.join(process.cwd(), "public/media", newFileName);

    fs.renameSync(oldPath, newPath);

    return res.status(200).json({
      url: `https://kirito-md.vercel.app/media/${newFileName}`,
    });
  });
}