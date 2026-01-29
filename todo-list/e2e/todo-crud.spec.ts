import { test, expect, type Page } from '@playwright/test';

const uniqueName = () => `Test Task ${Date.now()}`;

async function getTodoCard(page: Page, name: string) {
  const heading = page.getByRole('heading', { name });
  return heading.locator('xpath=ancestor::div[@data-testid]');
}

test.describe('Todo CRUD', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the page with header and form', async ({ page }) => {
    await expect(page.getByText('TO DO LIST')).toBeVisible();
    await expect(page.getByText('Add New Task')).toBeVisible();
  });

  test('should create a new todo', async ({ page }) => {
    const name = uniqueName();

    await page.getByPlaceholder('Enter task name').fill(name);
    await page.getByPlaceholder('Enter task description').fill('E2E test description');
    await page.getByLabel('Deadline').fill('2026-12-31');
    await page.getByRole('button', { name: 'Add To Do' }).click();

    await expect(page.getByRole('heading', { name })).toBeVisible({ timeout: 10000 });
  });

  test('should show validation errors when submitting empty form', async ({ page }) => {
    await page.getByRole('button', { name: 'Add To Do' }).click();

    await expect(page.getByText('Task name is required')).toBeVisible();
    await expect(page.getByText('Deadline is required')).toBeVisible();
  });

  test('should edit a todo', async ({ page }) => {
    const name = uniqueName();

    // Create a todo first
    await page.getByPlaceholder('Enter task name').fill(name);
    await page.getByPlaceholder('Enter task description').fill('Original description');
    await page.getByLabel('Deadline').fill('2026-12-31');
    await page.getByRole('button', { name: 'Add To Do' }).click();
    await expect(page.getByRole('heading', { name })).toBeVisible({ timeout: 10000 });

    // Click Edit on the created todo
    const todoCard = await getTodoCard(page, name);
    await todoCard.getByRole('button', { name: 'Edit' }).click();

    // Form should switch to edit mode
    await expect(page.getByText('Edit Task')).toBeVisible();

    // Update the name
    const updatedName = `${name} Updated`;
    await page.getByPlaceholder('Enter task name').fill(updatedName);
    await page.getByRole('button', { name: 'Save Changes' }).click();

    await expect(page.getByRole('heading', { name: updatedName })).toBeVisible({ timeout: 10000 });
  });

  test('should delete a todo', async ({ page }) => {
    const name = uniqueName();

    // Create a todo first
    await page.getByPlaceholder('Enter task name').fill(name);
    await page.getByPlaceholder('Enter task description').fill('To be deleted');
    await page.getByLabel('Deadline').fill('2026-12-31');
    await page.getByRole('button', { name: 'Add To Do' }).click();
    await expect(page.getByRole('heading', { name })).toBeVisible({ timeout: 10000 });

    // Delete it
    const todoCard = await getTodoCard(page, name);
    await todoCard.getByRole('button', { name: 'Delete' }).click();

    await expect(page.getByRole('heading', { name })).not.toBeVisible({ timeout: 10000 });
  });
});
