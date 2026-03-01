/**
 * Vytvořte program, který bude kopírovat obsah souboru do druhého souboru na základě jednoduchých instrukcí.
 * Při spuštění si program načte obsah souboru s názvem "instrukce.txt". V tomto souboru budou uloženy dva názvy souborů.
 * První název označuje zdrojový soubor (ze kterého bude program kopírovat data) a druhý název označuje cílový soubor do kterého bude program data kopírovat.
 * Soubor "instrukce.txt" a zdrojový soubor musí existovat, pokud neexistují, program o tom informuje uživatele.
 * Pokud neexistuje cílový soubor, program ho nejprve vytvoří a pak do něj nakopíruje data. Formát instrukcí nechám na vás.
 *
 * Příklad:
 * Obsahu souboru instrukce.txt: "vstup.txt vystup.txt"
 * Obsah souboru vstup.txt: "lorem ipsum dolor sit amet"
 * Spustim program pomoci "node index.mjs"
 * Vznikne soubor vystup.txt s obsahem "lorem ipsum dolor sit amet"
 */

import fs from "fs";

const instructionFile = "materials.txt";

if (!fs.existsSync(instructionFile)) {
    console.log("File with instructions does not exist");
    process.exit(1);
}

// Read the instruction file and split the content into source and destination files
const instructionContent = fs.readFileSync(instructionFile, "utf8");
const [source, destination] = instructionContent.split(" ");

// Validate data given by the instructions file
if (!source || !destination) {
    console.log("Invalid instruction file");
    process.exit(1);
}

if (!fs.existsSync(source)) {
    console.log("Source file does not exist");
    process.exit(1);
}

// Create a new destination if it does not exist
if (!fs.existsSync(destination)) {
    fs.writeFileSync(destination, "");
}

// Read the source file and write its content to the destination file
const sourceContent = fs.readFileSync(source, "utf8");
fs.writeFileSync(destination, sourceContent);

console.log(`Content of file ${source} was successfully copied to file ${destination}`);