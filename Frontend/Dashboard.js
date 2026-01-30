document.addEventListener("DOMContentLoaded", function() {
    const stockList = document.querySelector('.stock-list tbody');
    const searchInput = document.querySelector('.search-bar input');

    let stocksData = [];

    // Fetch data from the first JSON file (e.g., Dashboard.json)
    fetch('Dashboard.json') // Ensure the path matches the location of Dashboard.json
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            stocksData = data; // Store data from the first JSON file
            console.log('Stocks data from Dashboard.json:', stocksData); // Debug log to check loaded data
        })
        .catch(error => {
            console.error('Error fetching Dashboard.json:', error);
            alert('Failed to load stocks data from Dashboard.json. Please check the console for more details.');
        });

    // Fetch data from the second JSON file (e.g., OtherStocks.json)
    fetch('OtherStocks.json') // Ensure the path matches the location of OtherStocks.json
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Optionally, merge data from both JSON files if you want a combined stock list
            stocksData = stocksData.concat(data); // Combining the data from both files
            console.log('Stocks data from OtherStocks.json:', data); // Debug log to check loaded data
        })
        .catch(error => {
            console.error('Error fetching OtherStocks.json:', error);
            alert('Failed to load stocks data from OtherStocks.json. Please check the console for more details.');
        });

    // Fetch data from the third JSON file (e.g., index.json)
    fetch('index.json') // Ensure the path matches the location of index.json
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Optionally, merge data from the third JSON file as well
            stocksData = stocksData.concat(data); // Combine all the JSON data
            console.log('Stocks data from index.json:', data); // Debug log to check loaded data
        })
        .catch(error => {
            console.error('Error fetching index.json:', error);
            alert('Failed to load stocks data from index.json. Please check the console for more details.');
        });

    // Function to display stocks
    function displayStocks(stocks) {
        stockList.innerHTML = ''; // Clear previous results

        if (stocks.length > 0) {
            stocks.forEach(stock => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <th>${stock.name}</th>
                    <td class="${parseFloat(stock.percentage) >= 0 ? 'positive' : 'negative'}">${stock.percentage}</td>
                    <td class="${parseFloat(stock.percentage) >= 0 ? 'value-positive' : 'value-negative'}">${stock.price}</td>
                `;
                stockList.appendChild(row);
            });
        } else {
            stockList.innerHTML = '<tr><td colspan="3">No matching stocks found.</td></tr>';
        }
    }

    // Event listener for search input
    searchInput.addEventListener('input', function() {
        const query = searchInput.value.toLowerCase().trim();
        
        if (query) {
            // Filter stocks based on search query
            const filteredStocks = stocksData.filter(stock => 
                stock.name.toLowerCase().includes(query)
            );

            // Display the filtered stocks
            displayStocks(filteredStocks);
        } else {
            // If search input is empty, clear the stock list
            stockList.innerHTML = '';
        }
    });
});
