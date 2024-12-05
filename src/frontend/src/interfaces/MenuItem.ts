export interface MenuItem {
  id: string;
  name: string;
  price: number;
  bom_template: Record<string, any>; // Adjust type based on your JSON structure
  created: string;
  updated: string;
}
