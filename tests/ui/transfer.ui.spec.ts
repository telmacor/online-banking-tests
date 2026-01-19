import { test, expect } from '@playwright/test';
import { TransferPage } from '../../src/pages/TransferPage.js';
import type { TransferForm } from '../../src/types/form.types.js';

test.describe('When the user is on the Transfer Page', () => {
    let transferPage: TransferPage;

    test.beforeEach(async ({ page }) => {
        transferPage = new TransferPage(page);
        await transferPage.open();
    });

    test('should display transfer form title', async ({ page }) => {
        await expect(page.locator('h1')).toHaveText('Fund Transfer');
    });

    test('should transfer funds successfully when form is valid', async ({ page }) => {
        const form: TransferForm = {
            from_account: '123456',
            to_account: '654321',
            amount: 100,
            currency: 'EUR'
        };

        await transferPage.makeTransfer(form);

        await expect(transferPage.confirmationMessage).toContainText('Transfer Successful!');
    });

    test.describe('Transfer Form Input Validations', () => {

        test('should show required field error when from account is empty or less than 3 characters', async ({ page }) => {
            const fromAccount = page.locator('#fromAccount');
            const form: TransferForm = {
                from_account: '',
                to_account: 'BBB',
                amount: 100,
                currency: 'EUR'
            };

            await transferPage.makeTransfer(form);
            // Validate message when empty 
            await expect(fromAccount).toHaveJSProperty('validationMessage', 'Please fill out this field.');

            await page.fill('#fromAccount', 'AA');
            await page.click('#transferButton');

            //Validate message when less that 3 characters
            await expect(transferPage.fromAccountError).toHaveText("Account ID must be at least 3 characters")
        });

        test('should show required field error when to account is empty', async ({ page }) => {
            const form: TransferForm = {
                from_account: 'AAA',
                to_account: '',
                amount: 100,
                currency: 'EUR'
            };

            await transferPage.makeTransfer(form);

            // From Account should have the validation message
            await expect(transferPage.toAccount).toHaveJSProperty('validationMessage', 'Please fill out this field.');
        });

        test('should prevent transfer when amount is below minimum value', async ({ page }) => {
            const form: TransferForm = {
                from_account: 'AAA',
                to_account: 'BBB',
                amount: 0,
                currency: 'EUR'
            };

            await transferPage.makeTransfer(form);

            // From Account should have the validation message
            await expect(transferPage.amount).toHaveJSProperty('validity.rangeUnderflow', true);
        });

        test('should show error when transferring to the same account', async ({ page }) => {
            const form: TransferForm = {
                from_account: 'AAA',
                to_account: 'AAA',
                amount: 100,
                currency: 'EUR'
            };

            await transferPage.makeTransfer(form);

            await expect(transferPage.toAccountError).toHaveText("Cannot transfer to the same account")
        });

        test('should show insufficient funds error when transfer amount exceeds balance', async ({ page }) => {
            const form: TransferForm = {
                from_account: 'AAA',
                to_account: 'BBB',
                amount: 1500.76,
                currency: 'USD'
            };

            await transferPage.makeTransfer(form);

            await expect(transferPage.amountError).toHaveText("Insufficient funds")
        });
    });
});
