module.exports = (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ success: false, message: 'No se proporcionó URL de la imagen.' });
    }

    // Decodificar la URL codificada
    const decodedUrl = decodeURIComponent(url);

    // Redirigir a la URL de ImgBB
    return res.redirect(decodedUrl);
};