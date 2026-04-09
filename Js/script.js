function addToCart(productName) {
    alert(productName + " added to cart!");
}
function bookDoctor(name) {
    alert("Appointment booked with " + name);
}
function submitForm(event) {
    event.preventDefault();

    let name = document.querySelector("input[type='text']").value;
    let date = document.querySelector("input[type='date']").value;
    let time = document.querySelector("input[type='time']").value;
    let doctor = document.getElementById("doctorSelect").value;

    let booking = {
        name: name,
        date: date,
        time: time,
        doctor: doctor
    };

    localStorage.setItem("bookingData", JSON.stringify(booking));

    alert("Appointment Confirmed!");
}
function selectDoctor(name) {
    localStorage.setItem("selectedDoctor", name);
    window.location.href = "booking.html";
}
window.onload = function () {
    let doctor = localStorage.getItem("selectedDoctor");
    if (doctor) {
        document.getElementById("doctorSelect").value = doctor;
    }
};

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(name + " added to cart");
}

function loadCart() {
    let cartItems = document.getElementById("cartItems");
    let total = 0;

    cartItems.innerHTML = "";

    cart.forEach(item => {
        let li = document.createElement("li");
        li.textContent = item.name + " - ₹" + item.price;
        cartItems.appendChild(li);
        total += item.price;
    });

    document.getElementById("total").textContent = "Total: ₹" + total;
}

if (window.location.pathname.includes("cart.html")) {
    loadCart();
}

function loginUser(event) {
    event.preventDefault();
    alert("Login Successful!");
}

function loadHistory() {
    let data = JSON.parse(localStorage.getItem("bookingData"));
    let container = document.getElementById("historyList");

    if (!data) {
        container.innerHTML = "No bookings found";
        return;
    }

    container.innerHTML = `
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Doctor:</strong> ${data.doctor}</p>
        <p><strong>Date:</strong> ${data.date}</p>
        <p><strong>Time:</strong> ${data.time}</p>
    `;
}

if (window.location.pathname.includes("history.html")) {
    loadHistory();
}

function viewProduct(name, price, image) {
    let product = {
        name: name,
        price: price,
        image: image
    };

    localStorage.setItem("selectedProduct", JSON.stringify(product));
    window.location.href = "product_details.html";
}

function loadProductDetails() {
    let product = JSON.parse(localStorage.getItem("selectedProduct"));

    if (!product) return;

    document.getElementById("productName").textContent = product.name;
    document.getElementById("productPrice").textContent = "₹" + product.price;
    document.getElementById("productImage").src = product.image;
}

if (window.location.pathname.includes("product_details.html")) {
    loadProductDetails();
}

function addToCartFromDetails() {
    let product = JSON.parse(localStorage.getItem("selectedProduct"));

    if (!product) return;

    addToCart(product.name, product.price);
}