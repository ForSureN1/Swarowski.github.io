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

	//Вызов функции товара
	function requestCart() {
    const cartDOMElement = document.querySelector('.js-cart')
    const cart = JSON.parse(localStorage.getItem('cart')) || {};


    //отображаем добавленный товар в корзине
    const renderCartItem = ({articul, name, desc, color, size, price,totalprice, src, quantity}) => {
      const cartItemDOMElement = document.createElement('tr');

      const cartItemTemplate = `
        <tr class="product__item">
          <td class="product__title">
            <a href="#"><img src="${src}"></a>
          </td>
          <td class="product__name">
            <h2>${name}</h2>
            <p>${desc}</p>
          </td>
          <td class="product__size-color">
            <p>${size}</p>
            <p>${color}</p>
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
            <button class="remove buy"><img src="images/remove.svg" alt=""></button>
          </td>
        </tr>
      `;
      cartItemDOMElement.innerHTML = cartItemTemplate;
      cartItemDOMElement.setAttribute('data-product-articul', articul);
      cartItemDOMElement.classList.add('js-cart-item');
      cartDOMElement.appendChild(cartItemDOMElement);
    }


    //сохраняем товар в LocalStorage
    const saveCart = () => {
      localStorage.setItem('cart', JSON.stringify(cart));
    }

    //Обновляем данные в LocalStorage
    const updateCart = () => {
      console.log(cart);
      saveCart();
    }


    //Удаление из корзины
    const deleteCartItem = (articul) => {
      const cartItemDOMElement = cartDOMElement.querySelector(`[data-product-articul="${articul}"]`);
      cartDOMElement.removeChild(cartItemDOMElement);
      delete cart[articul];
      updateCart();
      console.log(cartItemDOMElement)
    }

    //Добавление в корзину
    const addCartItem = (data) => {
      // const {articul} = data;
      // cart[articul] = data;
      // updateCart();
      // renderCartItem(data);
      const {articul} = data;
      cart[articul] = data;
      updateCart();
      if (cartDOMElement) {
        renderCartItem(data);
      }
    }

    //Получаем данные для объекта
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
      return  { name, desc, articul, size, color, price, totalprice, src, quantity,};
    }

    const renderCart = () => {
    	const ids = Object.keys(cart);
    	// console.log(ids);
    	ids.forEach((articul) => renderCartItem(cart[articul]));
    };


    //Инициализация
    const cartInit = () => {
    	if (cartDOMElement) {
        	renderCart();
    	}
    	document.querySelector('body').addEventListener('click', (e) => {
    		const target = e.target;
    		if (target.classList.contains('js-buy')) {
    			e.preventDefault();
    			const productDOMElement = target.closest('.js-product');
    			const data = getProductData(productDOMElement);
    			addCartItem(data);
    		}
    		if (target.classList.contains('remove')) {
    			e.preventDefault();
    			const cartItemDOMElement = target.closest('.js-cart-item');
    			const productArticul = cartItemDOMElement.getAttribute('data-product-articul');
    			deleteCartItem(productArticul);
    		}
    	});
	}

    cartInit();
  }

  requestCart();



 });