# Supotsu no Ochaya - Bestell-App

## Projektübersicht

**Supotsu no Ochaya** ist eine entwickelte App für die Verwaltung von Vereinsrestaurants. Sie erleichtert Kellnern die Aufnahme von Bestellungen, ermöglicht der Küche eine klare Übersicht über offene Bestellungen und gibt Administratoren die Kontrolle über Personalmanagement und die Bearbeitung der Speisekarte.

---

## Technologie-Stack

### Frontend

- **Framework:** [Vue.js](https://vuejs.org/)
- **Styling:** [TailwindCSS](https://tailwindcss.com/)
- **Komponentenbibliothek:** [Shadcn/UI](https://ui.shadcn.dev/)
- **Programmiersprache:** TypeScript

### Backend

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

## Installation

### init

- install Docker Desktop https://docs.docker.com/desktop/setup/install/windows-install/
- install Node
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

`Terminal 1`

```shell
docker compose up
```

- check if database is reachable with

```shell
localhost:8090/_/
```

-- **email**: admin@admin.admin
-- **password**: 1234567890

`Terminal 2`

```shell
cd src/frontend/
npm i  # only once or after package.lock changes
npm run dev
```

if you don't have permission to execute try
"powershell -executionpolicy bypass" in front

- open projekt with

```shell
localhost:5431/#/login/
```
