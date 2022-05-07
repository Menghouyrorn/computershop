
function handleLogin() {
	var form = document.getElementById("loginForm");
	var name = form.elements.namedItem("name").value;
	//var lname = form.elements.namedItem("lname").value;
	var email = form.elements.namedItem("email").value;
	var password = form.elements.namedItem("password").value;
	var get_users = localStorage.getItem("users");
	var link_element = document.getElementById("login_sigup");
	var obj_users = JSON.parse(get_users);
	var isExit = false;
	for (let i = 0; i < obj_users.length; i++) {
		if (obj_users[i].email == email) {
			isExit = true;
			if (obj_users[i].password != password) {
				notifyMessage("Wrong Password !", "red")
			} else {
				localStorage.setItem("currentUser", JSON.stringify(obj_users[i]));
				window.open('./homePage.html', "_self");
			}
		}
	}
	if (!isExit) {
		notifyMessage("Don't have user please Register !", "red");
	}
}
function handleRegiter() {
	var form = document.getElementById("regiterForm");
	var fname = form.elements.namedItem("fname").value;
	var lname = form.elements.namedItem("lname").value;
	var input_email = form.elements.namedItem("email").value;
	var pwd = form.elements.namedItem("password").value;
	var currPsw = form.elements.namedItem("rpassword").value;

	if (pwd != currPsw) {
		notifyMessage("Wrong Password !", "red");
	} else {
		var gets_user = localStorage.getItem("users");
		var obj_user = JSON.parse(gets_user);
		let user = {
			email: input_email,
			password: pwd,
			cart: []
		}
		obj_user.push(user);
		localStorage.setItem("users", JSON.stringify(obj_user));
		window.open('./../index.html', "_self");
	}


}
function setAdmin() {
	if (localStorage.getItem("users") == null) {
		let addmin = {
			email: "admin@gmail.com",
			password: "admin123",
			cart: []
		}
		let users = [];
		users.push(addmin);
		localStorage.setItem("users", JSON.stringify(users));
	}
}
function checkAdmin() {
	var currentUser = JSON.parse(localStorage.getItem("currentUser"));
	var email = currentUser.email;
	var password = currentUser.password;
	var link_element = document.getElementById("admin_link");
	if (email == "admin@gmail.com" && password == "admin123") {
		link_element.style.visibility = "visible";
	} else {
		link_element.style.visibility = "hidden";
	}

}
function handleForget() {
	var form = document.getElementById("forgetForm");
	var email = form.elements.namedItem("email").value;
	var oldPassword = form.elements.namedItem("opassword").value;
	var newPassword = form.elements.namedItem("npassword").value;
	var get_users = JSON.parse(localStorage.getItem("users"));
	//var obj_user= JSON.parse(get_users);

	var isUserExist = false;
	var isMathchPassword = false;

	for (let i = 0; i < get_users.length; i++) {
		if (email == get_users[i].email) {
			isUserExist = true;
			if (oldPassword == get_users[i].password) {
				get_users[i].password = newPassword;
				isMathchPassword = true;
				localStorage.setItem("users", JSON.stringify(get_users))
				notifyMessage("Reset Password Successfull", "green");
				break;
			}
		}

	}
	if (!isUserExist) {
		notifyMessage("User does't exist!", "red");
	} else if (!isMathchPassword) {
		notifyMessage("Old Password is not match", "red");
	}

}
function notifyMessage(message, color) {
	var message_box = document.createElement("div");
	message_box.style.width = "max-content";
	message_box.style.height = "max-content";
	message_box.style.position = "fixed";
	message_box.style.display = "sticky";
	message_box.style.top = "50px";
	message_box.style.right = "50px";
	message_box.style.borderRadius = "5px";
	message_box.style.boxSizing = "border-box";
	message_box.style.padding = "10px";
	message_box.style.backgroundColor = color;
	message_box.style.boxShadow = "3px 3px WhiteSmoke";
	var text_message = document.createElement("p");
	text_message.style.color = "white";
	text_message.innerHTML = message;
	text_message.style.fontFamily = "Arial, Helvetica, sans-serif";
	message_box.appendChild(text_message);
	document.body.appendChild(message_box);
	message_box.classList.add("message_box");
	setTimeout(() => {
		document.body.removeChild(message_box);
	}, 3000);
}
function handleLoyout() {
	var currentUser = JSON.parse(localStorage.getItem("currentUser"));
	if (currentUser) {
		localStorage.setItem("currentUser", []);
		notifyMessage("successfull", "green");
		window.open('index.html', '_self');
	} else {
		notifyMessage("error", "red");
	}
}
function displayHomeProduct() {
	var cart_number = document.getElementById("cart_number");
	var current_user = JSON.parse(localStorage.getItem("currentUser"))
	cart_number.innerHTML = current_user.cart.length;

	var obj_product = JSON.parse(localStorage.getItem("products"));
	var product_box = document.getElementById("product_box");
	for (let i = 0; i < obj_product.length; i++) {
		var p_card = document.createElement("div");
		p_card.classList.add("produc-cart");

		var p_image = document.createElement("div");
		p_image.classList.add("product-image");
		p_image.style.backgroundImage = "url('" + obj_product[i].imageurl + "')";
		p_card.appendChild(p_image);


		var p_info = document.createElement("div");
		p_info.classList.add("product-info");

		var p_name = document.createElement("div");
		p_name.innerHTML = obj_product[i].name;
		p_info.appendChild(p_name);

		var p_description = document.createElement("p");
		p_description.innerHTML = obj_product[i].description;
		p_info.appendChild(p_description);

		var p_price = document.createElement("h5");
		p_price.innerHTML = "$" + obj_product[i].price;
		p_info.appendChild(p_price);

		var p_button = document.createElement("button");
		p_button.innerHTML = "Add to Cart";
		p_button.onclick = function () {
			addToCart(obj_product[i]);
		}
		p_info.appendChild(p_button);
		p_card.appendChild(p_info);
		product_box.appendChild(p_card);

	}
}
function addproduct() {
	var product_form = document.getElementById("add_product");
	var p_name = product_form.elements.namedItem("product_name").value;
	var p_description = product_form.elements.namedItem("description").value;
	var p_price = product_form.elements.namedItem("price").value;
	var p_image_url = product_form.elements.namedItem("img_url").value;

	if (localStorage.getItem("products") == null) {
		localStorage.setItem("products", "[]");
	}

	var obj_product = JSON.parse(localStorage.getItem("products"));

	let product = {
		name: p_name,
		description: p_description,
		price: p_price,
		imageurl: p_image_url
	}
	obj_product.push(product);
	localStorage.setItem("products", JSON.stringify(obj_product));
	notifyMessage("Products is added !", "green");
	displayProducts();
}
function displayProducts() {
	var p_table = document.getElementById("product_table");
	p_table.innerHTML = "";

	var header = document.createElement("tr");
	header.innerHTML = "<th>Name</th><th>Image</th><th>Description</th><th>Price</th><th>Action</th>";

	p_table.appendChild(header);

	var obj_product = JSON.parse(localStorage.getItem("products"));

	for (let i = 0; i < obj_product.length; i++) {
		let p_row = document.createElement("tr");

		let p_name = document.createElement("td");
		p_name.innerHTML = obj_product[i].name;
		p_row.appendChild(p_name);

		let p_image = document.createElement("td");
		let img = document.createElement("img");
		img.src = obj_product[i].imageurl;
		p_image.appendChild(img);
		p_row.appendChild(p_image);

		let p_description = document.createElement("td");
		p_description.innerHTML = obj_product[i].description;
		p_row.appendChild(p_description);

		let p_price = document.createElement("td");
		p_price.innerHTML = obj_product[i].price + "$";
		p_row.appendChild(p_price);


		let p_action = document.createElement("td");
		let delete_button = document.createElement("button");
		delete_button.innerHTML = "Delete";
		delete_button.onclick = function () {
			deleteproduct(obj_product[i].name);
		}
		p_action.appendChild(delete_button);
		p_row.appendChild(p_action);
		p_table.appendChild(p_row);
	}
}
function deleteproduct(product_name) {
	var obj_product = JSON.parse(localStorage.getItem("products"));
	for (let i = 0; i < obj_product.length; i++) {
		if (obj_product[i].name == product_name) {
			obj_product.splice(i, 1);
			localStorage.setItem("products", JSON.stringify(obj_product));
			notifyMessage("Delete Sucessfull !", "green");
			displayProducts();
			break;
		}
	}
}
function addToCart(obj_product) {
	var cart_number = document.getElementById("cart_number");

	var current_user = JSON.parse(localStorage.getItem("currentUser"));
	current_user.cart.push(obj_product);
	cart_number.innerHTML = current_user.cart.length;
	localStorage.setItem("currentUser", JSON.stringify(current_user));

	var all_user = JSON.parse(localStorage.getItem("users"));
	for (let i = 0; i < all_user.length; i++) {
		if (all_user[i].email == current_user.email) {
			all_user[i].cart = current_user.cart;
			localStorage.setItem("users", JSON.stringify(all_user));
			notifyMessage("Product is added to Cart !", "green");
			break;
		}

	}
}
function displayCartItem() {
	var p_table = document.getElementById("product_table");
	p_table.innerHTML = " ";
	var current_user = JSON.parse(localStorage.getItem("currentUser"));
	var header = document.createElement("tr");
	header.innerHTML = "<th>Name</th><th>Image</th><th>Description</th><th>Price</th><th>Action</th>";

	p_table.appendChild(header);
	var total_price = 0;
	for (let i = 0; i < current_user.cart.length; i++) {
		let p_row = document.createElement("tr");

		let p_name = document.createElement("td");
		p_name.innerHTML = current_user.cart[i].name;
		p_row.appendChild(p_name);

		let p_image = document.createElement("td");
		let img = document.createElement("img");
		img.src = current_user.cart[i].imageurl;
		p_image.appendChild(img);
		p_row.appendChild(p_image);

		let p_description = document.createElement("td");
		p_description.innerHTML = current_user.cart[i].description;
		p_row.appendChild(p_description);

		let p_price = document.createElement("td");
		p_price.innerHTML = current_user.cart[i].price + "$";
		p_row.appendChild(p_price);

		let p_action = document.createElement("td");
		let delete_button = document.createElement("button");
		delete_button.innerHTML = "Delete";
		delete_button.onclick = function () {
			deleteCartItem(current_user.cart[i].name);
		}
		p_action.appendChild(delete_button);
		p_row.appendChild(p_action);
		p_table.appendChild(p_row);

		total_price = total_price + Number(current_user.cart[i].price);

	}

	var total_element = document.getElementById("total_price");
	total_element.innerHTML = "$" + total_price;


}

