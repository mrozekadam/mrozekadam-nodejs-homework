/**
 * Vytvořte program, který bude s uživatelem hrát hru “hádej číslo, které si myslím”. 
 * Program si na začátku vygeneruje náhodné číslo od 0 do 10 a následně se uživatele zeptá na jeho tip. 
 * Pokud se uživatel trefí, program mu to oznámí a ukončí se. 
 * Pokud se netrefí, program uživateli oznámí zda byl tip větší či menší než hádané číslo a zeptá se uživatele na další tip. 
 * Pokud se uživatel netrefí ani po pěti pokusech, program ho informuje o prohře a ukončí se.
 * 
 * Program spouštějte v konzoli prohlížeče. 
 * Pro generování čísla použijte funkci Math.random() (její výstup budete muset ještě nějak zpracovat) 
 * a pro načítání uživatelova tipu použijte funkci prompt(). Doporučuji použít dokumentaci nebo AI na zjištění 
 * více informací ohledně těchto funkcí.
 */

let randomNumber = generateRandomNumber();

while (true) {
    const guess = parseInt(prompt("Guess the number between 0 and 10"));

    if (guess === randomNumber) {
        alert("You guessed the number!");
        randomNumber = generateRandomNumber();
    } else if (guess < randomNumber) {
        alert("Too low");
    } else {
        alert("Too high");
    }
}

function generateRandomNumber() {
    return Math.floor(Math.random() * 11);
}
