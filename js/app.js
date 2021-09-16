const loadProducts = () => {
    const url = `https://fakestoreapi.com/products`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => showProducts(data));
};


loadProducts();

// show all product in UI 
const showProducts = (products) => {
    const allProducts = products.map((pd) => pd);
    for (const product of allProducts) {
        const image = product.image; //----------------product image name error solve
        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `<div class="single-product  m-2 rounded">
        <div>
      <img class="product-image" src=${image}></img>
        </div>
        <h4>${product.title}</h4>
        <p>Category: ${product.category}</p>
        <h5>Price: $ ${product.price}</h5>
        <div class="fw-bold rounded text-warning mt-2">
        <p>Rating Average: ${product.rating.rate} <br> Rating Count: ${product.rating.count}</p>
      </div>
        <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
        <button id="details-btn" class="btn btn-danger">Details</button>
        </div>
        `;
        document.getElementById("all-products").appendChild(div);
    }
};
// Product count part
let count = 0;
const addToCart = (id, price) => {
    count = count + 1;
    updatePrice("price", price);

    updateTaxAndCharge();
    updateTotal(); //Function call First time for error solve 
    document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
    const element = document.getElementById(id).innerText;
    const converted = parseFloat(element);
    return converted;
};

// main price update function
const updatePrice = (id, value) => {
    updateTotal(); //Function call second time for error solve 
    const convertedOldPrice = getInputValue(id);
    const convertPrice = parseFloat(value);
    const total = convertedOldPrice + convertPrice;
    document.getElementById(id).innerText = (Math.round(total * 100) / 100).toFixed(2); //Fix calculation for error
};

// set innerText function
const setInnerText = (id, value) => {
    updateTotal(); //Function call Third time for error solve 
    document.getElementById(id).innerText = (Math.round(value * 100) / 100).toFixed(2); //Fix calculation for error
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
    const priceConverted = getInputValue("price");
    if (priceConverted > 200) {
        setInnerText("delivery-charge", 30);
        setInnerText("total-tax", priceConverted * 0.2);
    }
    if (priceConverted > 400) {
        setInnerText("delivery-charge", 50);
        setInnerText("total-tax", priceConverted * 0.3);
    }
    if (priceConverted > 500) {
        setInnerText("delivery-charge", 60);
        setInnerText("total-tax", priceConverted * 0.4);
    }
};

//grandTotal update function
const updateTotal = () => {
    const grandTotal =
        getInputValue("price") + getInputValue("delivery-charge") +
        getInputValue("total-tax");
    document.getElementById("total").innerText = grandTotal.toFixed(2);
};