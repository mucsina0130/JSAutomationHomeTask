import { test, expect } from '@playwright/test';
import * as selectors from "../data/selectors.json"

test.describe('UI tests for EPAM website', () =>{
  test('has title', async ({ page }) => {
    await page.goto('https://www.epam.com/');
  
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle("EPAM | Software Engineering & Product Development Services");
  });

  test('Check header logo existence', async ({ page }) => {
    await page.goto('https://www.epam.com/');
    const logo = page.locator(selectors.logo);
    await expect(logo).toBeVisible();
  });

  test('Check the existence of the text “RESULTS FOR “AUTOMATION"” after clicking on search ', async ({ page }) => {
    await page.goto('https://www.epam.com/');
    const search_button = page.locator(selectors.search_button);
    await search_button.click();
    const search_input_field = page.locator(selectors.search_input_field);
    const search_submit = page.locator(selectors.search_submit);
    await search_input_field.fill("AUTOMATION");
    await search_submit.click();
    const search_result_text = page.locator(selectors.search_result_text);
    search_result_text.waitFor();
    await expect(search_result_text).toContainText(/[0-9]* results for "AUTOMATION"/);
  })
} ) 
