export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          price: number;
          image_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          price: number;
          image_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          price?: number;
          image_url?: string | null;
          created_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          items: any[];
          total_amount: number;
          shipping_address: any;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string;
          items: any[];
          total_amount: number;
          shipping_address?: any;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          items?: any[];
          total_amount?: number;
          shipping_address?: any;
          status?: string;
          created_at?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          rating: number;
          comment: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          product_id: string;
          rating: number;
          comment?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          product_id?: string;
          rating?: number;
          comment?: string | null;
          created_at?: string;
        };
      };
    };
  };
} 