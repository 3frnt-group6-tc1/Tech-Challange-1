export interface StatementItem {
  id: string;
  description: string;
  amount: number;
  date: string;
  credit: boolean;
  debit: boolean;
}

export interface NewStatementItem {
  id: string;
  type: 'deposit' | 'withdraw';
  description: string;
  amount: number;
  date: string;
}
