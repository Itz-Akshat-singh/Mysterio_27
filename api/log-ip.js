export default async function handler(req, res) {
    const forwarded = req.headers['x-forwarded-for'];
    const ip = forwarded ? forwarded.split(',')[0] : (req.socket.remoteAddress || "Unknown");

    // Hum direct URL nahi likhenge, Vercel settings se uthayenge
    const discordWebhookUrl = process.env.DISCORD_WEBHOOK;

    if (!discordWebhookUrl) {
        return res.status(500).json({ error: "Webhook URL missing" });
    }

    try {
        await fetch(discordWebhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: `🚀 **New Visitor on Portfolio!**\n**IP:** ${ip}\n**Time:** ${new Date().toLocaleString()}`
            }),
        });
        res.status(200).json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
// Ye line aapke backend (api/log-ip.js) ko call karegi
fetch('/api/log-ip').catch(err => console.error("Error logging visitor"));
