export interface Database {
  public: {
    Tables: {
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
      // ... autres tables
    };
  };
} 