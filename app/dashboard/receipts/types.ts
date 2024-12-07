export interface Item {
  description: string;
  quantity: number;
  price: number;
  tax: number;
}

export interface ReceiptForm {
  customerName: string;
  customerEmail: string;
  items: Item[];
  currency: string;
  notes: string;
} 