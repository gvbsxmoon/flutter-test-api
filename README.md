## FLUTTER TEST API

Si consiglia di utilizzare lo swagger a disposizione per visualizzare le API e testarle.

### Prerequisiti

Nessun prerequisito richiesto.
Tirar su il docker e si è pronti per testare le API.

- aprire docker da desktop o lanciare il demone da terminale
- da terminale, posizionarsi nella cartella del progetto e lanciare il comando `docker build -t flutter-test-api .`
- lanciare il comando `docker run -d --name test-container -p 3000:3000 flutter-test-api`

da questo momento in poi al path `localhost:3000/swagger` è possibile testare le API.

- per terminare il container, lanciare il comando `docker stop test-container`

### Punti di attenzione

Non essendoci un database, i dati non sono persistenti. Le operazioni risultano valide ma in caso di pasticci o di riavvio del docker, i dati andranno persi.