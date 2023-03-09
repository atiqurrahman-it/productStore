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
        createCardItem(product,productContainer)
    })
}

const createCardItem=(data,addLocation)=>{
       //carate card 
       const card=document.createElement('div')
       card.classList.add('col')
       card.innerHTML=`
                   <div class="col">
                       <div class="card h-100">
                       <img src="..." class="card-img-top" alt="...">
                       <div class="card-body">
                           <h5 class="card-title">Card title</h5>
                           <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                       </div>
                       </div>
                   </div>
       `
       addLocation.appendChild(card)
}