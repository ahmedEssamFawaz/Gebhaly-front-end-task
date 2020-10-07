

// get remove button 
var removeCartItemButtons = document.getElementsByClassName('btn-danger')

for (var i = 0; i < removeCartItemButtons.length; i++){
    // To select which button i am pressing
    var button = removeCartItemButtons[i]
    //when i click on button remove the item
    button.addEventListener('click', removeCartItem)
}

//get quantity value input
var quantityInputs = document.getElementsByClassName('cart-quantity-input');
for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i]
    input.addEventListener('change', quantityChanged)

}

//hook add to cart in all items
var addToCartButtons = document.getElementsByClassName('addToCart');
for (var i= 0; i < addToCartButtons.length; i++){
    var button = addToCartButtons[i];
button.addEventListener('click', addToCartClicked);
}

//purchase button 
document.getElementsByClassName('btn-checkout')[0].addEventListener('click', purchaseClicked);



//purchase clicked function
function purchaseClicked(){
    alert('Thank you for you purchase');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    //to remove all cartitems childs
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    //to reset the price to 0 
    updateCartTotal();
}
//remove cart item
function removeCartItem(event){
     //adding event to get the row that the button inside
     var buttonClicked = event.target;
     // to get to the row Div
     buttonClicked.parentElement.parentElement.remove();
     // to update cart total after removing an item
     updateCartTotal();
}


// TO Update total when i change item quantity

function quantityChanged(event) {
    //event target is used to know the thing that i press or modify 
    var input = event.target;
    //to chech if the value is number and the  value is over 0  
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateCartTotal()
}

function addToCartClicked(event){
    var button = event.target;
    //to get to the main div which contains price and name
    var shopItem = button.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
    //get item name
    var title = shopItem.getElementsByClassName('productName')[0].innerHTML;
    //get item price 
    var price = shopItem.getElementsByClassName('product-price')[0].innerText;
    //get item category
    var category = shopItem.getElementsByClassName('category')[0].innerText
    //get image
    var imageSrc = shopItem.getElementsByClassName('item-image')[0].src;
    addItemToCart(title, category, price , imageSrc);
    updateCartTotal();
   
  
    
}




//to update ui with new item
function addItemToCart(title, category, price, imageSrc) {
    //creating a div
    var cartRow = document.createElement('div');
    //to add class cart-row to the newly created div
    cartRow.classList.add('cart-row');
    // to get the parent div
    var cartItems = document.getElementsByClassName('cart-items')[0];
    // to get all the products names
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    // this loop is to stop adding same product more than one time
    for(var i = 0; i < cartItemNames.length; i++){
        if (cartItemNames[i].innerText == title){
            alert('This item is already added to the cart')
            //to stop executing
            return;
        }
    }
    var cartRowContents = ` 
    <div class="cart-item cart-column">
    <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
    <span class="cart-item-title">${title}</span>
</div>
<span class="cart-category cart-column">${category}</span>
<span class="cart-price cart-column">${price}</span>
<div class="cart-quantity cart-column">
    <input class="cart-quantity-input" type="number" value="1">
    <button class="btn btn-danger" type="button">REMOVE</button>
</div>`
cartRow.innerHTML = cartRowContents;
//appending the newly created div to the parent div
    cartItems.append(cartRow);
    // to update the newly added product with the remove button
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
      // to update the newly added product with the quantity change method
      
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('click',quantityChanged);
    
}





// to update the total price

function updateCartTotal() {
    // to get the all items
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
     // to get all the diff card row elements
     var cartRows = cartItemContainer.getElementsByClassName('cart-row');
     //to loop over cart rows
     var total = 0;
     for ( var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
         //to get all prices
         var priceElement = cartRow.getElementsByClassName('cart-price')[0];
         // to get all quaninty 
         var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
         //to get price and remove dollar signs and turn it into number not string
         var price = parseFloat(priceElement.innerText.replace('$', ''));
         var quantity = quantityElement.value
         //to add to total price the available items
         total = total + (price * quantity);
         
     }
     // to round the total value and avoiding multiple decimal numbers
     total= Math.round(total * 100) / 100 ;
     document.getElementsByClassName('cart-total-price')[0].innerText= '$' + total;
}



