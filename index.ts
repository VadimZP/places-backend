import express from 'express';
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        // credentials: true,
    })
);

app.get("/places", async (req, res) => {
    const data = await prisma.place.findMany()
    res.status(200).json(data);
});

app.post("/places", async (req, res) => {
    const { name, content, latitude, longitude } = req.body;
    const data = await prisma.place.create({
        data: {
            name,
            content,
            latitude,
            longitude
        }
    })
    res.status(200).json(data);
});

app.listen(3001, () => {
    console.log(`App is listening on port ${3001}`);
});