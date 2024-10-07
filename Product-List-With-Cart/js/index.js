// Mohamed Nader Rashad
"use strict";

const dessertsContainer = document.querySelector(".desserts");
const cartContainer = document.querySelector(".cart__products");
const orderContainer = document.querySelector(".order-confirmed__desserts");

let dessertsData = [];
let desserts = [];

function getData(url) {
	return new Promise((resolve, reject) => {
		fetch(url)
			.then((res) => res.json())
			.then((data) => resolve(data));
	});
}

getData("./data/data.json").then((data) => {
	dessertsData = data;
	renderHTML(
		dessertsContainer,
		createDessertCardTemplate(dessertsData),
		"afterbegin"
	);
});

function renderHTML(parentElement, html, appendType) {
	parentElement.innerHTML = "";
	parentElement.insertAdjacentHTML(appendType, html);
	return true;
}

function createTemplate(data, fn) {
	return data.map(fn).join(" ");
}

function createDessertCardTemplate(data) {
	return createTemplate(
		data,
		(obj) =>
			`
				<div class="desserts__dessert" id="${obj.name
				.toLowerCase()
				.split(" ")
				.join("-")}">
					<div class="desserts__img-box">
						<img src=${obj.image.desktop} class="desserts__img" alt="Image Of An Product">
						<a class="btn btn--add-to-cart" href="#"><span><img src="./assets/images/icon-add-to-cart.svg" alt="Shopping Cart"></span> Add to Cart</a>
						<a class="btn btn--increment-qnt content-disable" href="#"><span> <img src="./assets/images/icon-decrement-quantity.svg" alt="Decrement Quantity" class="btn-decrement-qnt"> </span> <span class="desserts__quantity">
						1</span> <span><img src="./assets/images/icon-increment-quantity.svg" alt="Increment quantity" class="btn-increment-qnt"></span> </a>
					</div>
					<span class="desserts__category">${obj.category}</span>
					<p class="desserts__name">${obj.name}</p>
					<span class="desserts__price">$${obj.price.toFixed(2)}</span> 
				</div>	
		`
	);
}

function createAddedDessertsTemplate(data) {
	return createTemplate(
		data,
		(obj) => `
						<div class="product">
							<div class="product__content">
								<p class="product__name">${obj.name}</p>
								<span class="product__qnt">${obj.quantity}x</span>
								<span class="product__price">@ ${obj.price.toFixed(2)}</span>
								<span class="product__total">$${(obj.price * obj.quantity).toFixed(2)}</span>
							</div>
							<span class="btn-remove">
								<svg class="btn-remove-svg" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path class="btn-remove-svg" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>
								
							</span>
						</div>
								`
	);
}

function createOrderedDessertTemplate(data) {
	return createTemplate(
		data,
		(obj) => `
					<div class="order-confirmed__product">
						<img src="${obj.image.mobile
			}" alt="Image of the dessert" class="order-confirmed__product-img" />

						<div class="order-confirmed__value">
							<p class="order-confirmed__name ">
								${obj.name}
							</p>
							<span class="order-confirmed__qnt product__qnt">${obj.quantity}x</span>
							<span class="order-confirmed__price">@ $${obj.price.toFixed(2)}</span>
						</div>

						<span class="order-confirmed__product-total">$${(
				obj.price * obj.quantity
			).toFixed(2)}</span>
					</div>
	`
	);
}

function calcPrice(data) {
	const totalPrice = (data.price * data.quantity).toFixed(2);
	return Number(totalPrice);
}

function calcTotalQuantity(addedDesserts) {
	const totalQuantity = addedDesserts.reduce(
		(acc, obj) => (acc += obj.quantity),
		0
	);
	return totalQuantity;
}

function calcTotalPrice(data) {
	const totalPrice = data.reduce((acc, obj) => (acc += calcPrice(obj)), 0);
	return Number(totalPrice.toFixed(2));
}

function renderTotalPrice(totalPrice) {
	document.querySelector(
		".cart__total-price"
	).textContent = `$${totalPrice.toFixed(2)}`;
	document.querySelector(".cart__order").classList.remove("content-disable");

	return true;
}

function renderUpdatedCartHTML(parentElement, template, data) {
	const totalPrice = calcTotalPrice(data);
	renderHTML(parentElement, template, "afterbegin");
	renderTotalPrice(totalPrice);
	return true;
}

function addDessertToCart(data, targetDessert) {
	const dessert = data.find((obj) => obj.name == targetDessert.innerHTML);
	dessert.quantity = 1;
	dessert.imgBox =
		targetDessert.parentElement.querySelector(".desserts__img-box");
	dessert.id = dessert.name.toLowerCase().split(" ").join("-");

	desserts.push(dessert);

	dessert.imgBox.querySelector(".desserts__quantity").textContent =
		dessert.quantity;

	renderUpdatedCartHTML(
		cartContainer,
		createAddedDessertsTemplate(desserts),
		desserts
	);

	document.querySelector(".cart__quantity").textContent =
		calcTotalQuantity(desserts);

	return dessert;
}

