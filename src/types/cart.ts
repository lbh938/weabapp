export interface CartItem {
  id: string;
  name: string;
  model: string;
  color: string;
  material: string;
  protection: string;
  finish: string;
  customText?: string;
  imageUrl?: string;
  quantity: number;
  price: number;
} 