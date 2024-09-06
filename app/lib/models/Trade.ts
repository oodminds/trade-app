export interface Trade {
    id: string;
    userId: string;
    title: string;
    description: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    mistakes: string[];
  }