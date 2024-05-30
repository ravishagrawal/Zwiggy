import { menuArray } from '/data.js'


const orderSummaryEl = document.getElementById('order-summary') 
const modalEl = document.getElementById('modal-el')

let totalItemsArray = [] // used below to store all the iterms in order list


// Capturing click across pages

document.addEventListener ('click', function (e){
    
    if (e.target.dataset.add) {
       generateOrderList (e.target.dataset.add) 
    }
    if (e.target.dataset.remove) {
       removeOrderItem (e.target.dataset.remove) 
    }
    else if(e.target.id === 'order-btn'){
        modalEl.classList.toggle ('hidden')
    }
    
    else if(e.target.id === 'pay-btn'){
        payAction()
    }
    
})

// Function that generates menu list on Load

function generateMenuHtml () {
    
    const menuItems = menuArray.map(function generateMenuItems (meArr) {
    return `
            <div class="menu-items">
                <p class="menu-icon">${meArr.emoji}</p>
                <div class="item-description">
                    <h1>${meArr.name}</h1>
                    <p>${meArr.ingredients.join(', ')}</p>
                    <h3>$${meArr.price}</h3>
                    <i class="fa-solid fa-plus add-item" data-add ="${meArr.id}"></i>
                </div>
                <div>
                   
                </div>
            </div>
           `
    })
    return menuItems
    
}

// Function that holds orderlist before it is transferred to array or published 

function generateOrderList(orderId) {

    const orderList= menuArray.filter (function(menu){
        return menu.id === Number(orderId)
        
    })[0]
    
    populateTotalItemsArray (orderList.name, orderList.price)
}

// Creating an array for all the items added to the order list 

function populateTotalItemsArray (listItemName,listItemPrice){
    
    totalItemsArray.push ({
        name:listItemName,
        price: listItemPrice, 
        id: Math.floor(Math.random() * 1000)
        })
        
        generateOrderListHtml()
}

// Function to generate order list in HTML below Your Order 

function generateOrderListHtml () {
    
    const orderEl = document.getElementById ('order-el')
    
    // If Logic that ensures error is not thrown after thanks message
    
    if (orderEl) {
        
        const orderListHtml = totalItemsArray.map (function(itemsArray){
            return `<div class="order-item">
                        <p class="item-name">${itemsArray.name}</p>
                        <button class="item-remove" data-remove= "${itemsArray.id}"> remove</button>
                        <p class="item-price"> $${itemsArray.price} </p> 
                    </div>
                    `
        }).join('')
        
        orderEl.innerHTML = orderListHtml
        getTotalPrice ()
        
    }
    
    
}

// Function to calculate total price as items are added 

function getTotalPrice () {
    
    if (totalItemsArray.length > 0) {
        const totalPrice = totalItemsArray.reduce (function(total, currentItem){
        return total + currentItem.price
        },0)
        
        document.getElementById ('price-el').textContent = `$${totalPrice}`
    }
    
}

// Function when the remove button is clicked 

function removeOrderItem (orderId) {
        const index = totalItemsArray.findIndex (function(itemArray){
            return itemArray.id === Number (orderId)
        })
       
        if (index > -1) { // only splice array when item is found
            totalItemsArray.splice(index, 1) // 2nd parameter means remove one item only
        }
        
        generateOrderListHtml ()
}


// Function when the payment button is clicked 

function payAction () {
    
    document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    // Check if the form is valid
    if (event.target.checkValidity()) {
        // If the form is valid, proceed with the order summary and modal toggle
        
        orderSummaryEl.innerHTML = `
            <div class="thanks-message">
                <p> Thanks, James! Your order is on its way! </p>
            </div>
        `
        modalEl.classList.toggle('hidden')
    } else {
        // If the form is not valid, show a validation message
        alert('Please fill out all required fields.')
    }
});
    
}




function render () {
    document.getElementById ('menu-el').innerHTML = generateMenuHtml ()
}


render ()




