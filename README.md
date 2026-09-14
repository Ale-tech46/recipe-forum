# Recipe Forum

Una piccola Single Page Application per condividere ricette.

- Frontend: React e Bootstrap
- Backend: Node.js ed Express
- Database: MongoDB Atlas in cloud, tramite Mongoose
- Login: sessione Express e password salvate con hash bcrypt

Richiede Node.js 20.19 o una versione successiva.

## 1. Configurare MongoDB Atlas

1. Crea un cluster gratuito su MongoDB Atlas.
2. Crea un utente del database.
3. In **Network Access** autorizza il tuo indirizzo IP.
4. Copia la stringa di connessione del cluster.
5. Nella cartella `backend`, crea un file chiamato `.env` copiando `.env`.
6. Sostituisci nella stringa `MONGODB_URI` username, password e nome del cluster.

Esempio:

```env
MONGODB_URI=mongodb+srv://mario:password@cluster0.example.mongodb.net/recipe_forum
SESSION_SECRET=una_stringa_segreta
PORT=3000
```

## 2. Installare e compilare il frontend

```bash
cd frontend
npm install
npm run build
```

## 3. Avviare il backend

Apri un secondo terminale:

```bash
cd backend
npm install
npm start
```

Apri poi `http://localhost:3000` nel browser.

Gli account e le ricette vengono salvati nel database MongoDB Atlas indicato nel file `.env`.

## Metodi usati dalle slide

Il progetto usa soltanto gli strumenti presentati nel materiale del corso: componenti funzionali React, props, `useState`, `useEffect`, form controllati, rendering condizionale, liste con `map` e `key`, Fetch API con `async/await`, router e middleware Express, risposte JSON, `express.static`, sessioni, schemi e query Mongoose, hook `pre` e `bcrypt` per le password. Non sono stati aggiunti Redux, React Router, TypeScript, JWT o altre architetture avanzate.

## API Express

| Metodo | Endpoint | Funzione |
| --- | --- | --- |
| POST | `/api/register` | Registra un utente |
| POST | `/api/login` | Esegue il login |
| POST | `/api/logout` | Esegue il logout |
| GET | `/api/me` | Controlla la sessione |
| GET | `/api/recipes` | Restituisce tutte le ricette |
| POST | `/api/recipes` | Salva una nuova ricetta |
