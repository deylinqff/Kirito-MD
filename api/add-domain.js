export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).end();

    const { domain, redirect } = req.body;

    const vercelToken = "L1XV0Xe7E47vKGCtuTgUtXXi"; // Usa una variable de entorno
    const projectId = "TU_ID_PROYECTO_VERCE"; // Obténlo desde Vercel

    const response = await fetch(`https://api.vercel.com/v9/projects/${projectId}/domains`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${vercelToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: domain })
    });

    const data = await response.json();
    
    if (data.error) return res.status(400).json({ error: data.error.message });

    // Si se agregó el dominio y hay una redirección, configúrala
    if (redirect) {
        const redirectConfig = await fetch(`https://api.vercel.com/v9/projects/${projectId}/redirects`, {
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

        const redirectData = await redirectConfig.json();
        if (redirectData.error) return res.status(400).json({ error: redirectData.error.message });
    }

    res.status(200).json({ message: "Dominio agregado y redirigido correctamente" });
}