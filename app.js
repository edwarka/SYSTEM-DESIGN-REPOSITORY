import LandingPageComponent from './components/landing-page-component.js';
import AboutPageComponent from './components/about-page-component.js';
import NavbarComponent from './components/navbar-component.js';
import CollectionPageComponent from './components/collection-page-component.js';
import CartPageComponent from './components/cart-page-component.js';
import CheckoutPageComponent from './components/checkout-page-component.js';
import ItemDetailPageComponent from './components/item-detail-page-component.js';

const routes = [
  {
    path: '/',
    component: LandingPageComponent,
  },
  {
    path: '/about',
    component: AboutPageComponent,
  },
  {
    path: '/items',
    component: CollectionPageComponent,
  },
  {
    path: '/cart',
    component: CartPageComponent,
  },
  {
    path: '/checkout',
    component: CheckoutPageComponent,
  },
  {
    path: '/items/:id',
    component: ItemDetailPageComponent,
  },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

const app = Vue.createApp({
  setup() {
    const itemsStore = Vue.reactive({
      items: [],
      isLoading: true,
      error: '',
      cart: [],
      cartMessage: '',
      orders: [],
      addToCart(item) {
        if (!item.inStock) {
          this.cartMessage = item.name + ' is out of stock and cannot be added to the cart.';
          return;
        }
        if (item.price == null || !Number.isFinite(Number(item.price))) {
          this.cartMessage = item.name + ' cannot be added because its price is not listed.';
          return;
        }

        const cartEntry = this.cart.find((entry) => entry.id === item.id);
        if (cartEntry) {
          cartEntry.quantity += 1;
        } else {
          this.cart.push({ id: item.id, quantity: 1 });
        }
        this.cartMessage = item.name + ' added to your cart.';
      },
      setCartQuantity(itemId, value) {
        const cartEntry = this.cart.find((entry) => entry.id === itemId);
        if (!cartEntry) {
          return;
        }

        const quantity = Math.floor(Number(value));
        if (!Number.isFinite(quantity) || quantity < 1) {
          cartEntry.quantity = 1;
          this.cartMessage = 'Quantity must be at least 1.';
          return;
        }

        cartEntry.quantity = quantity;
        this.cartMessage = 'Cart quantity updated.';
      },
      removeFromCart(itemId) {
        const item = this.items.find((product) => product.id === itemId);
        this.cart = this.cart.filter((entry) => entry.id !== itemId);
        this.cartMessage = item ? item.name + ' removed from your cart.' : 'Cart item removed.';
      },
    });

    fetch('items-template.csv')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not load CSV data file.');
        }
        return response.text();
      })
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: ({ data, errors }) => {
            if (errors.length > 0) {
              itemsStore.error = 'There was a problem reading the CSV data.';
              itemsStore.items = [];
            } else {
              itemsStore.items = data.map((row) => ({
                id: String(row.id || '').trim(),
                name: String(row.name || '').trim(),
                description: String(row.description || '').trim(),
                category: String(row.category || '').trim(),
                imageUrl: String(row.image_url || '').trim(),
                location: String(row.location || '').trim(),
                price: String(row.price == null ? '' : row.price).trim() === '' ? null : Number(row.price),
                size: String(row.size || '').trim(),
                firmness: String(row.firmness || '').trim() || null,
                height: String(row.height || '').trim() || null,
                material: String(row.material || '').trim() || null,
                cooling: String(row.cooling || '').trim() || null,
                sleepingPosition: String(row.sleeping_position || '').trim() || null,
                inStock: String(row.in_stock || 'true').trim().toLowerCase() !== 'false',
              }));
              itemsStore.error = '';
            }
            itemsStore.isLoading = false;
          },
          error: () => {
            itemsStore.error = 'There was a problem parsing CSV data.';
            itemsStore.items = [];
            itemsStore.isLoading = false;
          },
        });
      })
      .catch(() => {
        itemsStore.error = 'There was a problem loading data.';
        itemsStore.items = [];
        itemsStore.isLoading = false;
      });

    Vue.provide('itemsStore', itemsStore);

    return {};
  },
});

app.component('navbar-component', NavbarComponent);

app.use(router);
app.mount('#app');
