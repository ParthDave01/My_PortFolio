export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { name, email, message } = req.body;
        console.log("Form submission:", { name, email, message });

        // (Optional) Send an email using Nodemailer or just log it
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}git 