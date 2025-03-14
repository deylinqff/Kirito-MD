import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    const file = req.body.file; // Suponiendo que envías el archivo en base64
    const fileName = `file_${Date.now()}.jpg`; // Puedes cambiar la extensión según el archivo
    const uploadPath = path.join(process.cwd(), 'api/uploads', fileName);

    try {
        fs.writeFileSync(uploadPath, Buffer.from(file, 'base64'));
        res.status(200).json({ url: `/media/${fileName}` });
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar el archivo' });
    }
}