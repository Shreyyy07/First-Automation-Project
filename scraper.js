const { Builder, By, Key, until } = require('selenium-webdriver');
require('dotenv').config();

async function scrapeData() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // Login to Twitter
    await driver.get('https://twitter.com/login');
    await driver.findElement(By.name('session[username_or_email]')).sendKeys(process.env.TWITTER_USERNAME);
    await driver.findElement(By.name('session[password]')).sendKeys(process.env.TWITTER_PASSWORD, Key.RETURN);
    await driver.wait(until.elementLocated(By.css('div[data-testid="AppTabBar_Home_Link"]')), 10000);

    // Navigate to the 'What's Happening' section
    await driver.get('https://twitter.com/explore/tabs/trending');
    await driver.wait(until.elementLocated(By.css('section[aria-labelledby="accessible-list-0"]')), 10000);

    // Scraping the top 5 trends
    const trends = await driver.findElements(By.css('div[aria-labelledby="accessible-list-0"] > div > div > div > div > div > div > div > div > div > div > span'));
    let trendNames = [];
    for (let i = 0; i < 5; i++) {
      trendNames.push(await trends[i].getText());
    }

    return { trendNames };

  } catch (error) {
    console.error('Error during scraping:', error);
    throw error;
  } finally {
    await driver.quit();
  }
}

module.exports = { scrapeData };

