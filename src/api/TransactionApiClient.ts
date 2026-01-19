import { APIRequestContext } from '@playwright/test';
import { TransferRequest, TransferSuccessResponse, TransferErrorResponse} from '../types/api.types.js';

export class TransactionApiClient {
  constructor(private readonly request: APIRequestContext) {}

  async createTransaction(payload: TransferRequest): Promise<TransferSuccessResponse | TransferErrorResponse> {
    const response = await this.request.post('/transactions', {
      data: payload
    });

    return response.json();
  }

  async createTransactionRaw(payload: TransferRequest) {
    return this.request.post('/transactions', {
      data: payload
    });
  }

  async getAccountDetais(account_id: string){    
     return this.request.get(`/accounts/${account_id}/balance`)
  }
}