from playwright.async_api import async_playwright
import asyncio

class LinkedInService:
    async def scrape_profile(self, username: str) -> dict:
        """
        Scrapes a public LinkedIn profile for basic info.
        Note: LinkedIn is extremely aggressive with bot detection.
        This is a 'best effort' scraper for public profiles.
        """
        url = f"https://www.linkedin.com/in/{username}/"
        data = {"about": "", "experience": [], "name": ""}

        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            context = await browser.new_context(
                user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            )
            page = await context.new_page()
            
            try:
                print(f"💼 Scraping LinkedIn: {url}")
                await page.goto(url, wait_until="domcontentloaded", timeout=15000)
                
                # Check for login wall
                title = await page.title()
                if "Sign In" in title or "Login" in title:
                    print("⚠️ Hit LinkedIn Login Wall (Expected). Trying to find public data...")

                # Extract Name (often in h1)
                try:
                    name_el = await page.wait_for_selector("h1", timeout=5000)
                    if name_el:
                        data["name"] = await name_el.inner_text()
                except:
                    pass

                # Extract About (often in a section with 'About' header)
                # This is flaky because classes change. We'll try a generic text grab of the main area.
                try:
                    # simplistic fallback: get all text and let LLM parse it later if needed
                    # For now, let's just grab the meta description or main content
                    content = await page.content()
                    # A better trick for public profiles: The meta description often has the bio
                    meta_desc = await page.query_selector('meta[name="description"]')
                    if meta_desc:
                        data["about"] = await meta_desc.get_attribute("content")
                except Exception as e:
                    print(f"Could not extract about: {e}")

            except Exception as e:
                print(f"❌ LinkedIn Scrape Error: {e}")
            finally:
                await browser.close()
        
        return data
