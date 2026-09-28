export default {
  name: 'navbar-component',
  setup() {
    const itemsStore = Vue.inject('itemsStore');
    const cartCount = Vue.computed(() => itemsStore.cart.reduce((count, item) => (
      count + item.quantity
    ), 0));

    return { cartCount };
  },
  template: /* html */ `
    <nav class="site-nav sticky-top" aria-label="Main navigation">
      <div class="site-nav-inner content-width">
        <router-link class="brand-name" to="/">
          <img src="./assets/logo.svg" alt="" aria-hidden="true" />
          <span>Sleep Impact</span>
        </router-link>

        <div class="nav-links">
          <router-link class="site-nav-link" to="/">Home</router-link>
          <router-link class="site-nav-link" to="/items">Pillows</router-link>
          <router-link
            class="site-nav-link"
            to="/cart"
            :aria-label="'Cart, ' + cartCount + (cartCount === 1 ? ' item' : ' items')">
            Cart ({{ cartCount }})
          </router-link>
          <router-link class="site-nav-link" to="/about">About</router-link>
        </div>
      </div>
    </nav>
  `,
};
