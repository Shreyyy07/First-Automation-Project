# Twitter Trending Topics Scraper

This project is a web scraping solution built with Selenium, ProxyMesh, and JavaScript. It automates the process of logging into Twitter, fetching the top 5 trending topics under the "What’s Happening" section, and using a proxy for each request to avoid IP blocks.

---

## Features

- **Automated Login**: Uses Selenium to log into Twitter with credentials stored in a `.env` file for security.
- **Trending Topics Extraction**: Fetches the top 5 trending topics under the "What’s Happening" section on the Twitter homepage.
- **Proxy Integration**: Uses ProxyMesh to route each request through a unique IP address.
- **Interactive Frontend**: A simple HTML interface with a button to trigger the script and display the results dynamically.

---

## Technologies Used

- **Backend**: Node.js, Selenium WebDriver
- **Frontend**: HTML, JavaScript
- **Proxy Service**: ProxyMesh
- **Environment Management**: dotenv

---

## Future Enhancements
- Store scraped data in MongoDB for historical analysis.
- Improve frontend design with frameworks like React or Tailwind CSS.
- Add support for multiple proxy providers.
- Schedule periodic scraping using a job scheduler like node-cron.

