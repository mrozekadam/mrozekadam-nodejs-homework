# Úkol č. 4

Vytvořte server, který po navštívení / cesty vrátí prohlížeči obsah souboru index.html. Po navštívení jakékoliv jiné cesty, například (/test.txt), se server podívá jestli v adresáři public existuje soubor s daným jménem (v tomto případě test.txt), pokud ano, vrátí ho prohlížeči a pokud ne vrátí prohlížeči obsah souboru 404.html a nastaví správný návratový HTTP status kód. Server předem neví obsah adresáře public - za běhu serveru musí jít do adresáře přidat nový soubor a server ho musí být schopen vrátit bez toho aby sme server restartovali.

Pokud chcete získat tři body, server musí být schopen z adresáře public vracet prohlížeči i jiné, než jen textové soubory (například i obrázky).
