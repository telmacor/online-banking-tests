import { Page, Locator } from '@playwright/test';
import type { TransferForm } from '../types/form.types.js';

export class TransferPage {
  readonly page: Page;

  readonly fromAccount: Locator;
  readonly toAccount: Locator;
  readonly amount: Locator;
  readonly fromAccountError: Locator;
  readonly toAccountError: Locator;
  readonly amountError: Locator;
  readonly confirmationMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Locators
    this.fromAccount = page.locator('#fromAccount');
    this.toAccount = page.locator('#toAccount');
    this.amount = page.locator('#amount');
    this.fromAccountError = page.locator('#fromAccountError');
    this.toAccountError = page.locator('#toAccountError');
    this.amountError = page.locator('#amountError');
    this.confirmationMessage = page.locator('#confirmationMessage');
  }

  // Open HTML file
  async open() {
    await this.page.goto(`file://${process.cwd()}/fund-transfer.html`);
  }

  // Fill the form and submit
  async makeTransfer(form: TransferForm) {
    await this.page.fill('#fromAccount', form.from_account);
    await this.page.fill('#toAccount', form.to_account);
    await this.page.fill('#amount', form.amount.toString());
    await this.page.selectOption('#currency', form.currency);
    await this.page.click('#transferButton');
  }
}
