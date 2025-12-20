import { expect, test, Locator, Page } from '@playwright/test';
//22/11/2025

async function getCompanyName (page: Page) : Promise<string[]> {
    const rows = page.locator ('tboyy tr');
    const count = await rows.count ();
    const companies: string [] =[];
    for (let i=0;i < count ; i++){
        // tôi nhớ 1 cách máy móc là company ở vị trí thứ 3
        const cell = rows.nth(i).locator ('td:nth-child(3)');
        const text = await cell.textContent ();
        companies.push ((text ||'').trim ());
    }
    return companies;
}