function toggleClasses(element, classList, add) {
	return classList.forEach((cls) => element.classList.toggle(cls, add));
}

function updateButtonStates(targetDessert, isAdded) {
	const parent = document.getElementById(
		targetDessert.toLowerCase().split(" ").join("-")
	);
	const addToCartBtn = parent.querySelector(".btn--add-to-cart");
	const incrementBtn = parent.querySelector(".btn--increment-qnt");

	toggleClasses(addToCartBtn, ["content-disable"], isAdded);
	toggleClasses(incrementBtn, ["content-disable"], !isAdded);
	toggleClasses(
		parent.querySelector(".desserts__img"),
		["selected-dessert"],
		isAdded
	);
}

function updateQuantityCounter(dessert, type) {
	if (type === "increment") dessert.quantity++;
	else dessert.quantity--;

	document.querySelector(".cart__quantity").textContent =
		calcTotalQuantity(desserts);

	dessert.imgBox.querySelector(".desserts__quantity").textContent =
		dessert.quantity;

	renderUpdatedCartHTML(
		cartContainer,
		createAddedDessertsTemplate(desserts),
		desserts
	);

	if (dessert.quantity < 1) {
		desserts = desserts.filter(({ name }) => name !== dessert.name);

		updateButtonStates(dessert.name, false);
		renderUpdatedCartHTML(
			cartContainer,
			createAddedDessertsTemplate(desserts),
			desserts
		);
	}

	if (calcTotalQuantity(desserts) < 1) emptyCartState();

	return dessert;
}

function deleteOne(data, dessert) {
	const newArr = data.filter(({ name }) => name != dessert);
	return newArr;
}

function emptyCartState() {
	document.querySelector(".cart__order").classList.add("content-disable");
	document.querySelector(".cart__products").innerHTML = `
			<div class="cart__img-box">
				<img
					src="./assets/images/illustration-empty-cart.svg"
					alt="Image of an Cake"
				/>
			</div>
			<span class="product__text">Your added items will appear here</span>
`;
	return true;
}

function toggleDialogAndOverlay(el, isAdded) {
	document.querySelector(el).classList.toggle("content-disable", !isAdded);
	document
		.querySelector(".overlay")
		.classList.toggle("content-disable", !isAdded);
}

dessertsContainer.addEventListener("click", (el) => {
	el.preventDefault();
	let targetDessert;

	if (el.target.classList.contains("btn--add-to-cart")) {
		targetDessert =
			el.target.parentElement.parentElement.querySelector(
				".desserts__name"
			);

		updateButtonStates(targetDessert.innerHTML, true);
		return addDessertToCart(dessertsData, targetDessert);
	}

	if (el.target.classList.contains("btn-increment-qnt")) {
		targetDessert =
			el.target.parentElement.parentElement.parentElement.parentElement.querySelector(
				".desserts__name"
			);

		const dessert = desserts.find(
			(obj) => obj.name == targetDessert.innerHTML
		);

		return updateQuantityCounter(dessert, "increment");
	}

	if (el.target.classList.contains("btn-decrement-qnt")) {
		targetDessert =
			el.target.parentElement.parentElement.parentElement.parentElement.querySelector(
				".desserts__name"
			);

		const dessert = desserts.find(
			(obj) => obj.name == targetDessert.innerHTML
		);

		return updateQuantityCounter(dessert, "decrement");
	}
});

cartContainer.parentElement.addEventListener("click", (el) => {
	el.preventDefault();
	let targetDessert;

	if (
		el.target.classList.contains("btn-remove-svg") ||
		el.target.classList.contains("btn-remove")
	) {
		targetDessert =
			el.target.parentElement.parentElement.parentElement.querySelector(
				".product__name"
			);

		desserts = deleteOne(desserts, targetDessert.innerHTML);

		updateButtonStates(targetDessert.innerHTML, false);

		renderUpdatedCartHTML(
			cartContainer,
			createAddedDessertsTemplate(desserts),
			desserts
		);
	}

	if (calcTotalQuantity(desserts) < 1) emptyCartState();

	if (el.target.classList.contains("btn--order")) {
		toggleDialogAndOverlay(".order-confirmed", true);

		document.querySelector(
			".order-confirmed__total-price"
		).innerHTML = `$${calcTotalPrice(desserts).toFixed(2)}`;

		return renderHTML(
			orderContainer,
			createOrderedDessertTemplate(desserts),
			"afterbegin"
		);
	}

	return (document.querySelector(".cart__quantity").textContent =
		calcTotalQuantity(desserts));
});

document.querySelector(".order-confirmed").addEventListener("click", (el) => {
	el.preventDefault();
	if (!el.target.classList.contains("btn--order")) return;
	desserts.forEach((obj) => updateButtonStates(obj.name, false));
	desserts = [];
	toggleDialogAndOverlay(".order-confirmed", false);
	emptyCartState();

	return (document.querySelector(".cart__quantity").textContent =
		calcTotalQuantity(desserts));
});

document.body.addEventListener("keydown", (e) => {
	if (e.key === "Escape") toggleDialogAndOverlay(".order-confirmed", false);
});
