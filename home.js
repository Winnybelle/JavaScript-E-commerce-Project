/***********nav toggle************/
const navDisplay = document.querySelector('.naV__hamburger');
const navDisappear = document.querySelector('.close_toggle');
const menu = document.querySelector('.naV__menu');

navDisplay.addEventListener('click', () => {
    const navLeft = menu.getBoundingClientRect().left;

        if(navLeft < 0){
            menu.style.left ='0';
            document.body.classList.add('active')
        }else{
            menu.style.left ='-40rem';
            document.body.classList.remove('active')
        }
});

navDisappear.addEventListener('click', () => {
    const navLeft = menu.getBoundingClientRect().left;

        if(navLeft > 0){
            menu.style.left ='0';
            document.body.classList.add('active')
        }else{
            menu.style.left ='-40rem';
            document.body.classList.remove('active')
        }
});






/******************shopping cart*******************/
 let carts = document.querySelectorAll('.addCart');

//array tracks num of products in the cart and details of item
let products = [
    {
        Name:'Royal Memory Divan Bed',
        tag:'royalmemorydivanbed',
        price:200,
        inCart: 0
    },
    {
        Name:'Mulberry Natural Spring Bed',
        tag:'mulberrynaturalspringbed',
        price:150,
        inCart: 0   
    },
    {
        Name:'Floating Universal Divan Base',
        tag:'floatinguniversaldivanbase',
        price:180,
        inCart: 0   
    },
     {
        Name:'Classic Memory Divan Bed',
        tag:'classicmemorydivanbed',
        price:120,
        inCart: 0
    },
    {
        Name:'Japanberry Natural Spring Bed',
        tag:'japanberrynaturalspringbed',
        price:250,
        inCart: 0   
    },
    {
        Name:'Comforting Universal Divan Base',
        tag:'comfortinguniversaldivanbase',
        price:160,
        inCart: 0   
    },
     {
        Name:'Parisian Memory Divan Bed',
        tag:'parisianmemorydivanbed',
        price:150,
        inCart: 0
    },
    {
        Name:'Softberry Storage Spring Bed',
        tag:'softberrystoragespringbed',
        price:170,
        inCart: 0   
    },
]
for(let i=0; i< carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}

//this function makes the num of items saved in cart remain thesame
 function onLoadCartNumbers() { 
     let productNumbers = localStorage.getItem('cartNumbers');
    
     if( productNumbers ) {  //if there are some items in the local storage
     document.querySelector('.naV_icons span').textContent = productNumbers; //let cart be equal to num of items in the localStorage
    }
 }
 
 //this function works to save the items in the cart that even though we leave the page the number of items would still remain
 function cartNumbers(product, action) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    console.log(productNumbers);

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if( action ) {
        localStorage.setItem("cartNumbers", productNumbers - 1);
        document.querySelector('.naV_icons span').textContent = productNumbers -1;
        console.log("action running");
    } else if( productNumbers ) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector('.naV_icons span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector('.naV_icons span').textContent = 1;
    }
    setItems(product);
}

