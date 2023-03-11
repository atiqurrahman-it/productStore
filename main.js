const arr = [];

const loadProducts = (url) => {
    fetch(url)
       .then((res) => res.json())
       .then((data) => {
          arr.push(data);
          showProducts(data);
          });
       
 };

 loadProducts('https://fakestoreapi.com/products');

 // show all product in UI
const showProducts = (products) => {
    //total product show 
    // setInnerText('total_products', products.length);

    const productContainer =document.getElementById("all-products")
    // remove before  product when new product show 
    productContainer.innerHTML = "";

    products.forEach(product=>{
        // product store array
        arr.push(product)

        createCardItem(product,productContainer)
    })
}

const createCardItem=(product,addLocation)=>{
       //carate card 
       const card=document.createElement('div')
       card.classList.add('col')
       card.innerHTML=`
               <div class="card h-100">
                    <img src="${product.image}" style="max-height:230px;" class="img-fluid card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p>Category: ${product.category}</p>
                        <h2>Price: $ ${product.price}</h2>
                        <p class="card-text">${product.description.slice(0,75)}...</p>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                    <button onclick="showProductDetails(${product.id})" id="details-btn"    data-bs-toggle="modal"
                    data-bs-target="#exampleModal" class="btn btn-outline-secondary mb-2 rounded-1 mt-1">Details</button>

                    <button onclick="addToCart(${product.id},${product.price})"  class="btn btn-primary"> Add to cart</button>
                    </div>
                </div>
       `
       addLocation.appendChild(card)
}

let count=0;
const addToCart=(id,price)=>{
    count = count + 1;
    let  value=price
    updatePrice('price', value);
    updateTaxAndCharge();

   document.getElementById('total-Products').innerText = count;
   updateTotal()
}

// main price update function
const updatePrice = (id, value) => {
    // debugger
    const convertedOldPrice = getInputValue(id);
    const convertPrice = parseFloat(value);
    const total = convertedOldPrice + convertPrice;
    document.getElementById(id).innerText = total.toFixed(2);
 };

 // update delivery charge and total Tax
const updateTaxAndCharge = () => {
    const priceConverted = getInputValue('price');
    if (priceConverted > 500) {
       setInnerText('delivery-charge', 60);
       setInnerText('total-tax', priceConverted * 0.4);
    }
    else if (priceConverted > 400) {
       setInnerText('delivery-charge', 50);
       setInnerText('total-tax', priceConverted * 0.3);
    }
    else if (priceConverted > 200) {
       setInnerText('delivery-charge', 30);
       setInnerText('total-tax', priceConverted * 0.2);
    }
 };

//grandTotal update function
const updateTotal = () => {
    const grandTotal = getInputValue('price') + getInputValue('delivery-charge') +getInputValue('total-tax');
    document.getElementById('total').innerText = grandTotal.toFixed(2);
 };
 

 const getInputValue = (id) => {
    const element = document.getElementById(id).innerText;
    const converted = parseFloat(element);
    return converted;
 };
 

const showProductDetails = (product_id) => {
    fetch(`https://fakestoreapi.com/products/${product_id}`)
       .then((res) => res.json())
       .then((data) => showProductDetailsInModal(data));
 };

 const showProductDetailsInModal = (product_details) => {
    setInnerText('exampleModalLabel', product_details.title);
    setInnerText('productId', product_details.id);
    setInnerText('modal_body', product_details.description);
    setInnerText('rating', product_details.rating.rate);
 };

 // set innerText function
const setInnerText = (id, value) => {
    document.getElementById(id).innerText = value;
 };


 document.getElementById('searchBtn').addEventListener('click',function(){
    const searchText=document.getElementById('searchText').value

    const searchedProduct=arr[0].filter((p)=>
        p.title.includes(searchText)
    )

    showProducts(searchedProduct)

 })
 