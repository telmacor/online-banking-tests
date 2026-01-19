export interface TransferForm {
  from_account: string;
  to_account: string;
  amount: number;
  currency: 'USD' | 'EUR' | 'GBP';
}