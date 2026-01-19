import { test, expect } from '@playwright/test';
import { TransactionApiClient } from '../../src/api/TransactionApiClient.js';
import { TransferRequest } from '../../src/types/api.types.js';


test.describe('POST /transactions', () => {

  test('Successful fund transfer', async ({ request }) => {
    const client = new TransactionApiClient(request);

    const payload: TransferRequest = {
      from_account: '123456',
      to_account: '654321',
      amount: 100,
      currency: 'USD'
    };

    const response = await client.createTransactionRaw(payload);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.success).toBe(true);
    expect(body.transaction_id).toBeDefined();
    expect(body.new_balance).toBeGreaterThan(0);
  });

  test('Transfer with insufficient funds', async ({ request }) => {
    const client = new TransactionApiClient(request);

    const payload: TransferRequest = {
      from_account: '123456',
      to_account: '654321',
      amount: 1000,
      currency: 'USD'
    };

    const response = await client.createTransactionRaw(payload);

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.success).toBe(false);
    expect(body.error).toBe('Insufficient funds');
    expect(body.current_balance).toBe(50.0);
  });

});

test.describe('GET /accounts/{account_id}/balance', () => {

  test('Fetch account balance validation', async ({ request }) => {
    const client = new TransactionApiClient(request);

    const response = await client.getAccountDetais('ACC001')  

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.account_id).toBe('ACC001');
    expect(body.balance).toBe(1500.75);
    expect(body.currency).toBe('USD');
  });
});
