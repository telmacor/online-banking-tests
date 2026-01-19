import { Page } from '@playwright/test';
import type { TransferForm } from '../types/form.types.js';

export class TransferPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Abre o ficheiro HTML local
  async open() {
    await this.page.goto(`file://${process.cwd()}/fund-transfer.html`);
  }

  // Preenche o formulário e envia
  async makeTransfer(form: TransferForm) {
    await this.page.fill('#fromAccount', form.from_account);
    await this.page.fill('#toAccount', form.to_account);
    await this.page.fill('#amount', form.amount.toString());
    await this.page.selectOption('#currency', form.currency);
    await this.page.click('#transferButton');
  }
}
