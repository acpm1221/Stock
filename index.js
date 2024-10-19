const apiKeyNew = 'UXVR3583RFH2NZRE';
const stockInputField = document.getElementById('stockInputField');
const fetchButton = document.getElementById('fetchButton');
const stockInfoDisplay = document.getElementById('stockInfoDisplay');
const stockComparisonTable = document.getElementById('stockComparisonTable').getElementsByTagName('tbody')[0];
const chartContext = document.getElementById('stockPriceChart').getContext('2d');
let priceChartInstance;

const stockOptionsDropdown = document.getElementById('stockOptionsDropdown');
const fetchSelectedStockButton = document.getElementById('fetchSelectedStockButton');

// Fetch stock data
async function retrieveStockData(stockTicker) {
    const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockTicker}&apikey=${apiKeyNew}`);
    const data = await response.json();
    return data['Time Series (Daily)'];
}

// Fetch top 10 trending stocks
async function fetchTrendingStocks() {
    const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=${apiKeyNew}`);
    const data = await response.json();
    const trendingStockList = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'FB', 'NFLX', 'NVDA', 'BABA', 'INTC'];
    return trendingStockList;
}

// Populate dropdown with trending stocks
async function fillStockDropdown() {
    const trendingStocks = await fetchTrendingStocks();
    trendingStocks.forEach(stock => {
        const optionElement = document.createElement('option');
        optionElement.value = stock;
        optionElement.text = stock;
        stockOptionsDropdown.appendChild(optionElement);
    });
}

// Display stock details
function showStockDetails(stockData, ticker) {
    const latestTradeDate = Object.keys(stockData)[0];
    const latestTradeData = stockData[latestTradeDate];
    const currentPrice = latestTradeData['4. close'];
    const tradeVolume = latestTradeData['5. volume'];
    const priceChange = (latestTradeData['4. close'] - stockData[Object.keys(stockData)[1]]['4. close']).toFixed(2);
    
    stockInfoDisplay.innerHTML = `
        <h3>${ticker}</h3>
        <p>Price: $${currentPrice}</p>
        <p>Change: $${priceChange}</p>
        <p>Volume: ${tradeVolume}</p>
    `;

    updateComparisonTable(ticker, currentPrice, priceChange, tradeVolume);
}

// Update stock comparison table
function updateComparisonTable(ticker, currentPrice, priceChange, tradeVolume) {
    const newRow = stockComparisonTable.insertRow();
    newRow.innerHTML = `
        <td>${ticker}</td>
        <td>$${currentPrice}</td>
        <td>${priceChange}</td>
        <td>${tradeVolume}</td>
    `;
}

// Display stock price graph
function showStockPriceGraph(stockData) {
    const labelsArray = Object.keys(stockData).slice(0, 30).reverse();
    const priceData = labelsArray.map(date => stockData[date]['4. close']);

    if (priceChartInstance) {
        priceChartInstance.destroy();
    }

    priceChartInstance = new Chart(chartContext, {
        type: 'line',
        data: {
            labels: labelsArray,
            datasets: [{
                label: 'Stock Price',
                data: priceData,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

// Handle stock search
fetchButton.addEventListener('click', async () => {
    const stockTicker = stockInputField.value.toUpperCase();
    const stockData = await retrieveStockData(stockTicker);
    
    if (stockData) {
        showStockDetails(stockData, stockTicker);
        showStockPriceGraph(stockData);
    } else {
        stockInfoDisplay.innerHTML = `<p>Stock symbol not found.</p>`;
    }
});

// Load stock from dropdown
fetchSelectedStockButton.addEventListener('click', async () => {
    const selectedTicker = stockOptionsDropdown.value;
    const stockData = await retrieveStockData(selectedTicker);
    if (stockData) {
        showStockDetails(stockData, selectedTicker);
        showStockPriceGraph(stockData);
    } else {
        stockInfoDisplay.innerHTML = `<p>Stock data not available for ${selectedTicker}.</p>`;
    }
});

// Initialize dropdown with trending stocks
fillStockDropdown();
