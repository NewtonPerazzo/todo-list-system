import { test, expect, type Page } from '@playwright/test';

async function getTodoCard(page: Page, name: string) {
  const heading = page.getByRole('heading', { name });
  return heading.locator('xpath=ancestor::div[@data-testid]');
}

test.describe('Todo List', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should show empty state or tasks list', async ({ page }) => {
    const emptyMessage = page.getByText('No tasks yet');
    const tasksList = page.getByText('Your Tasks');

    await expect(emptyMessage.or(tasksList)).toBeVisible({ timeout: 10000 });
  });

  test('should display task count in list header', async ({ page }) => {
    const name = `List Task ${Date.now()}`;
    await page.getByPlaceholder('Enter task name').fill(name);
    await page.getByPlaceholder('Enter task description').fill('List test');
    await page.getByLabel('Deadline').fill('2026-12-31');
    await page.getByRole('button', { name: 'Add To Do' }).click();
    await expect(page.getByRole('heading', { name })).toBeVisible({ timeout: 10000 });

    await expect(page.getByText(/Your Tasks \(\d+\)/)).toBeVisible();
  });

  test('should show pagination when enough todos exist', async ({ page }) => {
    // Create multiple todos to trigger pagination
    for (let i = 0; i < 11; i++) {
      const name = `Pagination ${Date.now()}-${i}`;
      await page.getByPlaceholder('Enter task name').fill(name);
      await page.getByPlaceholder('Enter task description').fill(`Item ${i}`);
      await page.getByLabel('Deadline').fill('2026-12-31');
      await page.getByRole('button', { name: 'Add To Do' }).click();
      await page.waitForTimeout(500);
    }

    await page.reload();
    await page.waitForTimeout(2000);

    await expect(page.getByText(/Page \d+ of \d+/)).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('button', { name: 'Next' })).toBeVisible();
  });

  test('should navigate between pages', async ({ page }) => {
    const paginationText = page.getByText(/Page \d+ of \d+/);

    if (await paginationText.isVisible({ timeout: 5000 }).catch(() => false)) {
      await expect(page.getByText('Page 1 of')).toBeVisible();

      await page.getByRole('button', { name: 'Next' }).click();
      await expect(page.getByText('Page 2 of')).toBeVisible({ timeout: 5000 });

      await page.getByRole('button', { name: 'Previous' }).click();
      await expect(page.getByText('Page 1 of')).toBeVisible({ timeout: 5000 });
    }
  });

  test('should display todo item details', async ({ page }) => {
    const name = `Detail Task ${Date.now()}`;
    await page.getByPlaceholder('Enter task name').fill(name);
    await page.getByPlaceholder('Enter task description').fill('Detail description');
    await page.getByLabel('Deadline').fill('2026-12-31');
    await page.getByRole('button', { name: 'Add To Do' }).click();
    await expect(page.getByRole('heading', { name })).toBeVisible({ timeout: 10000 });

    const todoCard = await getTodoCard(page, name);
    await expect(todoCard.getByText('Detail description')).toBeVisible();
    await expect(todoCard.getByText(/Created:/).first()).toBeVisible();
    await expect(todoCard.getByText(/Deadline:/).first()).toBeVisible();
    await expect(todoCard.getByRole('button', { name: 'Edit' })).toBeVisible();
    await expect(todoCard.getByRole('button', { name: 'Delete' })).toBeVisible();
    await expect(todoCard.getByRole('checkbox')).toBeVisible();
  });
});
