export enum TransactionType {
  Exchange = 'exchange',
  Transfer = 'transfer',
  Loan = 'loan',
}

export const CREDIT_TYPES: TransactionType[] = [
  TransactionType.Exchange,
  TransactionType.Loan,
];
export const DEBIT_TYPES: TransactionType[] = [TransactionType.Transfer];

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  date: Date;
  description: string;
  id_user: string;
}

export function isCredit(type: TransactionType): boolean {
  return CREDIT_TYPES.includes(type);
}

export function isDebit(type: TransactionType): boolean {
  return DEBIT_TYPES.includes(type);
}
