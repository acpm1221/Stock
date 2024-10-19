Stock Market Dashboard
Overview
This project is a simple web application that allows users to fetch and visualize stock data. Users can input a stock ticker symbol or select from a dropdown of trending stocks to view detailed stock information, including price, volume, and price changes. Additionally, users can see a graphical representation of the stock's price trends.

Features
Search Stock by Ticker: Enter a stock ticker symbol to retrieve its current data.
Trending Stocks Dropdown: Select from a list of trending stocks to view their data.
Stock Details Display: View the latest stock price, change, and trading volume.
Price Graph: Visualize the stock price over the last 30 days.
Comparison Table: Compare multiple stocks by viewing their details in a table format.
Technologies Used
HTML
CSS
JavaScript
Chart.js (for graph visualization)
Alpha Vantage API (for stock data retrieval)
Installation
Clone the repository:

bash

git clone https://github.com/yourusername/stock-market-dashboard.git
cd stock-market-dashboard
Open index.html in your web browser.

API Key
To access stock data, you'll need an API key from Alpha Vantage. Replace the apiKeyNew variable in script.js with your own API key.

javascript

const apiKeyNew = 'YOUR_API_KEY_HERE';
Usage
Enter a stock ticker symbol in the input field and click the "Fetch Stock" button to retrieve data.
Alternatively, select a stock from the "Trending Stocks" dropdown and click the "Fetch Selected Stock" button.
The application will display stock details and a price graph for the selected stock.
