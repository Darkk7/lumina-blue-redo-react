from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()
    page.goto("http://localhost:3000/website/1/info_centre/34/295")

    # Wait for the content to be loaded by looking for a specific element
    # that appears after the loading is complete.
    content_div = page.locator(".space-y-12")
    expect(content_div).to_be_visible(timeout=30000) # Wait up to 30 seconds

    page.screenshot(path="jules-scratch/verification/verification.png")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)