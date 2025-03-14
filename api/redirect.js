module.exports = (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ success: false, message: 'No se proporcionó URL de la imagen.' });
    }

    // Generar la URL personalizada con tu dominio
    const customUrl = `https://kirito-md.vercel.app/imagen/${encodeURIComponent(url)}`;

    return res.status(200).json({ success: true, customUrl });
};