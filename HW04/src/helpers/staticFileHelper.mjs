import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { notFound } from "./viewHelper.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, "../../public");

export async function isStaticFile(filename) {
    try {
        const filePath = path.join(publicDir, filename);
        await fs.promises.access(filePath);
        return true;
    } catch (error) {
        return false;
    }
}

export async function serveStaticFile(filename, res) {
    try {
        const filePath = path.join(publicDir, filename);
        res.sendFile(filePath);
    } catch (error) {
        return notFound(res);
    }
}