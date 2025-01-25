import PocketBase from "pocketbase";

// TODO delete
// Dynamisch die Base-URL bestimmen (abhängig von Umgebung)
// const getBaseURL = () => {
//   if (typeof window !== "undefined") {
//     const { protocol, hostname, port } = window.location;
//     const portString = port ? `:${port}` : "";
//     return `${protocol}//${hostname}${portString}`;
//   } else {
//     return "http://localhost:8090"; // Fallback für Server-Umgebungen  process.env.POCKETBASE_URL ||
//   }
// };

const getBaseURL = () => {
    if (import.meta.env.MODE === "development") {
      // Nutze die Proxy-Route in der Entwicklungsumgebung
      return "http://localhost:8090";
    }
    // In der Produktionsumgebung die echte URL oder eine Umgebungsvariable nutzen
    return import.meta.env.VITE_POCKETBASE_URL || "http://localhost:8090";
  };

// Initialisiere den PocketBase-Client mit dynamischer Base-URL
const pb = new PocketBase(getBaseURL());


/**
 * Funktion: Generiere die URL für ein gespeichertes SVG in PocketBase
 * @param {string} collection - Die Collection, in der der Datensatz liegt.
 * @param {string} recordId - Die ID des Datensatzes, der das SVG enthält.
 * @param {string} [fileName] - (Optional) Der Name der Datei, falls mehrere Dateien existieren.
 * @returns {string} - Die URL der SVG-Datei.
 */
export const getIconURL = (collection, recordId, fileName) => {
  if (!collection || !recordId) {
    throw new Error("Collection und Record-ID sind erforderlich");
  }
  console.log(getBaseURL())
  // Generiere die URL mit oder ohne Dateinamen
  return pb.files.getURL({ id: recordId, collectionId: collection }, fileName || "");
};