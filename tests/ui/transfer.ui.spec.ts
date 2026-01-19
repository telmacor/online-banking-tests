import { test, expect } from '@playwright/test';
import { TransferPage } from '../../src/pages/TransferPage.js';
import type { TransferForm } from '../../src/types/form.types.js';

test.describe('Transfer Form', () => {

    test('Verify form title', async ({ page }) => {
        const transferPage = new TransferPage(page);
        await transferPage.open();

        await expect(page.locator('h1')).toHaveText('Fund Transfer');
    });

    test('User tranfer funds successfully', async ({ page }) => {
        const transferPage = new TransferPage(page);
        await transferPage.open();

        const form: TransferForm = {
            from_account: '123456',
            to_account: '654321',
            amount: 100,
            currency: 'EUR'
        };

        await transferPage.makeTransfer(form);

        await expect(page.locator('#confirmationMessage')).toContainText('Transfer Successful!');
    });

    test('Form validation for empty/invalid fields', async ({ page }) => {

    });

    test('Validation for same account transfer attempt', async ({ page }) => {

    });

    test('Insufficient funds error message display', async ({ page }) => {

    });
});
