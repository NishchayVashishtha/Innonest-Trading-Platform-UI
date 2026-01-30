document.addEventListener("DOMContentLoaded", function() {
    fetchData();
});

let orders = [];
let currentSearchQuery = '';

function fetchData() {
    fetch('orders.json')
        .then(response => response.json())
        .then(data => {
            renderNavbar(data.navbar);
            renderContent(data.content);
            orders = data.orders;
            renderOrders(orders);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function renderNavbar(navbarData) {
    const navbar = document.getElementById('navbar');
    navbar.innerHTML = `
        <img src="${navbarData.logo}" alt="Company Logo" width="100">
        <div class="nav-links">
            ${navbarData.links.map(link => 
                `<a href="${link.href}" class="${link.active ? 'active' : ''}">${link.text}</a>`
            ).join('')}
        </div>
        <div class="user-info">
            <i class="${navbarData.userInfo.icon}"></i>
            <span>${navbarData.userInfo.name}</span>
        </div>
    `;
}

function renderContent(contentData) {
    document.getElementById('header').textContent = contentData.header;

    const sortSelect = document.getElementById('sortSelect');
    sortSelect.innerHTML = contentData.searchSort.sortOptions.map(option => 
        `<option value="${option.value}">${option.text}</option>`
    ).join('');
}

function renderOrders(orderData) {
    let filteredOrders = filterOrders(orderData);
    filteredOrders = sortOrders(filteredOrders);

    const orderList = document.getElementById('orderList');
    orderList.innerHTML = "";

    filteredOrders.forEach((order) => {
        const orderElement = document.createElement('div');
        orderElement.classList.add('order-item');

        let actions = '';
        let quantityField = `<p>Quantity: ${order.quantity}</p>`;
        if (order.status !== 'Failed' && order.status !== 'Completed') {
            actions = `
                <div class="actions">
                    <button class="edit" onclick="editOrder(${order.id})">Edit</button>
                    <button class="delete" onclick="deleteOrder(${order.id})">Delete</button>
                </div>
            `;
        }

        orderElement.innerHTML = `
            <div>
                <h3>Order #${order.id}</h3>
                <p>Item: ${order.item}</p>
                ${quantityField}
            </div>
            <div>
                <span class="status">${order.status}</span>
                ${actions}
            </div>
        `;
        orderList.appendChild(orderElement);
    });
}

function filterOrders(orderData) {
    return orderData.filter(order =>
        order.item.toLowerCase().includes(currentSearchQuery.toLowerCase())
    );
}

function sortOrders(orderData) {
    const sortValue = document.getElementById('sortSelect').value;
    if (sortValue === 'quantity-asc') {
        return orderData.sort((a, b) => a.quantity - b.quantity);
    } else if (sortValue === 'quantity-desc') {
        return orderData.sort((a, b) => b.quantity - a.quantity);
    } else if (sortValue === 'status') {
        return orderData.sort((a, b) => a.status.localeCompare(b.status));
    }
    return orderData;
}

function handleSearch(event) {
    currentSearchQuery = event.target.value;
    renderOrders(orders);
}

function handleSort(event) {
    renderOrders(orders);
}

function editOrder(id) {
    alert('Edit functionality for order #' + id);
}

function deleteOrder(id) {
    alert('Delete functionality for order #' + id);
}
