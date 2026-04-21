let selectedItemId = null;
// ---------------------- PRODUCT DATA ----------------------

let data = {
    1:{loc:"ice_cream/vanilla.jpg", name:"Vanilla Ice Cream Cone", price:119},
    2:{loc:"ice_cream/chocolate.jpg", name:"Chocolate Ice Cream Cone", price:129},
    3:{loc:"ice_cream/strawberry.jpg", name:"Strawberry Ice Cream Cone", price:129},
    4:{loc:"ice_cream/mango.jpg", name:"Mango Ice Cream Cone", price:139},
    5:{loc:"ice_cream/mint.jpg", name:"Mint Ice Cream Cone", price:139},
    6:{loc:"ice_cream/blueberry.jpg", name:"Blueberry Ice Cream Cone", price:149},
    7:{loc:"ice_cream/butterscotch.jpg", name:"Butterscotch Ice Cream Cone", price:159},
    8:{loc:"ice_cream/vanilla_cup.jpg", name:"Vanilla Ice Cream Cup", price:199},
    9:{loc:"ice_cream/chocolate_cup.jpg", name:"Chocolate Ice Cream Cup", price:209},
    10:{loc:"ice_cream/strawberry_cup.jpg", name:"Strawberry Ice Cream Cup", price:209},
    11:{loc:"ice_cream/mango_cup.jpg", name:"Mango Ice Cream Cup", price:219},
    12:{loc:"ice_cream/mint_cup.jpg", name:"Mint Ice Cream Cup", price:219},
    13:{loc:"ice_cream/blueberry_cup.jpg", name:"Blueberry Ice Cream Cup", price:229},
    14:{loc:"ice_cream/butterscotch_cup.jpg", name:"Butterscotch Ice Cream Cup", price:239},
    15:{loc:"ice_cream/vanilla_stick.jpg", name:"Vanilla Ice Cream Bar", price:129},
    16:{loc:"ice_cream/chocolate_stick.jpg", name:"Chocolate Ice Cream Bar", price:139},
    17:{loc:"ice_cream/strawberry_stick.jpg", name:"Strawberry Ice Cream Bar", price:139},
    18:{loc:"ice_cream/mango_stick.jpg", name:"Mango Ice Cream Bar", price:149},
    19:{loc:"ice_cream/mint_stick.jpg", name:"Mint Ice Cream Bar", price:149},
    20:{loc:"ice_cream/blueberry_stick.jpg", name:"Blueberry Ice Cream Bar", price:159},
    21:{loc:"ice_cream/butterscotch_stick.jpg", name:"Butterscotch Ice Cream Bar", price:169}
};

// ---------------------- CART STORAGE ----------------------

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ---------------------- LOGIN PAGE CODE ----------------------

let userNameInput = document.querySelector("#userName");
if(userNameInput){
    userNameInput.addEventListener("input", function(){
        localStorage.setItem("username", userNameInput.value);
    });
}
let password1 = "";
let password2 = "";

let createPasswordInput = document.querySelector("#createPassword");
if(createPasswordInput){
    createPasswordInput.addEventListener("input", function(){
        password1 = createPasswordInput.value;
    });
}
let confirmPasswordInput = document.querySelector("#confirmPassword");
if(confirmPasswordInput){
    confirmPasswordInput.addEventListener("input", function(){
        password2 = confirmPasswordInput.value;
         localStorage.setItem("password2", confirmPasswordInput.value);
      
        if(password1 !== password2){
            confirmPasswordInput.title = "Passwords aren't matching";
        }
    });
}
let loginButton = document.querySelector("#loginButton");
if(loginButton){
    loginButton.addEventListener("click", function(event){
        if(password1 !== password2){
            alert("Passwords don't match");
            event.preventDefault();
        }
    });
}

// ---------------------- SHOW USERNAME ON PAGE 2 ----------------------

let userPara = document.querySelector("#userNameInPara");
if(userPara){
    let storedName = localStorage.getItem("username");
    if(storedName){
        userPara.innerHTML =storedName;
    }
}

