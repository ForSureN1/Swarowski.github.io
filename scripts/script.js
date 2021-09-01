document.addEventListener("DOMContentLoaded", () => { 
	
	// Burger menu
	const burger = document.querySelector('.burger');
	const menu = document.querySelector('.menu__items')
	burger.addEventListener('click', ()=>{
		burger.classList.toggle('burger_active');
		menu.classList.toggle('active');
	});

	// accordion
	const accordTitles = document.querySelectorAll('.elem-top');

	accordTitles.forEach(title => {
	  title.addEventListener('click', textdown)
	})

	function textdown({currentTarget}) {
	    currentTarget.nextElementSibling.classList.toggle('active_text');
	    currentTarget.querySelector('.faq__arrow').classList.toggle('arrow_rotate');
	};

	//busket
	// let cartData = new getCartData() || {};

	let cartData = {};
	let buy = document.querySelectorAll('.buy')
	for (let i = 0; i < buy.length; i++) {
		buy[i].addEventListener('click', ()=>{
			let itemId = buy[i].getAttribute('data-id');
			let ItemPrice = buy[i].getAttribute('data-price')
			cartData = {
				'id': buy[i].dataset.id,
				'price': buy[i].dataset.price,
			}
			console.log(cartData);
			setCartData(cartData);
		})
	}
	function getCartData() {
		return JSON.parse(localStorage.getItem('Swarovski'));
	}
	function setCartData(o){
		localStorage.setItem('Swarovski', JSON.stringify(o));
		return false;
	}


 });