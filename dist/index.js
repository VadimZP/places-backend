"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    // credentials: true,
}));
app.get("/places", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield prisma.place.findMany();
    res.status(200).json(data);
}));
app.post("/places", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, content, latitude, longitude } = req.body;
    const data = yield prisma.place.create({
        data: {
            name,
            content,
            latitude,
            longitude
        }
    });
    res.status(200).json(data);
}));
app.listen(3001, () => {
    console.log(`App is listening on port ${3001}`);
});
