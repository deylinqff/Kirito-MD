export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).end();

    const { domain, redirect } = req.body;

    if (!domain) {
        return res.status(400).json({ error: "El dominio es obligatorio." });
    }

    const vercelToken = process.env.VERCEL_TOKEN; // Asegúrate de usar tu token de Vercel como variable de entorno
    const projectId = process.env.VERCEL_PROJECT_ID; // Tu ID de proyecto de Vercel

    try {
        // Agregar dominio a tu proyecto en Vercel
        const response = await fetch(`https://api.vercel.com/v9/projects/${projectId}/domains`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${vercelToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: domain })
        });

        const data = await response.json();

        if (data.error) {
            return res.status(400).json({ error: data.error.message });
        }

        // Si se agregó el dominio y hay una redirección, configurarla
        if (redirect) {
            const redirectResponse = await fetch(`https://api.vercel.com/v9/projects/${projectId}/redirects`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${vercelToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    source: `https://${domain}`,
                    destination: redirect,
                    permanent: true
                })
            });

            const redirectData = await redirectResponse.json();
            if (redirectData.error) {
                return res.status(400).json({ error: redirectData.error.message });
            }
        }

        // Respuesta de éxito
        res.status(200).json({ message: "Dominio registrado y redirigido correctamente." });
    } catch (error) {
        res.status(500).json({ error: "Error al procesar la solicitud." });
    }
}