function toBuy() {
	window.open('./form_Buy.html', '_self')
}
function handleBuy() {
	notifyMessage("Thank for Order !", "green");
	setTimeout(function () {
		window.open('./../homePage.html', '_self')
	}, 1000)
}
function deleteCartItem(item_name) {
	var current_user = JSON.parse(localStorage.getItem("currentUser"));
	for (let i = 0; i < current_user.cart.length; i++) {
		if (current_user.cart[i].name == item_name) {
			current_user.cart.splice(i, 1);
			break;
		}
	}
	localStorage.setItem("currentUser", JSON.stringify(current_user));

	var all_user = JSON.parse(localStorage.getItem("users"));
	for (let i = 0; i < all_user.length; i++) {
		if (all_user[i].email == current_user.email) {
			all_user[i].cart = current_user.cart;
			notifyMessage("Product is removed", "green");
			displayCartItem();
			localStorage.setItem("Users", JSON.stringify(all_user));
			break;
		}
	}
}
// function mySearch(){
// 	var input,i ,filter,div,txtValue;
// 	input = document.getElementById("myInput");
// 	filter=input.value.toUpperCase();
// 	div=document.getElementsByTagName("div");
// 	for(i=0;i<div.length;i++){
// 		a=div[i].getElementsByTagName("div")[0];
// 		txtValue=a.textContent || a.innerText;
// 		if(txtValue.toUpperCase().indexOf(filter)> -1){
// 			div[i].style.display="";
// 		}else{
// 			div[i].style.display="none";
// 		}
// 	}
// }
