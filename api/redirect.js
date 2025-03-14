module.exports = (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ success: false, message: 'No se proporcionó URL de la imagen.' });
    }

    // Redirige al enlace de ImgBB directamente
    return res.redirect(url);
};