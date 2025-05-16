export interface Transaction {
  id: string;
  type: 'exchange' | 'transfer' | 'loan';
  amount: number;
  date: Date;
  description: string;
  id_user: string;
}
