# Seente leiukohtade kaardistamise rakendus "FungiMapper" 

Rakendus on loodud seente leiukohtade lisamiseks, kustutamiseks, muutmiseks ja pärimiseks. Leiukohta (FungiLocation) iseloomustab selle identifikaator, 
asukoha koordinaadid ningkirjeldus, kuhu on vabateksti kujul võimalik märkida, mis seeni antud kohas leidub. 
Lisamine, kustutamine, muutmine käivad ühe objekti kaupa. Pärimine tagastab kõik hetkel olevad leiukohad. Andmed salvestuvad ning loetakse andmebaasist. 
Kõik teenused kasutavad sisend-väljundina GeoJSON formaati ning on kõigile vabad kasutada.


# Paigaldus

**Back-end (Java Spring):**

### Eeldused:
- Java arenduskomplekt (JDK) 17
- Gradle
- PostgreSQL

### Ülesseadmine:
- Kloonige projekt GitHubist:

    git clone https://github.com/aliinelotman/fungimapper/

- Liikuge projekti juurkausta ning avage see endale sobivas IDE's.

– Lisage application.yaml faili sobivad andmed andmebaasi ühenduseks:

    spring.datasource.url=jdbc:postgresql://localhost:5432/minu-andmebaas
    spring.datasource.username=kasutajanimi
    spring.datasource.password=parool

- Ehitage projekt Gradle'i abil.

    ./gradlew bootRun

**Front-end (Angular):**

### Eeldused:
- Node.js ja NPM
- Angular CLI

### Ülesseadmine:
- Liikuge projekti sees olevasse `frontend/angularclient` kausta.

- - Installige vajalikud lisandused:

     npm install

- Käivitage Angular:

     ng serve

– Front-end on kättesaadav aadressil http://localhost:4200


## Rakenduse kasutamine

- Avage rakendus brauseris
- Rakendus kuvab kaardil kõik andmebaasis leiduvad seente leiukohad.
- Uue leiukoha lisamiseks klõpsake kaardil, lisage vajalikud andmed ning salvestage.



