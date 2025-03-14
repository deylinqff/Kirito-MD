// api/media/[id].js

const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
    const { id } = req.query;

    const filePath = path.join('uploads', id);

    if (fs.existsSync(filePath)) {
        return res.sendFile(filePath);
    } else {
        return res.status(404).json({ error: 'Archivo no encontrado' });
    }
};