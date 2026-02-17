import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate", async (req, res) => {
    try {
        const response = await fetch(
            "https://router.huggingface.co/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.HF_API_TOKEN}`
                },
                body: JSON.stringify(req.body)
            }
        );
        const data = await response.json();
//	console.log("HF response:", JSON.stringify(data, null, 2));
        res.json(data);

    } catch (err) {
	console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));

