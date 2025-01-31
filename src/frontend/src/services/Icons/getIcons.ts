import type { MenuCateg } from "@/interfaces/menu/MenuCateg";
import type { MenuItem } from "@/interfaces/menu/MenuItem";
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

export const getIconURL = (record: MenuCateg|MenuItem<T>) => {
  // Generiere die URL mit oder ohne Dateinamen
  return pb.files.getURL(record, record.icon)
};