// ---------------------- SHOW IMAGE ON SCREEN AND ADD TO CART FUNCTION ----------------------

function addToCart(id){

    selectedItemId = id;  // store selection

    let screen = document.querySelector("#screen");

    if(screen){
        screen.style.backgroundImage = `url(${data[id].loc})`;
        screen.style.backgroundSize="cover";
    }
}

//---------------------------Final Add To Cart---------------------------

function finalAddToCart(){

    if(selectedItemId === null){
        alert("Please select a flavour first!");
        return;
    }

    let baseItem = data[selectedItemId];

    // -------- ADDONS --------
    let addons = document.querySelectorAll(".addon:checked");
    let extraCost = 0;
    let addonNames = [];

    addons.forEach(item => {
        extraCost += Number(item.value);
        addonNames.push(item.parentElement.innerText.trim());
    });

    // -------- SCOOPS --------
    let scoops = Number(document.getElementById("scoops").value) || 1;

    let totalPrice = (baseItem.price * scoops) + extraCost;

    let finalItem = {
        name: baseItem.name + ` (${scoops} scoop)`,
        price: totalPrice,
        loc: baseItem.loc,
        addons: addonNames
    };

    cart.push(finalItem);
    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to cart!");

    // -------- RESET UI --------
    selectedItemId = null;
    document.querySelectorAll(".addon").forEach(a => a.checked = false);
    document.getElementById("scoops").value = 1;
}

// ---------------------- GO TO BILL PAGE ----------------------

function goToBill(){
    window.location.href = "Ice_cream_HTML6.html";
}

// ---------------------- LOAD BILL PAGE ----------------------

function loadBill(){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let table = document.getElementById("billTable");
    let total = 0;

    for(let i = 0; i < cart.length; i++){

        let row = table.insertRow();

        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);

        cell1.innerHTML = `<img src="${cart[i].loc}" width="80">`;
        cell2.innerHTML = cart[i].name + "<br>" + (cart[i].addons?.join(", ") || "");
        cell3.innerHTML = "Rupees " + cart[i].price;

        total += cart[i].price;
    }

    document.getElementById("totalAmount").innerHTML = "Total: Rupees " + total;
}


//------------------------Generate Bill---------------------
function generateBill(){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let table = document.getElementById("billTable");
    let total = 0;

    for(let i=0;i<cart.length;i++){

        let row = table.insertRow();

        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);

        cell1.innerHTML = `<img src="${cart[i].loc}" width="80">`;
        cell2.innerHTML = cart[i].name + "<br>" + (cart[i].addons?.join(", ") || "");
        cell3.innerHTML = "Rupees " + cart[i].price;

        total += cart[i].price;
    }

    document.getElementById("totalAmount").innerHTML = "Grand Total: Rupees " + total;
    localStorage.setItem("total", total);
    let today = new Date();
    document.getElementById("date").innerHTML = "Date: " + today.toLocaleString();
}

// ---------------------- CLEAR CART ----------------------

function clearCart(){
    localStorage.removeItem("cart");
    let total =localStorage.getItem("total");
    alert("You have paid the price of "+total+" Rupess");
    window.location.reload();
}


// ---------------------- BUY FUNCTION ----------------------

function buy(){
    window.location.href = "Ice_cream_HTML7.html";
}
//--------------------------------------These all are new codes -------------------------------------------------------
function loginPage(){
    window.location.href = "Ice_cream_HTML1.html";
}

//------------------------POPUP BUTTON CODE-----------------------------------------------------------------------------------------------------------

function checkLogin(){
    let storedName = localStorage.getItem("username");
    let password2 = localStorage.getItem("password2");


    let user = document.getElementById("loginUser").value;
    let pass = document.getElementById("loginPass").value;
    let error = document.getElementById("errorMsg");

    // Simple validation
    if(user === "" || pass === ""){
        error.innerText = "Please fill all fields";
        return;
    }

    if(user === storedName && pass === password2){

        // Hide login modal
        document.getElementById("loginModal").style.display = "none";

    } else {
        error.innerText = "Invalid username or password";
    }
}