let balance_form = document.querySelector("#balance-form");
let update_balance = document.querySelector("#update-balance");
let avaliable_balance = document.querySelector("#avaliable-balance");

let new_item_form = document.querySelector("#item-form");
let new_item_name = document.querySelector("#new-item-name");
let new_item_amount = document.querySelector("#new-item-amount");
let new_item_date = document.querySelector("#new-item-date");





function avaliable_balance_update(e) {
    e.preventDefault();
    newBalance = update_balance.value

    if (isNaN(newBalance) === false) {
        avaliable_balance.textContent = newBalance


    } else {alert("please only use numbers")}
}


///////////////////////////////////////////////////////

function add_new_item(e) {
    e.preventDefault();
    check_new_item_data();

}


///////////////////////////////////////////////////////

function check_new_item_data(e) {
    let item_name = new_item_name.value;
    let item_amount = new_item_amount.value;
    let item_date = new_item_date.value;
    verify_data(item_name, item_amount, item_date);
};

//check data for errors
function verify_data(item_name, item_amount, item_date) {
    let valid_name = verify_name(item_name);
    let valid_amount = verify_amount(item_amount);
    let valid_amount_date = verify_date(item_amount);
    if (valid_name && valid_amount && valid_amount_date === true) {
        console.log("valid data")
    } else {
        console.log("not valid data")
    }
};

function verify_name (item_name) {
    if (item_name.length > 0) {
        return true
    } else {
        alert("please fill in the item name field");
        return false
    }
};

function verify_amount (item_amount) {
    if (isNaN(item_amount) === false) {
        return true;
    } else {
        alert("please fill in the amount field with only numbers");
        return false;
    };
};

function verify_date (item_date) {
    if (item_date.length > 0) {
        return true;
    } else {
        alert("please fill in the date field");
        return false;
    }
}





balance_form.addEventListener("submit", avaliable_balance_update)
new_item_form.addEventListener("submit", add_new_item)