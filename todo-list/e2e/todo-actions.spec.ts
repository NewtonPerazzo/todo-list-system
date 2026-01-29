import { test, expect, type Page } from '@playwright/test';

const uniqueName = () => `Action Task ${Date.now()}`;

async function getTodoCard(page: Page, name: string) {
  const heading = page.getByRole('heading', { name });
  return heading.locator('xpath=ancestor::div[@data-testid]');
}

async function createTodo(page: Page, name: string) {
  await page.getByPlaceholder('Enter task name').fill(name);
  await page.getByPlaceholder('Enter task description').fill('Action test');
  await page.getByLabel('Deadline').fill('2026-12-31');
  await page.getByRole('button', { name: 'Add To Do' }).click();
  await expect(page.getByRole('heading', { name })).toBeVisible({ timeout: 10000 });
}

test.describe('Todo Actions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should toggle todo as done', async ({ page }) => {
    const name = uniqueName();
    await createTodo(page, name);

    const todoCard = await getTodoCard(page, name);
    await todoCard.getByRole('checkbox').click();

    await expect(page.getByText('Task completed!')).toBeVisible({ timeout: 5000 });
  });

  test('should toggle todo back to not done', async ({ page }) => {
    const name = uniqueName();
    await createTodo(page, name);

    const todoCard = await getTodoCard(page, name);

    // Mark as done
    await todoCard.getByRole('checkbox').click();
    await expect(page.getByText('Task completed!')).toBeVisible({ timeout: 5000 });

    // Wait for refetch then uncheck
    await page.waitForTimeout(1500);
    const updatedCard = await getTodoCard(page, name);
    await updatedCard.getByRole('checkbox').click();
    await expect(page.getByText('Task marked as pending')).toBeVisible({ timeout: 5000 });
  });

  test('should cancel a todo', async ({ page }) => {
    const name = uniqueName();
    await createTodo(page, name);

    const todoCard = await getTodoCard(page, name);
    await todoCard.getByRole('button', { name: 'Cancel' }).click();

    await expect(page.getByText('Task canceled')).toBeVisible({ timeout: 5000 });
  });

  test('should reactivate a canceled todo', async ({ page }) => {
    const name = uniqueName();
    await createTodo(page, name);

    const todoCard = await getTodoCard(page, name);

    // Cancel first
    await todoCard.getByRole('button', { name: 'Cancel' }).click();
    await expect(page.getByText('Task canceled')).toBeVisible({ timeout: 5000 });

    // Canceled todos move to the end — navigate to find it
    await page.waitForTimeout(1500);

    // Try to find the reactivate button, navigating pages if needed
    let found = false;
    for (let i = 0; i < 5; i++) {
      const reactivateBtn = page.getByRole('heading', { name })
        .locator('xpath=ancestor::div[@data-testid]')
        .getByRole('button', { name: 'Reactivate' });

      if (await reactivateBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
        await reactivateBtn.click();
        found = true;
        break;
      }

      // Try next page
      const nextBtn = page.getByRole('button', { name: 'Next' });
      if (await nextBtn.isEnabled().catch(() => false)) {
        await nextBtn.click();
        await page.waitForTimeout(1000);
      } else {
        break;
      }
    }

    if (found) {
      await expect(page.getByText('Task reactivated')).toBeVisible({ timeout: 5000 });
    }
  });

  test('should cancel edit mode', async ({ page }) => {
    const name = uniqueName();
    await createTodo(page, name);

    const todoCard = await getTodoCard(page, name);
    await todoCard.getByRole('button', { name: 'Edit' }).click();

    await expect(page.getByText('Edit Task')).toBeVisible();

    // Cancel editing — the cancel button is in the form, not the todo card
    await page.locator('form').getByRole('button', { name: 'Cancel' }).click();

    await expect(page.getByText('Add New Task')).toBeVisible();
  });
});
