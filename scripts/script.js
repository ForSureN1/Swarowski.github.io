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

	//language

	const lang = document.querySelector('.lang_choice');
	lang.addEventListener('click', ()=>{
		this.siblings('other_lang').slideToggle();
		this.parent('lang_block').toggleClass('active');
	})



	//busket


	// //Переменные
	// let cartData = {};
	// let buy = document.querySelectorAll('.buy')

	// //Вешаем обр. собатый на каждую кпопку с вызовом функции
	// for (let i = 0; i < buy.length; i++) {
	// 	buy[i].addEventListener('click', getAttr)
	// }


	// //Получаем атрибуты товара и записываем их в объект
	// function getAttr(){
	// 	let itemId = this.getAttribute('data-id');
	// 	let itemPrice = this.getAttribute('data-price');
	// 	cartData = {
	// 			'id': this.dataset.id,
	// 			'price': this.dataset.price,
	// 		}
	// 	setCartData(cartData);
	// }

	// //Получение данных из LocalStorage
	// function getCartData() {
	// 	return JSON.parse(localStorage.getItem('Swarovski'));
	// }


	// //Запись данных в LocalStorage
	// function setCartData(o){
	// 	localStorage.setItem('Swarovski', JSON.stringify(o));
	// 	return false;
	// }

 //    function getData(e) {
 //    	let cartData = getCartData();
 //    	console.log(cartData);       	
	// }


	function requestCart() {
		const cartDOMElement = document.querySelector('.js-cart')
		const cart = {};

		if(!cartDOMElement) {
			return;
		}

		const renderCartItem = ({articul, name, desc, color, size, price,totalprice, src, quantity}) => {
			const cartItemDOMElement = document.createElement('tr');

			const cartItemTemplate = `
				<tr class="product__item">
					<td class="product__title">
						<a href="#">${src}</a>
					</td>
					<td class="product__name">
						<h2>${name}</h2>
						<p>${desc}</p>
					</td>
					<td class="product__size-color">
						<p>${size}</p>
					</td>
					<td class="product__count">
						<p>${quantity}</p>
					</td>
					<td class="product__price">
						<p>${price}</p>
					</td>
					<td class="product__summ">
						<p>${totalprice}</p>
					</td>
					<td class="product__remove">
						<a href="#" class="remove"><img src="images/remove.svg" alt=""></a>
					</td>
				</tr>
			`;
			cartItemDOMElement.innerHTML = cartItemTemplate;
			cartItemDOMElement.setAttribute('data-product-articul', articul)
			cartItemDOMElement.classList.add('js-cart-item')
			cartDOMElement.appendChild(cartItemDOMElement);
		}

		const addCartItem = (data) => {
			const {articul} = data;
			cart[articul] = data;

			renderCartItem(data);
		}


		const getProductData = (productDOMElement) => {
			const name = productDOMElement.getAttribute('data-product-name');
			const desc = productDOMElement.getAttribute('data-product-desc');
			const articul = productDOMElement.getAttribute('data-product-articul');
			const size = productDOMElement.getAttribute('data-product-size');
			const color = productDOMElement.getAttribute('data-product-color');
			const price = productDOMElement.getAttribute('data-product-price');
			const src = productDOMElement.getAttribute('data-product-img');
			const quantity = 1;
			const totalprice = quantity * +(price);
			return  {
				name,
				desc,
				articul,
				size,
				color,
				price,
				totalprice,
				src,
				quantity,
			};
		}


		const cartInit = () => {
			document.querySelector('body').addEventListener('click', (e) => {
				const target = e.target;
				if (target.classList.contains('js-buy')) {
					e.preventDefault();
					const productDOMElement = target.closest('.js-product');
					const data = getProductData(productDOMElement);
					addCartItem(data);
				}
			});
		}

		cartInit();
	}

	requestCart();
	








 });