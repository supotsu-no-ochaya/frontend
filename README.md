# Supotsu no Ochaya - Bestell-App

## Projektübersicht

**Supotsu no Ochaya** ist eine entwickelte App für die Verwaltung von Vereinsrestaurants. Sie erleichtert Kellnern die Aufnahme von Bestellungen, ermöglicht der Küche eine klare Übersicht über offene Bestellungen und gibt Administratoren die Kontrolle über Personalmanagement und die Bearbeitung der Speisekarte.

**Die entwickelte App ist ausschließlich für ein sicheres oder geschlossenes WLAN ausgelegt.**
---

## Technologie-Stack

### [Frontend](https://github.com/supotsu-no-ochaya/frontend)

- **Framework:** [Vue.js](https://vuejs.org/)
- **Styling:** [TailwindCSS](https://tailwindcss.com/) (Version v3.X)
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

**Datenbankverwaltung für Manager**  
Aktuell können Manager alle administrativen Aufgaben direkt über die PocketBase Admin UI durchführen. Diese Anleitung führt durch die notwendigen Schritte, um Benutzerrechte zu verwalten, Menüpunkte zu erstellen oder zu ändern, sowie Produkte zu sperren.

**Zugriff auf die PocketBase Admin UI**
1. Öffnen Sie Ihren Browser und navigieren Sie zur PocketBase Admin UI unter [https://localhost:8090/_/](https://localhost:8090/_/)  
   *Hinweis: Stellen Sie sicher, dass Docker und PocketBase korrekt gestartet sind.*
2. **Anmeldung:**  
   Melden Sie sich mit den Administratorzugangsdaten an:
    - **E-Mail:** ``admin@admin.admin``
    - **Passwort:** ``1234567890``

**Verwaltung von Benutzerrechten und Anlage von neuen Nutzern**
1. **Benutzerübersicht:**
    - Navigieren Sie zur Sammlung ``users``.
    - Hier sehen Sie alle registrierten Benutzer der App.
2. **Anlage eines neuen Benutzers:**
    - Klicken Sie auf ``+ New record``.
    - Tragen Sie die notwendigen Daten ein:
        - ``email``: E-Mail-Adresse des Benutzers (optional)
        - ``username``: Benutzername
        - ``password``: Passwort des Benutzers
        - ``role``: Rolle des Benutzers (``Kueche``, ``Kellner``, ``Kuechenchef``)
3. **Benutzerrollen zuweisen:**
    - Öffnen Sie einen Benutzer, den Sie bearbeiten möchten.
    - Suchen Sie das Feld ``role`` und wählen Sie die entsprechende Rolle aus der Dropdown-Liste aus (``Kueche``, ``Kellner``, ``Kuechenchef``).

**Erstellung und Änderung von Menüpunkten**
1. **Menükategorien verwalten:**
    - Navigieren Sie zur Sammlung ``menu_categ``.
    - Hier können Sie neue Kategorien hinzufügen oder bestehende bearbeiten.
    - **Neue Kategorie hinzufügen:**
        - Klicken Sie auf ``+ New record``.
        - Tragen Sie die notwendigen Daten ein:
            - **Name:** Geben Sie den Namen der Kategorie ein (z.B. ``Getränke``, ``Snacks``).
            - **Parent Category:** Optional, falls die Kategorie untergeordnet sein soll.
            - **Icon:** Optional, laden Sie ein Icon hoch.
            - Speichern Sie die Kategorie.

2. **Menüpunkte erstellen/ändern:**
    - Navigieren Sie zur Sammlung ``menu_item``.
    - **Neuen Menüpunkt hinzufügen:**
        - Klicken Sie auf ``+ New record``.
        - **Name:** Geben Sie den Namen des Menüpunktes ein (z.B. ``Kaffee mit Milch``).
        - **Preis:** Setzen Sie den Preis. (Der Preis wird in Cent angegeben, also 1€ = 100)
        - **BOM Template:** Fügen Sie eine JSON-Struktur hinzu, die die Bestandteile des Menüpunkts beschreibt.
        - **Kategorie:** Wählen Sie die entsprechende Kategorie aus.
        - **Icon:** Optional, laden Sie ein Icon hoch.
        - Speichern Sie den Menüpunkt.
    - **Menüpunkt bearbeiten:**
        - Wählen Sie einen bestehenden Menüpunkt aus.
        - Nehmen Sie die gewünschten Änderungen vor und speichern Sie.

#### Produkt-Typen und Menükategorien

Es werden Produkte und Menükategorien über die Tabellen `product_type` und `menu_categ` organisiert.

**Produkt-Typen (`product_type`)** klassifizieren Produkte nach ihren Eigenschaften zur internen Verwaltung und Filterung.

- **Beispiele:** Getränke, Snacks, Desserts
- **Eigenschaften:**
   - Keine Hierarchie
   - Einfache Kategorisierung

**Menükategorien (`menu_categ`)** strukturieren die Speisekarte und können hierarchisch organisiert werden.

- **Beispiele:**
   - **Vorspeisen**
   - **Hauptgerichte**
      - **Vegetarisch**
      - **Fleisch**
   - **Getränke**
- **Eigenschaften:**
   - **Hierarchie:** Kategorien können Eltern- und Unterkategorien haben
   - **Strukturierung:** Ermöglicht eine übersichtliche und navigierbare Speisekarte

**Unterschiede:**
- **Hierarchie:** Nur `menu_categ` unterstützt verschachtelte Kategorien
- **Verwendung:** `product_type` für die interne Produktklassifizierung (für beispielsweise die BOM Templates), `menu_categ` für die externe Menüdarstellung


#### BOM Templates

Die **BOM Templates** (Bill of Materials) spielen eine zentrale Rolle bei der Verwaltung der Menüpunkte/ Items auf der Speisekarte. Ein Menüpunkt kann entweder einem einzelnen Produkt entsprechen oder ein komplexes Menü mit auswählbaren Optionen sein. Hierbei unterscheiden wir hauptsächlich zwischen **Fixed Templates** und **Selectable Templates**.

**Fixed Template**

In den meisten Fällen entspricht ein Menüpunkt direkt einem oder mehreren Produkten. Dies wird durch ein **Fixed Template** realisiert, bei dem ein Menüpunkt ein festes Produkt enthält, das nicht verändert werden kann.
Dieses Template kommt auch bei den meisten Menüpunkten zum Einsatz. Eine Cola oder ein Stück Kuchen entsprechen einem einzelnen Produkt und kann daher durch ein **Fixed Template** definiert werden.

**Beispiel:**
```json
{
  "type": "Fixed",
  "products": [
    "1535ycesdh5o51m"
  ]
}
```

#### Selectable Template

Für komplexere Menüs, bei denen der Kunde aus verschiedenen Optionen wählen kann, verwenden wir **Selectable Templates**. Diese Templates ermöglichen es, entweder aus einer Liste von Produkt-IDs oder aus verschiedenen Typen (Types) auszuwählen.

**Beispiel für ein Selectable Template (Product Selection):**
```json
{
  "type": "Selection",
  "selection_specification": "ProductSelection",
  "options": [
    {
      "min_select": 1,
      "max_select": 2,
      "selection_specification": "ProductSelection",
      "products": [
        "bn6pmb6r44w50m9",
        "another_product_id"
      ]
    }
  ]
}
```

**Beispiel für ein Selectable Template (Type Selection):**
```json
{
  "type": "Selection",
  "selection_specification": "TypeSelection",
  "category_id": "some_category_id",
  "options": [
    {
      "min_select": 1,
      "max_select": 1,
      "selection_specification": "TypeSelection",
      "category_id": "another_category_id"
    }
  ]
}
```

**Erklärung:**

- **type:** Gibt den Typ des BOM an (`Fixed` oder `Selection`).
- **selection_specification:** Bestimmt die Spezifikation der Auswahl (`ProductSelection` oder `TypeSelection`).
- **category_id:** Bei `TypeSelection` gibt dies die ID der Kategorie an, aus der Produkte ausgewählt werden können.
- **options:** Definiert die Auswahloptionen mit Mindest- und Höchstanzahl der auswählbaren Elemente.

**Zusammenspiel der BOM Templates:**

- **Einzelne Produkte als Menüpunkte:** In den meisten Fällen entspricht ein Menüpunkt einem einzelnen Produkt, wie beispielsweise `Cola`. Dies wird durch ein **Fixed Template** erreicht, bei dem nur die Produkt-ID im BOM enthalten ist.

- **Komplexe Menüs mit Auswahlmöglichkeiten:** Für Menüs wie `Kaffee mit Milch` oder eine `Mochi Box`, bei denen der Kunde aus verschiedenen Optionen wählen kann, verwenden wir **Selectable Templates**. Diese ermöglichen es dem Kunden, aus einer festgelegten Anzahl von Produkten oder Typen auszuwählen, um das Menü individuell anzupassen.

Durch die Verwendung von **Selectable Templates** können wir flexible und anpassbare Menüs erstellen, die den Kunden ermöglichen, ihre Bestellungen nach ihren persönlichen Vorlieben zu gestalten. Dies verbessert die Benutzererfahrung und bietet eine größere Vielfalt an Bestellmöglichkeiten.

---

**Sperren von Produkten**
1. **Produkte verwalten:**
    - Navigieren Sie zur Sammlung ``product``.
    - Hier sehen Sie alle verfügbaren Produkte.
2. **Produkt sperren:**
    - Öffnen Sie das Produkt, das Sie sperren möchten.
    - Setzen Sie das Feld ``is_available`` auf ``false``.
    - Speichern Sie die Änderungen.
    - Das Produkt wird nun in der App als nicht verfügbar angezeigt und kann nicht mehr bestellt werden.


**Rollen und Rechte**

| Collection             | Rolle         | View / List | Create | Update | Delete |
|------------------------|--------------|-------------|--------|--------|--------|
| **users**             | **Admin**     | Ja          | Ja     | Ja     | Ja     |
|                        | Kellner       | Ja          | Ja     | Ja     | Ja     |
|                        | Küchenchef    | Ja          | Ja     | Ja     | Ja     |
|                        | Küche         | Ja          | Ja     | Ja     | Ja     |
| **admin_settings**     | **Admin**     | Ja          | Ja     | Ja     | Ja     |
|                        | Kellner       | Nein        | Nein   | Nein   | Nein   |
|                        | Küchenchef    | Ja          | Ja     | Ja     | Ja     |
|                        | Küche         | Nein        | Nein   | Nein   | Nein   |
| **event**              | **Admin**     | Ja          | Ja     | Ja     | Ja     |
|                        | Kellner       | Nein        | Nein   | Nein   | Nein   |
|                        | Küchenchef    | Nein        | Nein   | Nein   | Nein   |
|                        | Küche         | Nein        | Nein   | Nein   | Nein   |
| **menu_categ**         | **Admin**     | Ja          | Ja     | Ja     | Ja     |
|                        | Kellner       | Ja          | Nein   | Nein   | Nein   |
|                        | Küchenchef    | Ja          | Ja     | Ja     | Ja     |
|                        | Küche         | Ja          | Nein   | Nein   | Nein   |
| **menu_item**          | **Admin**     | Ja          | Ja     | Ja     | Ja     |
|                        | Kellner       | Ja          | Nein   | Nein   | Nein   |
|                        | Küchenchef    | Ja          | Ja     | Ja     | Ja     |
|                        | Küche         | Ja          | Nein   | Nein   | Nein   |
| **order**              | **Admin**     | Ja          | Ja     | Ja     | Ja     |
|                        | Kellner       | Ja          | Ja     | Ja     | Nein   |
|                        | Küchenchef    | Ja          | Ja     | Ja     | Ja     |
|                        | Küche         | Ja          | Nein   | Ja     | Nein   |
| **order_item**         | **Admin**     | Ja          | Ja     | Ja     | Ja     |
|                        | Kellner       | Ja          | Ja     | Ja     | Nein   |
|                        | Küchenchef    | Ja          | Ja     | Ja     | Ja     |
|                        | Küche         | Ja          | Nein   | Ja     | Nein   |
| **payment**            | **Admin**     | Ja          | Ja     | Ja     | Ja     |
|                        | Kellner       | Ja          | Ja     | Ja     | Ja     |
|                        | Küchenchef    | Ja          | Ja     | Ja     | Ja     |
|                        | Küche         | Nein        | Nein   | Nein   | Nein   |
| **payment_option**     | **Admin**     | Ja          | Ja     | Ja     | Ja     |
|                        | Kellner       | Ja          | Nein   | Nein   | Nein   |
|                        | Küchenchef    | Ja          | Nein   | Nein   | Nein   |
|                        | Küche         | Nein        | Nein   | Nein   | Nein   |
| **product**            | **Admin**     | Ja          | Ja     | Ja     | Ja     |
|                        | Kellner       | Ja          | Nein   | Nein   | Nein   |
|                        | Küchenchef    | Ja          | Ja     | Ja     | Ja     |
|                        | Küche         | Ja          | Nein   | Nein   | Nein   |
| **product_attribute**  | **Admin**     | Ja          | Ja     | Ja     | Ja     |
|                        | Kellner       | Ja          | Nein   | Nein   | Nein   |
|                        | Küchenchef    | Ja          | Ja     | Ja     | Ja     |
|                        | Küche         | Ja          | Nein   | Nein   | Nein   |
| **product_type**       | **Admin**     | Ja          | Ja     | Ja     | Ja     |
|                        | Kellner       | Ja          | Nein   | Nein   | Nein   |
|                        | Küchenchef    | Ja          | Ja     | Ja     | Ja     |
|                        | Küche         | Ja          | Nein   | Nein   | Nein   |
| **station**            | **Admin**     | Ja          | Ja     | Ja     | Ja     |
|                        | Kellner       | Ja          | Nein   | Nein   | Nein   |
|                        | Küchenchef    | Ja          | Ja     | Ja     | Ja     |
|                        | Küche         | Ja          | Nein   | Nein   | Nein   |
| **user_role**          | **Admin**     | Ja          | Ja     | Ja     | Ja     |
|                        | Kellner       | Nein        | Nein   | Nein   | Nein   |
|                        | Küchenchef    | Ja          | Nein   | Nein   | Nein   |
|                        | Küche         | Nein        | Nein   | Nein   | Nein   |

**Bauen/Entwickeln/Nutzen der Docker-Images**
<br>
Zum Bauen des Release-Docker-Images siehe die [Release-Anleitung](https://github.com/supotsu-no-ochaya/backend/blob/main/README.md#release).
<br>
Für die Entwicklung oder das lokale Bauen des Docker-Images siehe die [Contribute-Anleitung](https://github.com/supotsu-no-ochaya/backend/blob/main/README.md#contribute).
<br>
Zum Starten des Docker-Images, sowohl mit als auch ohne Testdaten, siehe die Anleitung [Run the Backend](https://github.com/supotsu-no-ochaya/backend/blob/main/README.md#run-the-backend).

TODO:
- Username und password

