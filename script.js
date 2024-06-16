let balance_form = document.querySelector("#balance-form");
let update_balance = document.querySelector("#update-balance");
let avaliable_balance = document.querySelector("#avaliable-balance");

let new_item_form = document.querySelector("#item-form");
let new_item_name = document.querySelector("#new-item-name");
let new_item_amount = document.querySelector("#new-item-amount");
let new_item_date = document.querySelector("#new-item-date");

let item_list = document.querySelector("#item-list")




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
    let item_name = new_item_name.value;
    let item_amount = new_item_amount.value;
    let item_date = new_item_date.value;
    let valid_data = verify_data(item_name, item_amount, item_date);
    if (valid_data === true) {
        li = create_item_element(item_name, item_amount, item_date);
    } 

}

///////////////////////////////////////////////////////


//check data for errors
function verify_data(item_name, item_amount, item_date) {
    let valid_name = verify_name(item_name);
    let valid_amount = verify_amount(item_amount);
    let valid_amount_date = verify_date(item_date);
    if (valid_name && valid_amount && valid_amount_date === true) {
        return true;
    } else {
        return false;
    };
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


///////////////////////////////////////////////////////

function create_item_element(item_name, item_amount, item_date) {
    let li = document.createElement("li");
    li.classList.add("item");

    let div_container = document.createElement("div");
    div_container.classList.add("item-container");
    li.appendChild(div_container);

    let div_name = document.createElement("div"); // create div for name
    div_name.classList.add("tran-name"); // add classes
    div_name.classList.add("tran"); // add classes

    let p_name = document.createElement("p"); // create p element for name
    p_name.textContent = item_name; // set text content to item_name
    div_name.appendChild(p_name); // append p element to div_name
    div_container.appendChild(div_name); // append name to container

    let div_amount = document.createElement("div"); // create div for amount
    div_amount.classList.add("tran-price"); // add classes (you can customize the class names)
    div_amount.classList.add("tran"); // add classes

    let p_amount = document.createElement("p"); // create p element for amount
    p_amount.textContent = item_amount; // set text content to item_amount
    div_amount.appendChild(p_amount); // append p element to div_amount
    div_container.appendChild(div_amount); // append amount to container

    let div_date = document.createElement("div"); // create div for date
    div_date.classList.add("tran-date"); // add classes (you can customize the class names)
    div_date.classList.add("tran"); // add classes

    let p_date = document.createElement("p"); // create p element for date
    p_date.textContent = item_date; // set text content to item_date
    div_date.appendChild(p_date); // append p element to div_date
    div_container.appendChild(div_date); // append date to container

    let div_delete = document.createElement("div"); // create div for DELETE ICON
    div_delete.classList.add("tran"); // add classes
    //div_delete.classList.add("tran-delete"); // add classes 

    let p_delete = document.createElement("p"); // create a p element for delete icon
    p_delete.innerHTML = '&#10005'; // set its inner HTML to the symbol
    p_delete.classList.add("tran-delete"); // add a class to the p element
    div_delete.appendChild(p_delete); // append the p element to div_delete
    div_container.appendChild(div_delete); // append div_delete to div_container

    item_list.appendChild(li); // append li to item_list

    return li
}

////////////////////////////////////////////////////////

function delete_item(e) {
    if (e.target.classList.contains("tran-delete")) {
        console.log("delete");
        e.target.parentElement.parentElement.remove();
    }
}


balance_form.addEventListener("submit", avaliable_balance_update)
new_item_form.addEventListener("submit", add_new_item)
item_list.addEventListener("click", delete_item)