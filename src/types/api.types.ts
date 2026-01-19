export interface TransferRequest {
    from_account: string;
    to_account: string;
    amount: number;
    currency: 'USD' | 'EUR' | 'GBP';
}

export interface TransferSuccessResponse {
    transaction_id: string;
    success: boolean;
    new_balance: number;
    timestamp: string;
}

export interface TransferErrorResponse {
  success: false;
  error: string;
  current_balance: number;
}

export interface AccountDetailsResponse {
    "account_id": string,
    "balance": number,
    "currency": string,
    "last_updated": string
}