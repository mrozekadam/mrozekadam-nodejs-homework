/*
Pomocí modulu fs/promises a klíčových slov async a await napište následující program:

Program nejprve přečte obsah souboru „instrukce.txt“, 
ve kterém bude číslo (například 10). Následně program vytvoří n souborů 
(kde n se rovná číslu ze souboru instrukce.txt) s názvy 0.txt, 1.txt, 2.txt až n.txt a obsahem „Soubor 0“, 
„Soubor 1“, „Soubor 2“ až „Soubor n“. Poté, co budou všechny soubory úspěšně vytvořeny, vypíše program 
informativní hlášku do konzole a skončí. Základní program za 2 body může být sériový.

Pokročilejší program za 3 body musí využít „paralelizaci“ pomocí Promise.all.
*/

import fs from "node:fs/promises";

const fileCreationLimit = parseInt(await fs.readFile("instrukce.txt", "utf-8"));
const parallelBatchSize = 10;

async function createFileAsync(folder, fileName, extension = "txt") {
    const filePath = `./${folder}/${fileName}.${extension}`;
    return fs.writeFile(filePath, `Soubor ${fileName}`);
}

async function main() {
    const folder = "files";

    // Ensure folder exists
    await fs.mkdir(folder, { recursive: true });

    const batchesCount = Math.ceil(fileCreationLimit / parallelBatchSize);
    for (let batchNumber = 0; batchNumber < batchesCount; batchNumber++) {
        const batch = [];

        for (let batchFileNumber = 0; batchFileNumber < parallelBatchSize; batchFileNumber++) {
            const currentFileNumber = batchNumber * parallelBatchSize + batchFileNumber;
            if (currentFileNumber >= fileCreationLimit) {
                break;
            }

            batch.push(createFileAsync(folder, currentFileNumber + 1));
        }

        try {
            console.log(`Processing batch ${batchNumber + 1}`);
            await Promise.all(batch);
            console.log(`Batch ${batchNumber + 1} completed`);
        } catch (error) {
            console.error(`Batch ${batchNumber + 1} failed`);
            console.error(error);
        }
    }

    console.log(`Successfully created ${fileCreationLimit} files`);
}

main();