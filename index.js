require('dotenv').config();
const { Builder, By, Key, until } = require('selenium-webdriver');

async function loginAndFetchTrends() {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        // Step 1: Open Twitter Login Page
        await driver.get('https://twitter.com/login');

        // Step 2: Enter Username
        const usernameField = await driver.wait(
            until.elementLocated(By.css('input[autocomplete="username"]')),
            10000
        );
        await usernameField.sendKeys(process.env.TWITTER_USERNAME, Key.RETURN);

        // Step 3: Enter Password
        await driver.wait(until.elementLocated(By.css('input[autocomplete="current-password"]')), 10000);
        const passwordField = await driver.findElement(By.css('input[autocomplete="current-password"]'));
        await passwordField.sendKeys(process.env.TWITTER_PASSWORD, Key.RETURN);

        // Step 4: Handle CAPTCHA (Manual Step)
        console.log('CAPTCHA might appear. Please complete it manually.');
        await driver.wait(until.urlContains('home'), 60000); // Wait until home page is loaded

        console.log('Login successful. Fetching trending topics...');

        // Step 5: Wait for the "What’s Happening" section to load
        const trendingSection = await driver.wait(
            until.elementLocated(By.css('section[aria-labelledby="accessible-list-0"]')),
            10000
        );

        // Step 6: Extract Trending Topics
        const trends = await trendingSection.findElements(By.css('div[aria-label="Trending now"] a span'));
        let topTrends = [];
        for (let i = 0; i < Math.min(trends.length, 5); i++) {
            const trendText = await trends[i].getText();
            topTrends.push(trendText);
        }

        console.log('Top 5 Trending Topics:', topTrends);

        // Save to MongoDB or display results as needed

    } catch (error) {
        console.error('Error during login or scraping:', error);
    } finally {
        console.log('Browser will remain open for debugging.');
        // Uncomment to close the browser automatically:
        // await driver.quit();
    }
}

loginAndFetchTrends();
