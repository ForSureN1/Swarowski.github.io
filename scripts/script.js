document.addEventListener('DOMContentLoaded', () => { 

  //slider main page
	$('#slider-internal').slick({
    autoplay:true,
    infinite: true,
    dots: false,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: false,
        }
      }]
  });


  //slider internal page
  $('#slider1').slick({
      autoplay:true,
      infinite: true,
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            dots: false,
          }
        }]
    });


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

  let lang = document.querySelector('.lang_block');
  let other = document.querySelector('.other_lang')
  lang.addEventListener('click', selectLanguage);
  function selectLanguage() {
    other.classList.toggle('active');
  }


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
              <button class="js-minus"></button>
              <p class="js-cart-item-quantity">${quantity}</p>
              <button class="js-plus"></button>
            </div>
          </td>
          <td class="product__price">
            <p>${price} тг</p>
          </td>
          <td class="product__summ">
            <p class="js-cart-item-totalprice">${totalprice} тг</p>
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
      updateCart();
    }


    //сохраняем товар в LocalStorage
    const saveCart = () => {
      localStorage.setItem('cart', JSON.stringify(cart));
    }


    //подсчитываение колличества и суммы товара
    const totalBusket = () => {
      let summ_array = document.querySelectorAll('.js-cart-item-totalprice');
      // let totalprice = document.querySelectorAll('.js-cart-item-totalprice');
      let totalcount = 0;
      const ids = Object.keys(cart);
      // console.log(ids)
      for (let i = 0; i < ids.length; i++) {
        const id = ids[i]
        // totalprice += +(cart[id].totalprice);
        totalcount += +(cart[id].quantity);
        totalprice = +(totalcount) * +(cart[id].price);
      }

      cartTotalPriceDOMElement.textContent = totalprice + ' тг';
      cartTotalSummaDOMElement.textContent = totalprice + ' тг';
      cartItemsCounterDOMElement.textContent = totalcount + 'х';
      if (ids.length == 0) {
        cartTotalPriceDOMElement.textContent = 0;
        cartTotalSummaDOMElement.textContent = 0;
      }
      updateCart();
    }



    //Обновляем данные в LocalStorage
    const updateCart = () => {
      // console.log(cart);
      saveCart();
      // updateCartTotalPrice();
    }


    //Удаление из корзины
    const deleteCartItem = (articul) => {
      const cartItemDOMElement = cartDOMElement.querySelector(`[data-product-articul="${articul}"]`);
      cartDOMElement.removeChild(cartItemDOMElement);
      delete cart[articul];
      updateCart();
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

    //Обновление количества товара и итоговой суммы
    const updateQuantityTotalPrice = (articul, quantity) => {
      const cartItemDOMElement = cartDOMElement.querySelector(`[data-product-articul="${articul}"`);
      const cartItemQuantityDOMElement = cartItemDOMElement.querySelector('.js-cart-item-quantity');
      const cartItemPriceDOMElement = cartItemDOMElement.querySelector('.js-cart-item-totalprice');
      const ids = Object.keys(cart);
      cart[articul].quantity = quantity;
      cartItemQuantityDOMElement.textContent = quantity;
      cart[articul].totalprice = cart[articul].quantity * cart[articul].price;
      cartItemPriceDOMElement.textContent = cart[articul].totalprice + ' тг';
      updateCart();
    }

    //Увеличение количества товара и итоговой суммы
    const increaseQuantity = (articul) => {
      const newQuantity = cart[articul].quantity + 1;
      updateQuantityTotalPrice(articul, newQuantity);
    }

    //Уменьшение количества товара и итоговой суммы
    const decreaseQuantity = (articul) => {
      const newQuantity = cart[articul].quantity - 1;
      if (newQuantity >= 1) {
        updateQuantityTotalPrice(articul, newQuantity);
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

    //Отображаем на товаре добавлен ли он в корзину
    // const disabledButton = () => {
    //   const ids = Object.keys(cart);
    //   const button = document.querySelectorAll('.js-buy');
      
    // }

    // disabledButton();

    const disabledButton = () => {
        console.log(cart)
        const test = document.querySelectorAll('.js-product')
        console.log(parent)
        if (cart.hasOwnProperty()){
                  console.log('Найдено')
        }
        for(let i = 0; i < test.length; i++) {
            const attr = (test[i].getAttribute('data-product-articul'))
            const parent = test[i].querySelector('.js-buy')
            console.log(parent)
            console.log(cart.hasOwnProperty(attr))
            if (cart.hasOwnProperty(attr)) {
              parent.classList.add('disabled')
            }
        }

    }
    disabledButton();


    //Инициализация
    const cartInit = () => {
    	if (cartDOMElement) {
        	renderCart();
    	}
    	document.querySelector('body').addEventListener('click', (e) => {
    		const target = e.target;

        //В корзину
    		if (target.classList.contains('js-buy')) {
    			e.preventDefault();
    			const productDOMElement = target.closest('.js-product');
    			const data = getProductData(productDOMElement);
    			addCartItem(data);
          disabledButton();
    		}

        //Удалить из корзины
    		if (target.classList.contains('remove')) {
    			e.preventDefault();
    			const cartItemDOMElement = target.closest('.js-cart-item');
    			const productArticul = cartItemDOMElement.getAttribute('data-product-articul');
    			deleteCartItem(productArticul);
    		}

        //Увеличить
        if (target.classList.contains('js-plus')) {
          e.preventDefault();
          const cartItemDOMElement = target.closest('.js-cart-item');
          const productArticul = cartItemDOMElement.getAttribute('data-product-articul');
          increaseQuantity(productArticul);
          totalBusket();
        }

        //Уменьшить
        if (target.classList.contains('js-minus')) {
          e.preventDefault();
          const cartItemDOMElement = target.closest('.js-cart-item');
          const productArticul = cartItemDOMElement.getAttribute('data-product-articul');
          decreaseQuantity(productArticul);
          totalBusket();
        }


    	});
	}

    cartInit();
  }

  requestCart();

  //Установка цвета

  function setColor() {
    const colors = document.querySelectorAll('.color__item')
    const jsproduct = document.querySelector('.js-product')
    for(let i = 0; i < colors.length; i++) {
      colors[i].addEventListener('click', () => {
        jsproduct.setAttribute('data-product-color', colors[i].getAttribute('data-product-color'));
        // console.log(jsproduct.getAttribute('data-product-color'))
        for (let j = 0; j < colors.length; j++) {
          if (jsproduct.getAttribute('data-product-color') == colors[j].getAttribute('data-product-color')) {
            colors[j].classList.add('active');
          } else {
            colors[j].classList.remove('active');
          }
        }
      })
    }

  }
  
  setColor();

  function setSize() {
    const size = document.querySelectorAll('.size__item')
    const jsproduct = document.querySelector('.js-product')
    for(let i = 0; i < size.length; i++) {
      size[i].addEventListener('click', () => {
        jsproduct.setAttribute('data-product-size', size[i].getAttribute('data-product-size'));
        for (let j = 0; j < size.length; j++) {
          if (jsproduct.getAttribute('data-product-size') == size[j].getAttribute('data-product-size')) {
            size[j].classList.add('active');
          } else {
            size[j].classList.remove('active');
          }
        }
      })
    }

  }
  
  setSize();

 });