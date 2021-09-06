document.addEventListener('DOMContentLoaded', () => { 
	
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

	
  // language

  let lang = document.querySelector('.lang_choice');
  let other = document.querySelector('.other_lang')
  lang.addEventListener('click', selectLanguage);
  function selectLanguage() {
    other.classList.toggle('active');
  }


  //Установка цвета

  function setColor() {
    const colors = document.querySelectorAll('.color__item')
    const jsproduct = document.querySelector('.js-product')
    console.log(colors)
    // const colorAttr = document.getAttribute('data-product-color')
    for(let i = 0; i < colors.length; i++) {
      colors[i].addEventListener('click', () => {
        jsproduct.setAttribute('data-product-color', colors[i].getAttribute('data-product-color'));
      })
    }

  }

  setColor();

	//busket

	//Вызов функции товара
	function requestCart() {
    const cartDOMElement = document.querySelector('.js-cart')
    const cartItemsCounterDOMElement = document.querySelector('.js-cart-total-count-items')
    const cartTotalPriceDOMElement = document.querySelector('.js-cart-total-price')
    const cartTotalSummaDOMElement = document.querySelector('.js-cart-total-summa')
    const cart = JSON.parse(localStorage.getItem('cart')) || {};


    //отображаем добавленный товар в корзине
    const renderCartItem = ({articul, name, desc, color, size, price, totalprice, src, quantity}) => {
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
            <p><img src="${color}"></p>
          </td>
          <td class="product__count">
            <div class="count-items">
              <button class="js-plus"></button>
              <p>${quantity}</p>
              <button class="js-minus"></button>
            </div>
          </td>
          <td class="product__price">
            <p>${price} тг</p>
          </td>
          <td class="product__summ">
            <p>${totalprice} тг</p>
          </td>
          <td class="product__remove">
            <button class="remove"></button>
          </td>
        </tr>
      `;

      cartItemDOMElement.innerHTML = cartItemTemplate;
      cartItemDOMElement.setAttribute('data-product-articul', articul);
      cartItemDOMElement.classList.add('js-cart-item');
      cartDOMElement.appendChild(cartItemDOMElement);
      totalBusket();
    }


    //сохраняем товар в LocalStorage
    const saveCart = () => {
      localStorage.setItem('cart', JSON.stringify(cart));
    }


    //подсчитываение колличества и суммы товара
    const totalBusket = () => {
      let summ_array = document.querySelectorAll('.product__summ');
      let totalprice = 0;
      let totalcount = 0;
      const ids = Object.keys(cart);
      console.log(ids)
      for (let i = 0; i < ids.length; i++) {
        const id = ids[i]
        totalprice += +(cart[id].price);
        totalcount += +(cart[id].quantity);
      }


      cartTotalPriceDOMElement.textContent = totalprice + ' тг';
      cartTotalSummaDOMElement.textContent = totalprice + ' тг';
      cartItemsCounterDOMElement.textContent = totalcount + 'х';
    }

    //Обновляем данные в LocalStorage
    const updateCart = () => {
      console.log(cart);
      saveCart();
      // updateCartTotalPrice();
    }


    //Удаление из корзины
    const deleteCartItem = (articul) => {
      const cartItemDOMElement = cartDOMElement.querySelector(`[data-product-articul="${articul}"]`);
      cartDOMElement.removeChild(cartItemDOMElement);
      delete cart[articul];
      updateCart();
      console.log(cartItemDOMElement)
      totalBusket();
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