function setItems(product) {
    // let productNumbers = localStorage.getItem('cartNumbers');
    // productNumbers = parseInt(productNumbers);
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        let currentProduct = product.tag;
    
        if( cartItems[currentProduct] == undefined ) {
            cartItems = {
                ...cartItems,
                [currentProduct]: product
            }
        } 
        cartItems[currentProduct].inCart += 1;

    } else {
        product.inCart = 1;
        cartItems = { 
            [product.tag]: product
        };
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost( product, action ) {
    let cart = localStorage.getItem("totalCost");

    if( action) {
        cart = parseInt(cart);

        localStorage.setItem("totalCost", cart - product.price);
    } else if(cart != null) {
        
        cart = parseInt(cart);
        localStorage.setItem("totalCost", cart + product.price);
    
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    let cart = localStorage.getItem("totalCost");
    cart = parseInt(cart);

    let productContainer = document.querySelector('.cart-info');
    
    if( cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map( (item, index) => {
            productContainer.innerHTML += 
            `<div class="product"><ion-icon name="close-circle"></ion-icon>
            <img src="./photos/${item.tag}.jfif" />
                <span class="sm-hide">${item.Name}</span>
            </div>
            <div class="price sm-hide">$${item.price},00</div>
            <div class="quantity">
                <ion-icon class="decrease " name="arrow-dropleft-circle"></ion-icon>
                    <span>${item.inCart}</span>
                <ion-icon class="increase" name="arrow-dropright-circle"></ion-icon>   
            </div>
            <div class="total">$${item.inCart * item.price},00</div>`
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">Basket Total</h4>
                <h4 class="basketTotal">$${cart},00</h4>
            </div>
            <div class="checkoutBtn">
            <a href="checkoutPage.html"><button>Proceed to Checkout</button></a>
            </div>`

        deleteButtons();
        manageQuantity();
    }
}

function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let currentQuantity = 0;
    let currentProduct = '';
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    for(let i=0; i < increaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentProduct);
             

            if( cartItems[currentProduct].inCart > 1 ) {
                cartItems[currentProduct].inCart -= 1;
                cartNumbers(cartItems[currentProduct], "decrease");
                totalCost(cartItems[currentProduct], "decrease");
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            }
        });

        increaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);


            let test7 = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase();
            let test8 = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'');
            let test9 = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(test7, test8, test9);


            currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentProduct);

            cartItems[currentProduct].inCart += 1;
            cartNumbers(cartItems[currentProduct]);
            totalCost(cartItems[currentProduct]);
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
        });
    }
}

function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.product ion-icon');
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productName;
    console.log(cartItems);

    for(let i=0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g,'').trim();
           
            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('totalCost', cartCost - ( cartItems[productName].price * cartItems[productName].inCart));

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();
        })
    }
}

onLoadCartNumbers();
displayCart();



















// function cartNumbers(product) {
//      let productNumbers = localStorage.getItem("cartNumbers"); //this code tells tells the cart to add more items after th first click
//      productNumbers = parseInt(productNumbers);

//      if(productNumbers){ //if product num exist,add more
//       localStorage.setItem("cartNumbers", productNumbers + 1);    //adds items to cart in the local localStorage as numbers
//       document.querySelector('.naV_icons span').textContent = productNumbers + 1;

//     }
//      else { //if theres isnt any when clicked for the first time,add and show num1
//       localStorage.setItem("cartNumbers", 1);    //adds items to cart in the local localStorage as numbers
//       document.querySelector('.naV_icons span').textContent = 1;
//     }
//     setItems(product);
//  }

//  function setItems(product) {
//     let itemsIncart = localStorage.getItem("productsInCart"); //to avoid items overwriting
//     itemsIncart = JSON.parse(itemsIncart); //pass from json to javascript object
    
   
//      if(itemsIncart != null) { 
//          if(itemsIncart[product.tag] == undefined) { 
//              itemsIncart = {
//                  ...itemsIncart,
//                  [product.tag]: product //add new product to cart
//              }
//          }
//         itemsIncart[product.tag].inCart += 1;
//         console.log(itemsIncart);
//     }
//     else {
//     product.inCart = 1;
//     itemsIncart = {
//          [product.tag]:product
         
//      }

//    }
     
//      //we need to pass thesse items not as a js object but as a json object into the localStorage
//      localStorage.setItem("productsInCart",JSON.stringify(itemsIncart));

//  }
//  function totalCost( product ) {
//     let  cartCost = localStorage.getItem("totalCost");

//     console.log("my products in cart ", cartCost);
//     console.log(typeof cartCost);

//     if (cartCost != null) {
//      cartCost = parseInt(cartCost);
//      localStorage.setItem("totalCost", cartCost + product.price );
//     }
//     else {
//     localStorage.setItem("totalCost", product.price);
//  }

//  onLoadCartNumbers();


 // function cartNumbers(product, action) {
//     let productNumbers = localStorage.getItem('cartNumbers');
//     productNumbers = parseInt(productNumbers);
//     console.log(productNumbers);

//     let cartItems = localStorage.getItem('productsInCart');
//     cartItems = JSON.parse(cartItems);

//     if( action ) {
//         localStorage.setItem("cartNumbers", productNumbers - 1);
//         document.querySelector('.naV_icons span').textContent = productNumbers - 1;
//         console.log("action running");
//     } else if( productNumbers ) {
//         localStorage.setItem("cartNumbers", productNumbers + 1);
//         document.querySelector('.naV_icons span').textContent = productNumbers + 1;
//     } else {
//         localStorage.setItem("cartNumbers", 1);//adds items to cart in the local localStorage as numbers
//         document.querySelector('.naV_icons span').textContent = 1;
//     }
//     setItems(product);
// }

// function setItems(product) {
//     // let productNumbers = localStorage.getItem('cartNumbers');
//     // productNumbers = parseInt(productNumbers);
//     let cartItems = localStorage.getItem('productsInCart');
//     cartItems = JSON.parse(cartItems);

//     if(cartItems != null) {
//         let currentProduct = product.tag;
    
//         if( cartItems[currentProduct] == undefined ) {
//             cartItems = {
//                 ...cartItems,
//                 [currentProduct]: product
//             }
//         } 
//         cartItems[currentProduct].inCart += 1;

//     } else {
//         product.inCart = 1;
//         cartItems = { 
//             [product.tag]: product
//         };
//     }

//     localStorage.setItem('productsInCart', JSON.stringify(cartItems));
// }

// function totalCost( product, action ) {
//     let cart = localStorage.getItem("totalCost");

//     if( action) {
//         cart = parseInt(cart);

//         localStorage.setItem("totalCost", cart - product.price);
//     } else if(cart != null) {
        
//         cart = parseInt(cart);
//         localStorage.setItem("totalCost", cart + product.price);
    
//     } else {
//         localStorage.setItem("totalCost", product.price);
//     }
// }

// function displayCart() {
//     let cartItems = localStorage.getItem('productsInCart');
//     cartItems = JSON.parse(cartItems);

//     let cart = localStorage.getItem("totalCost");
//     cart = parseInt(cart);

//     let productContainer = document.querySelector('.cart-info');
    
//     if( cartItems && productContainer ) {
//         productContainer.innerHTML = '';
//         Object.values(cartItems).map( (item, index) => {
//             productContainer.innerHTML += 
//             `<div class="product"><ion-icon name="close-circle"></ion-icon>
//             <img src="./photos/${item.tag}.jfif" />
//                 <span class="sm-hide">${item.Name}</span>
//             </div>
//             <div class="price sm-hide">$${item.price},00</div>
//             <div class="quantity">
//                 <ion-icon class="decrease " name="arrow-dropleft-circle"></ion-icon>
//                     <span class="q-span">${item.inCart}</span>
//                 <ion-icon class="increase" name="arrow-dropright-circle"></ion-icon>   
//             </div>
//             <div class="total">$${item.inCart * item.price},00</div>`;
//         });

//         productContainer.innerHTML += `
//             <div class="basketTotalContainer">
//                 <h4 class="basketTotalTitle">Basket Total</h4>
//                 <h4 class="basketTotal">$${cart},00</h4>
//             </div>`

//         deleteButtons();
//         manageQuantity();
//     }
// }

// function manageQuantity() {
//     let decreaseButtons = document.querySelectorAll('.decrease');
//     let increaseButtons = document.querySelectorAll('.increase');
//     let currentQuantity = 0;
//     let currentProduct = '';
//     let cartItems = localStorage.getItem('productsInCart');
//     cartItems = JSON.parse(cartItems);

//     for(let i=0; i < increaseButtons.length; i++) {
//         decreaseButtons[i].addEventListener('click', () => {
//             console.log(cartItems);
//             currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
//             console.log(currentQuantity);
//             currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
//             console.log(currentProduct);

//             if( cartItems[currentProduct].inCart > 1 ) {
//                 cartItems[currentProduct].inCart -= 1;
//                 cartNumbers(cartItems[currentProduct], "decrease");
//                 totalCost(cartItems[currentProduct], "decrease");
//                 localStorage.setItem('productsInCart', JSON.stringify(cartItems));
//                 displayCart();
//             }
//         });

//         increaseButtons[i].addEventListener('click', () => {
//             console.log(cartItems);
//             currentQuantity = increaseButtons[i].parentElement.querySelector(' span').textContent;
//             console.log(currentQuantity);
//             currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
//             console.log(currentProduct);

//             cartItems[currentProduct].inCart += 1;
//             cartNumbers(cartItems[currentProduct]);
//             totalCost(cartItems[currentProduct]);
//             localStorage.setItem('productsInCart', JSON.stringify(cartItems));
//             displayCart();
//         });
//     }
// }

// function deleteButtons() {
//     let deleteButtons = document.querySelectorAll('.product ion-icon');
//     let productNumbers = localStorage.getItem('cartNumbers');
//     let cartCost = localStorage.getItem("totalCost");
//     let cartItems = localStorage.getItem('productsInCart');
//     cartItems = JSON.parse(cartItems);
//     let productName;
//     console.log(cartItems);

//     for(let i=0; i < deleteButtons.length; i++) {
//         deleteButtons[i].addEventListener('click', () => {
//             productName = deleteButtons[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g,'').trim();
           
//             localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
//             localStorage.setItem('totalCost', cartCost - ( cartItems[productName].price * cartItems[productName].inCart));

//             delete cartItems[productName];
//             localStorage.setItem('productsInCart', JSON.stringify(cartItems));

//             displayCart();
//             onLoadCartNumbers();
//         })
//     }
// }

// onLoadCartNumbers();
// displayCart();




















//when addCart btn is clicked, add product to basket
// for(let i = 0; i < addCart.length; i++) {
//         addCart[i].addEventListener('click',() =>{
//         numOfCartItems (products[i]);  //whenever this code is called & addCart btn is clicked, let the array index start to count each product added  
//         totalCost(products[i]);
//      });
// }

// //this function lets localstorage fetch nums from the cart item if theres any existng one
// function onLoadCartNum () {
//     let itemNum = localStorage.getItem("numOfCartItems");
//     if (itemNum) {
//         document.querySelector('.naV_icons span').textContent = itemNum;
//     }
// }


// //this item adds some value to the localstorage ie this function helps to save all the product we are adding to the localstorage so whenever we refresh thesse product will be remembered
// function numOfCartItems (product, action) {
//     let itemNum = localStorage.getItem("numOfCartItems");
//     itemNum = parseInt(itemNum); //to avoid getting string results
//     console.log(itemNum);
    
//     let cartItems = localStorage.getItem('productsInCart');
//     cartItems = JSON.parse(cartItems);
    
//     if( action ) {
//         localStorage.setItem("numOfCartItems", itemNum - 1);
//         document.querySelector('.naV_icons span').textContent = itemNum - 1;
//         console.log("action running");
//     } else if( itemNum ) {
//         localStorage.setItem("numOfCartItems", itemNum + 1);
//         document.querySelector('.naV_icons span').textContent = itemNum + 1;
//     } else {
//         localStorage.setItem("numOfCartItems", 1);
//         document.querySelector('.naV_icons span').textContent = 1;
//     }
//     setItems(product);
// }


// //how do we know which item we are adding to the cart?
// function setItems(product) {
//  //to pass the json object into a javascript object
//          let cartItems = localStorage.getItem('productsInCart');
//          cartItems = JSON.parse(cartItems); //pass from json to js object

//          if(cartItems != null) {      //if a cartitem is clicked for the first time and then already exist,add new
//              let currentProduct = product.tag;
    
//         if( cartItems[currentProduct] == undefined ) {    //if cartitem is different from initial
//             cartItems = {
//                 ...cartItems, //js rest operator
//                 [currentProduct]: product
//             }
//         } 
//         cartItems[currentProduct].inCart += 1;

//     } else {
//         product.inCart = 1;
//         cartItems = { 
//             [product.tag]: product
//         };
//     }

        
//     localStorage.setItem("productsInCart", JSON.stringify (cartItems));
//  }


//  function totalCost(product, action){
//     let cartCost = localStorage.getItem('totalCost');
//     console.log(cartCost);
        
//         if( action) {
//         cartCost = parseInt(cartCost);

//         localStorage.setItem("totalCost", cartCost - product.price);
//     } else if(cartCost != null) {
        
//         cartCost = parseInt(cartCost);
//         localStorage.setItem("totalCost", cartCost + product.price);
    
//     } else {
//         localStorage.setItem("totalCost", product.price);
//     }
// } 


//  //whenever we load the checkout page, we want this function to run
//  function displayCart(){
//    let cartItems = localStorage.getItem("productsInCart");
//     cartItems = JSON.parse(cartItems);
    
//     let cartCost = localStorage.getItem("totalCost");
//     cartCost = parseInt(cartCost);

//     let productContainer = document.querySelector(".cart-info");

//       console.log(cartItems)
//     //the remaining paart of this code makes all the items saved in the cart  appear on the cart container page
//     if(cartItems && productContainer){
    
//      productContainer.innerHTML= "";
//     Object.values(cartItems).map( (product, index) => {
//     //backsicks enables to inject some variables inside strings
//          productContainer.innerHTML +=
//          `<div class="items">
//             <i class="fa fa-window-close" aria-hidden="true"></i>
//             <img src="./photos/${product.tag}.jfif" />
//                 <span class="sm-hide">${product.Name}</span>
//             </div>
//             <div class="price sm-hide">$${product.price},00</div>
//             <div class="quantity">
//                 <i class="fa fa-chevron-left"  aria-hidden="true"></i>
//                     <span>${product.inCart}</span>
//                 <i class="fa fa-chevron-right"  aria-hidden="true"></i>          
//             </div>
//         <div class="total">$${product.inCart * product.price}.00</div>`

// });
//    productContainer.innerHTML += 
//         ` <div class="basketTotalContainer">
//                 <h4 class="basketTotalTitle">Basket Total</h4>
//                 <h4 class="basketTotal">$${cartCost}.00</h4>
//             </div>  `           
//     deleteButtons();
//     manageQuantity();
       
//     }
// }

// function manageQuantity() {
//     let decreaseButtons = document.querySelectorAll('.fa-chevron-left');
//     let increaseButtons = document.querySelectorAll('.fa-chevron-right');
//     let currentQuantity = 0;
//     let currentProduct = '';
//     let itemsIncart = localStorage.getItem('productsInCart');
//     itemsIncart = JSON.parse(itemsIncart);

//     for(let i=0; i < increaseButtons.length; i++) {
//         decreaseButtons[i].addEventListener('click', () => {
//             console.log(itemsIncart);
//             currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
//             console.log(currentQuantity);
//             currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
//             console.log(currentProduct);

//             if( itemsIncart[currentProduct].inCart > 1 ) {
//                 itemsIncart[currentProduct].inCart -= 1;
//                 numOfCartItems(itemsIncart[currentProduct], "decrease");
//                 totalCost(itemsIncart[currentProduct], "decrease");
//                 localStorage.setItem('productsInCart', JSON.stringify(itemsIncart));
//                 displayCart();
//             }
//         });

//         increaseButtons[i].addEventListener('click', () => {
//             console.log(itemsIncart);
//             currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
//             console.log(currentQuantity);
//             currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
//             console.log(currentProduct);

//           itemsIncart[currentProduct].inCart += 1;
//             numOfCartItems(itemsIncart[currentProduct]);
//             totalCost(itemsIncart[currentProduct]);
//             localStorage.setItem('productsInCart', JSON.stringify(itemsIncart));
//             displayCart();
//         });
//     }
// }

// function deleteButtons() {
//     let deleteButtons = document.querySelectorAll('.removeitem');
//     let productNumbers = localStorage.getItem('numOfCartItems');
//     let cartCost = localStorage.getItem("totalCost");
//     let itemsIncart = localStorage.getItem('productsInCart');
//    itemsIncart = JSON.parse(itemsIncart);
//     let productName;
//     console.log(itemsIncart);

//     for(let i=0; i < deleteButtons.length; i++) {
//         deleteButtons[i].addEventListener('click', () => {
//             productName = deleteButtons[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g,'').trim();
           
//             localStorage.setItem('numOfCartItems', productNumbers - itemsIncart[productName].inCart);
//             console.log(productName)
//             localStorage.setItem('totalCost', cartCost - ( itemsIncart[productName].price * itemsIncart[productName].inCart));

//             delete itemsIncart[productName];
//             localStorage.setItem('productsInCart', JSON.stringify(itemsIncart));

//             displayCart();
//             onLoadCartNum();
//         })
//     }
// }


// // function RemoveCartItems() {
// //     let removeCartItems = document.querySelectorAll('.removeitem');
// //     for (let i = 0; i < removeCartItems.length; i++) {
// //             console.log(removeCartItems[i]);
// //              let button = removeCartItems[i]
// //         button.addEventListener('click',function (event) {
// //         let buttonClicked = event.target
// //         buttonClicked.parentElement.parentElement.remove()
// //          updateCartTotal()
// //       });
// //     }

// //     function updateCartTotal() {
// //         var cartItemsContainer = document.querySelector('.cart');
// //         console.log(cartItemsContainer)
// //         var cartrows = cartItemsContainer.querySelectorAll('.product');
// //         for (let i = 0; i < cartrows.length; i++) {
// //           console.log(cartrows[i]);

// //           var cartItem = cartrows[i]
// //           var priceElement = cartItem.querySelector('.price'); 
// //           var quantity = cartItem.querySelector('.quantity');
// //         }


// //     }

// // }    
// onLoadCartNum();
//  displayCart();


