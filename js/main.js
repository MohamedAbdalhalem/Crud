var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var productImage = document.getElementById("productImage");
var products = document.getElementById("products");
var addButton = document.getElementById("addproduct");
var updateButton = document.getElementById("updateproduct");
var searchInput = document.getElementById("searchinput");
// list of producsts
var allproucts = [];
if (localStorage.getItem("products") != null) {
    allproucts = JSON.parse(localStorage.getItem("products"))
    displayAllProducts()
}
// add new product to the list
function addProduct() {
    var product = {
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        description: productDescription.value,
        image: productImage.files[0].name
    };
    allproucts.push(product);
    localStorage.setItem("products", JSON.stringify(allproucts));
    displayAllProducts()
    clearForm()
 }
// display all products
function displayAllProducts() {
    var str = ``;
    for (var i = 0; i < allproucts.length; i++){
        str+=`<div class="col-sm-6 col-md-4 col-lg-3">
            <div class="card bg-dark text-white product h-100">
              <img src="./images/${allproucts[i].image}" class="card-img-top object-fit-fill" alt="...">
              <div class="card-body">
                <h5 class="card-title">Name :${allproucts[i].name}</h5>
                <p class="card-text mb-2">Description :${allproucts[i].description}</p>
                <p class="card-text">price :${allproucts[i].price}</p>
                <button class="btn btn-outline-danger w-100 mb-2" onclick="deleteProduct(${i})">Delete <i class="fa-solid fa-trash"></i></button>
                <button class="btn btn-outline-warning w-100" onclick="returnValuesToInputs(${i})">Update <i class="fa-solid fa-screwdriver" "></i></button>
              </div>
            </div>
          </div>`
    }
    products.innerHTML = str;
}
// clear all input in form
function clearForm() {
    productName.value = null;
    productPrice.value = null
    productDescription.value = null; 
    productCategory.value = null; 
    productImage.value = null;
}
// delete product from the list
function deleteProduct(index) {
    allproucts.splice(index, 1)
    localStorage.setItem("products", JSON.stringify(allproucts));
    displayAllProducts()
}
// function to return data to inputs
function returnValuesToInputs(index) {
    addButton.classList.add("d-none");
    updateButton.classList.remove("d-none")
    updateButton.setAttribute("idx", index);
    productName.value = allproucts[index].name;
    productPrice.value = allproucts[index].price;
    productCategory.value = allproucts[index].category;
    productDescription.value = allproucts[index].description;
}
// function update the data of product
function updateProduct(idx) {
    allproucts[idx].name = productName.value;
    allproucts[idx].price = productPrice.value;
    allproucts[idx].category = productCategory.value;
    allproucts[idx].description = productDescription.value;
    if (productImage.value != "") {
        allproucts[idx].image = productImage.files[0].name
    }
    localStorage.setItem("products", JSON.stringify(allproucts));
    displayAllProducts();
    clearForm();
    addButton.classList.remove("d-none");
    updateButton.classList.add("d-none");
}
// function to filteration
function filterProducts(name) {
    var str = ``;
    for (var i = 0; i < allproucts.length; i++){
        if (allproucts[i].name.toLocaleLowerCase().includes(name.toLocaleLowerCase())) {
            str+=`<div class="col-sm-6 col-md-4 col-lg-3">
            <div class="card bg-dark text-white product h-100">
              <img src="./images/${allproucts[i].image}" class="card-img-top object-fit-fill" alt="...">
              <div class="card-body">
                <h5 class="card-title">Name :${allproucts[i].name}</h5>
                <p class="card-text mb-2">Description :${allproucts[i].description}</p>
                <p class="card-text">price :${allproucts[i].price}</p>
                <button class="btn btn-outline-danger w-100 mb-2" onclick="deleteProduct(${i})">Delete <i class="fa-solid fa-trash"></i></button>
                <button class="btn btn-outline-warning w-100" onclick="returnValuesToInputs(${i})">Update <i class="fa-solid fa-screwdriver" "></i></button>
              </div>
            </div>
          </div>`
        }
    }
    products.innerHTML = str;
}
"".toLocaleLowerCase