
document.addEventListener('DOMContentLoaded', function() {
  const menuSection = document.querySelector('.menu-section');
  const cartWrap = document.querySelector('.cartWrap');
  const cartCount = document.querySelector('.count');

  console.log(cartCount)
  const products = [
    {
      name: 'Margherita',
      description: 'American cheesy chicken',
      price: 199,
      image: './assets/awesome-american-cheesy-chicken.jpg',
       prodPhoto: '../footer/assets/awesome-american-cheesy-chicken.jpg'
    },
    {
      name: 'Pepperoni',
      description: 'American Cheesy',
      price: 99,
      image: './assets/awesome-american-cheesy.jpg',
       prodPhoto: '../footer/assets/awesome-american-cheesy.jpg'
    },
    {
      name: 'Vegetarian',
      description: 'Bold BBQ veggies',
      price: 99,
      image: './assets/bold-bbq-veggies.jpg',
       prodPhoto: '../footer/assets/bold-bbq-veggies.jpg'
    },
    {
      name: 'BBQ Chicken',
      description: 'cheezy mushroom magic',
      price: 99,
      image: './assets/cheezy-mushroom-magic.jpg',
      prodPhoto: '../footer/assets/cheezy-mushroom-magic.jpg'
    },
    {
      name: 'Hawaiian',
      description: 'Dhabe-da-keema',
      price: 200,
      image: './assets/margherita.jpg',
      prodPhoto: '../footer/assets/margherita.jpg'
    },
    {
      name: 'Margherita',
      description: 'Tomato sauce, mozzarella, pepperoni, sausage, and bacon',
      price: 500,
      image: './assets/margherita.jpg',
      prodPhoto: '../footer/assets/margherita.jpg'
    },
    {
      name: 'Mazedar Makhni Paneer',
      description: 'White sauce, mozzarella, mushrooms',
      price: 400,
      image: './assets/mazedar-makhni-paneer.jpg',
      prodPhoto: '../footer/assets/mazedar-makhni-paneer.jpg'
    },
    {
      name: 'Prosciutto & Arugula',
      description: 'Tomato sauce, mozzarella, arugula, prosciutto',
      price: 200,
      image: './assets/awesome-american-cheesy-chicken.jpg',
      prodPhoto: '../footer/assets/awesome-american-cheesy-chicken.jpg'
    },
    {
      name: 'Schezwan Chicken Meatballs',
      description: 'Tomato sauce, mozzarella, parmesan',
      price: 250,
      image: './assets/schezwan-chicken-meatballs.jpg',
       prodPhoto: '../footer/assets/schezwan-chicken-meatballs.jpg'
    }

  ];
  
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  function updateCartCount() {
    
  if (cartCount) {
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  }
  }
  
  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    if (cartWrap) {
      updateCartDisplay();
    }
  }
 
  function displayProducts(products) {
    if (menuSection) {
      menuSection.innerHTML = ''; 
      products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('pizza-item');

        productItem.innerHTML = 
          `<div class="pic-div"><img class="pic-img" src="${product.image}" alt=""></div>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <p class="price">₹${product.price}</p>
          <div class="button-container">
            <button class="add-to-cart" data-item="${product.name}">Add to Cart</button>
            <button class="remove-from-cart" data-item="${product.name}">Remove from Cart</button>
          </div>`;

        menuSection.appendChild(productItem);
      });
    }
  }

  function updateCartDisplay() {
    if (cartWrap) {
      cartWrap.innerHTML = '';
      let subtotal = 0;

      cart.forEach(item => {
        subtotal += item.price * item.quantity;
        const itemHtml = 
       `   <li class="items ${cart.indexOf(item) % 2 === 0 ? 'odd' : 'even'}">
            <div class="infoWrap"> 
              <div class="cartSection">
                <img src="${item.prodPhoto}" alt="" class="itemImg" />
                <h3>${item.name}</h3>
                <p><input type="text" class="qty" value="${item.quantity}" data-item="${item.name}" /> x ₹${item.price}</p>
              </div>  
              <div class="prodTotal cartSection">
                <p>₹${item.price * item.quantity}</p>
              </div>
              <div class="cartSection removeWrap">
                <a href="#" class="remove" data-item="${item.name}">x</a>
              </div>
            </div>
          </li>`;
       
        cartWrap.insertAdjacentHTML('beforeend', itemHtml);
      });

      document.querySelector('.subtotal-value').textContent = `₹${subtotal}`;
      document.querySelector('.total-value').textContent = `₹${subtotal + 249}`; // Adding shipping cost
    }
  }

  if (menuSection) {
    menuSection.addEventListener('click', function(event) {
      if (event.target.classList.contains('add-to-cart')) {
        const itemName = event.target.getAttribute('data-item');
        const product = products.find(prod => prod.name === itemName);
        const cartItem = cart.find(item => item.name === itemName);

        if (cartItem) {
          cartItem.quantity++;
        } else {
          cart.push({ ...product, quantity: 1 });
        }
        console.log('Cart after adding item:', cart); // Debugging line
        saveCart();
      }

      if (event.target.classList.contains('remove-from-cart')) {
        const itemName = event.target.getAttribute('data-item');
        const cartItem = cart.find(item => item.name === itemName);

        if (cartItem) {
          if (cartItem.quantity > 1) {
            cartItem.quantity--;
          } else {
            cart = cart.filter(item => item.name !== itemName);
          }
          console.log('Cart after removing item:', cart); // Debugging line
          saveCart();
        }
      }
    });
  }

  if (cartWrap) {
    cartWrap.addEventListener('click', function(event) {


if (event.target.classList.contains('remove')) {
        const itemName = event.target.getAttribute('data-item');
        cart = cart.filter(item => item.name !== itemName);
        console.log('Cart after removing item via cart view:', cart); // Debugging line
        saveCart();
      }
    });

    cartWrap.addEventListener('input', function(event) {
      if (event.target.classList.contains('qty')) {
        const itemName = event.target.getAttribute('data-item');
        const newQty = parseInt(event.target.value);
        const cartItem = cart.find(item => item.name === itemName);
        
        if (cartItem && newQty > 0) {
          cartItem.quantity = newQty;
          console.log('Cart after quantity change:', cart); // Debugging line
          saveCart();
        }
      }
    });
  }
 
  displayProducts(products);
  updateCartDisplay();
  updateCartCount();
});