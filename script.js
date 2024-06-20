let balance_form = document.querySelector("#balance-form");
let update_balance = document.querySelector("#update-balance");
let avaliable_balance = document.querySelector("#avaliable-balance");

let new_item_form = document.querySelector("#item-form");
let new_item_name = document.querySelector("#new-item-name");
let new_item_amount = document.querySelector("#new-item-amount");
let new_item_date = document.querySelector("#new-item-date");

let item_list = document.querySelector("#item-list")

let word_filter = document.querySelector("#word-filter");
let date_filter = document.querySelectorAll(".date-filter");
let date_picker_min = document.querySelector(".date-picker-min");
let date_picker_max = document.querySelector(".date-picker-max");


let max_date 
let min_date 

///TO DO:
    // get the item date text in the correct format (just for ease of access)
    // get the input for date and make sure its full and valid
    // once complete date is provided for both min and max send to date filter func
    // show only items with date provided


    // make local storage for items in list and aval balance

///////////////////////////////////////////////////////

function avaliable_balance_update(e) {
    e.preventDefault();
    newBalance = update_balance.value

    if (isNaN(newBalance) === false) {
        avaliable_balance.textContent = newBalance
        update_balance_on_load()


    } else {alert("please only use numbers")}
}

function balance_transaction_update(item_amount) {
    let pre_balance = avaliable_balance.textContent
    let new_balance = pre_balance - item_amount;
    avaliable_balance.textContent = new_balance;
}


///////////////////////////////////////////////////////

function update_balance_on_load() {
    let item = document.querySelectorAll(".item")
    for (let i = 0; i < item.length; i++) {
        let tran_price_div = item[i].querySelector(".tran-price")
        let value = tran_price_div.querySelector("p").textContent
        avaliable_balance.textContent = parseInt(avaliable_balance.textContent) - parseInt(value);

    }
}


function add_new_item(e) {
    e.preventDefault();
    let item_name = new_item_name.value;
    let item_amount = new_item_amount.value;
    let item_date = new_item_date.value;
    let valid_data = verify_data(item_name, item_amount, item_date);
    if (valid_data === true) {
        li = create_item_element(item_name, item_amount, item_date);
        balance_transaction_update(item_amount);
        hide_filter_settings();
    } 

}

function hide_filter_settings() {
    let item = document.querySelectorAll("li")
    if (item.length === 0) {
        date_filter.forEach(input => input.style.display = 'none');
        word_filter.style.display = 'none';
    } else {
        date_filter.forEach(input => input.style.display = 'block');
        word_filter.style.display = 'block';
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
    if (isNaN(item_amount) === false && item_amount.length > 0){
        return true;
    } else {
        alert("please fill in the amount field (with only numbers)");
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

function delete_item(e) {
    //console.log(e.target.parentElement.parentElement); //////////// trying to get correct nested element 
    if (e.target.classList.contains("tran-delete")) {
        // Find the parent div with the class tran-amount


        let tranAmountDiv = e.target.parentElement.parentElement.querySelector(".tran-price"); //// trying to get div that contains amount

        // Get the value from the <p> element within that div
        if (tranAmountDiv) {
            let value = tranAmountDiv.querySelector("p").textContent;
            //avaliable_balance = parseInt(avaliable_balance) + parseInt(value);
            avaliable_balance.textContent = parseInt(avaliable_balance.textContent) + parseInt(value);
        }

        // Remove the item
        e.target.parentElement.parentElement.parentElement.remove();
        
        // Call hide_filter_settings
        hide_filter_settings();
    }
}


////////////////////////////////////////////////////////


function filter_items_name(e) {
    let filter_text = e.target.value.toLowerCase();
    let item = document.querySelectorAll(".item")
    for (let i = 0; i < item.length; i++) {
        let tran_name_div = item[i].querySelector(".tran-name")
        let item_name = tran_name_div.querySelector("p").textContent
        if (item_name.indexOf(filter_text) != -1) {
             tran_name_div.parentElement.parentElement.style.display = 'flex';
           } else {
            tran_name_div.parentElement.parentElement.style.display = 'none';
        }

    }
}


function filter_items_date_min(e) {  
    if (e.target.value === undefined || e.target.value === "") {
        //pass
    } else {
        min_date = new Date(e.target.value);
        validate_dates("min", min_date);
    }
}

function filter_items_date_max(e) {    
    if (e.target.value === undefined || e.target.value === "") {
        //pass
    } else {
        max_date = new Date(e.target.value);
        validate_dates("max", max_date);
    }
}

function validate_dates(type, date) {
    if (type === "max") {
        max_date = date;
    } else if (type === "min") {
        min_date = date;
    }

    // Check if both dates are defined and valid
    if (min_date && max_date) {
        filter_items_by_date(min_date, max_date);
    } else {
        //pass
    }
}

function get_items_by_date() {
    let items = document.querySelectorAll(".item");
    let date_divs = [];
    for (let i = 0; i < items.length; i++) {
        let tran_date_div = items[i].querySelector(".tran-date");
        date_divs.push(tran_date_div);
    }
    return date_divs;
}

function filter_items_by_date(min_date, max_date) {
    if (min_date < max_date) {
        let date_divs = get_items_by_date();
        for (let i = 0; i < date_divs.length; i++) {
            let item_date_string = date_divs[i].querySelector("p").innerHTML;
            let item_date = new Date(item_date_string);
            if (item_date > min_date && item_date < max_date) {
                date_divs[i].parentElement.parentElement.style.display = 'flex';

            } else {
                date_divs[i].parentElement.parentElement.style.display = 'none';
            }

        }
    } else {
        alert("must go from min to max");
    }
}




balance_form.addEventListener("submit", avaliable_balance_update)
new_item_form.addEventListener("submit", add_new_item)
item_list.addEventListener("click", delete_item)
word_filter.addEventListener("input", filter_items_name)
date_picker_min.addEventListener("input", filter_items_date_min);
date_picker_max.addEventListener("input", filter_items_date_max);




update_balance_on_load()
hide_filter_settings()