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
                    <img src="${product.image}" style="max-height:250px;" class="img-fluid card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">${product.description}</p>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                    <button onclick="showProductDetails(${product.id})" id="details-btn"    data-bs-toggle="modal"
                    data-bs-target="#exampleModal" class="btn btn-outline-secondary mb-2 rounded-1 mt-1">Details</button>

                    <button class="btn btn-primary"> Add to cart</button>
                    </div>
                </div>
       `
       addLocation.appendChild(card)
}


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
    console.log(searchText)
    console.log(arr)
    console.log("search btn click ")

    const searchedProduct=arr[0].filter((p)=>
        p.title.includes(searchText)
    )

    showProducts(searchedProduct)

 })
 