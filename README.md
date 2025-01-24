# Supotsu no Ochaya - Bestell-App

## Projektübersicht

**Supotsu no Ochaya** ist eine entwickelte App für die Verwaltung von Vereinsrestaurants. Sie erleichtert Kellnern die Aufnahme von Bestellungen, ermöglicht der Küche eine klare Übersicht über offene Bestellungen und gibt Administratoren die Kontrolle über Personalmanagement und die Bearbeitung der Speisekarte.

**Die entwickelte App ist ausschließlich für ein sicheres oder geschlossenes WLAN ausgelegt.**
---

## Technologie-Stack

### [Frontend](https://github.com/supotsu-no-ochaya/frontend)

- **Framework:** [Vue.js](https://vuejs.org/)
- **Styling:** [TailwindCSS](https://tailwindcss.com/)
- **Komponentenbibliothek:** [Shadcn/UI](https://ui.shadcn.dev/)
- **Programmiersprache:** TypeScript

### [Backend](https://github.com/supotsu-no-ochaya/backend)

- **Programmiersprache:** GoLang
- **API-Design:** RESTful

---

## Funktionen

### Service

- Bestellungen aufnehmen (Anmerkungen)
- Bezahlung (Rechnung splitten)

### Küche

- Gefilterte Anzeige nach Kategorie
- Ändern des Status (Stornieren) von Bestellungen

### Betreiber

- Rechte verwalten (Nutzer, Menü)
- Sperren von Speisen

## Installation (Windows)

### init

- install Docker Desktop https://docs.docker.com/desktop/setup/install/windows-install/
- install Node (version 23.6.0) 
  `Powershell`

```shell
winget install OpenJS.NodeJS.LTS
```

or

`Powershell`

```shell
winget install OpenJS.NodeJS
```

- git clone repository in dictionary

### startup

`Terminal 1: im Repository ./frontend`

```shell
docker compose up
```

- check if database is reachable with

```shell
hhtps://localhost:8090/_/
```

- **email**: admin@admin.admin
- **password**: 1234567890

`Terminal 2: im Repository ./frontend`

```shell
cd src/frontend/
npm i  # only once or after package.lock changes
npm run dev
```

if you don't have permission to execute try
"powershell -executionpolicy bypass" in front

- open projekt with

```shell
https://localhost:5173/#/auth/login/
```
## Bedienungsanleitung

### Navigation der verschiedenen Ansichten
- Login 
```shell
hhtps://localhost:5173/#/auth/login/
```
- Testuser Service: **user:** **password:**
- Testuser Küche: **user:** **password:**
- Testuser Manager: **user:** **password:** 

- Serviceansicht
```shell
hhtps://localhost:5173/#/waiter/tables/
```
- Küchenansicht
```shell
hhtps://localhost:5173/#/kitchen/
```
### Bedienung der Datenbank

TODO:

- Anleitung DB start/einrichten/hinzufügen
- Backend docker build
- Anleitung für Manager (Rechte User, Menü erstellen/änder, Sperren der Produkte, Event starten/downloaden/einrichten)

