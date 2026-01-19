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

    test.describe('Form errors validation', () => {
    
        test('From account field validations', async ({ page }) => {
            const transferPage = new TransferPage(page);
            await transferPage.open();

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

            const fromAccountError = page.locator('#fromAccountError');
            await page.fill('#fromAccount', 'AA');
            await page.click('#transferButton');

            //Validate message when less that 3 characters
            await expect(fromAccountError).toHaveText("Account ID must be at least 3 characters")
        });

        test('To account field validations', async ({ page }) => {
            const transferPage = new TransferPage(page);
            await transferPage.open();

            const toAccount = page.locator('#toAccount');
            const form: TransferForm = {
                from_account: 'AAA',
                to_account: '',
                amount: 100,
                currency: 'EUR'
            };

            await transferPage.makeTransfer(form);

            // From Account should have the validation message
            await expect(toAccount).toHaveJSProperty('validationMessage', 'Please fill out this field.');
        });

        test('Amount field validations', async ({ page }) => {
            const transferPage = new TransferPage(page);
            await transferPage.open();

            const amount = page.locator('#amount');
            const form: TransferForm = {
                from_account: 'AAA',
                to_account: 'BBB',
                amount: 0,
                currency: 'EUR'
            };

            await transferPage.makeTransfer(form);

            // From Account should have the validation message
            await expect(amount).toHaveJSProperty('validity.rangeUnderflow', true);
        });

        test('Validation for same account transfer attempt', async ({ page }) => {
            const transferPage = new TransferPage(page);
            await transferPage.open();

            const toAccount = page.locator('#toAccount');
            const form: TransferForm = {
                from_account: 'AAA',
                to_account: 'AAA',
                amount: 100,
                currency: 'EUR'
            };

            await transferPage.makeTransfer(form);

            const toAccountError = page.locator('#toAccountError');
            await expect(toAccountError).toHaveText("Cannot transfer to the same account")
        });

        test('Insufficient funds error message display', async ({ page }) => {
            const transferPage = new TransferPage(page);
            await transferPage.open();

            const toAccount = page.locator('#toAccount');
            const form: TransferForm = {
                from_account: 'AAA',
                to_account: 'BBB',
                amount: 1500.76,
                currency: 'USD'
            };

            await transferPage.makeTransfer(form);

            const amountError = page.locator('#amountError');
            await expect(amountError).toHaveText("Insufficient funds")
        });
    });
});
