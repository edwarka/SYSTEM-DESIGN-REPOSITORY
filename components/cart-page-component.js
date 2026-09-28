export default {
  name: 'cart-page-component',
  setup() {
    const itemsStore = Vue.inject('itemsStore');

    const cartItems = Vue.computed(() => itemsStore.cart.map((cartEntry) => {
      const item = itemsStore.items.find((product) => product.id === cartEntry.id);
      if (!item) {
        return null;
      }
      return {
        ...item,
        quantity: cartEntry.quantity,
        lineTotal: Number(item.price) * cartEntry.quantity,
      };
    }).filter(Boolean));
    const cartCount = Vue.computed(() => itemsStore.cart.reduce((count, item) => (
      count + item.quantity
    ), 0));
    const cartTotal = Vue.computed(() => cartItems.value.reduce((total, item) => (
      total + item.lineTotal
    ), 0));

    return {
      itemsStore,
      cartItems,
      cartCount,
      cartTotal,
    };
  },
  template: /* html */ `
    <section class="page-section content-width" aria-labelledby="cart-page-title">
      <div class="page-heading">
        <div>
          <p class="eyebrow">Your selection</p>
          <h1 id="cart-page-title">Shopping cart</h1>
        </div>
      </div>

      <div v-if="itemsStore.isLoading" class="state-message" role="status">
        Loading your cart...
      </div>
      <div v-else-if="itemsStore.error" class="state-message state-error" role="alert">
        {{ itemsStore.error }}
      </div>
      <div v-else-if="cartItems.length === 0" class="state-message" role="status">
        Your cart is empty. <router-link to="/items">Browse pillows</router-link>
      </div>

      <section v-else class="cart-panel" aria-labelledby="cart-items-title">
        <div class="cart-heading">
          <h2 id="cart-items-title">Items in your cart</h2>
          <span>{{ cartCount }} {{ cartCount === 1 ? 'item' : 'items' }}</span>
        </div>
        <p v-if="itemsStore.cartMessage" class="cart-message" role="status">
          {{ itemsStore.cartMessage }}
        </p>
        <div v-for="item in cartItems" :key="item.id" class="cart-row">
          <div class="cart-item-summary">
            <img
              v-if="item.imageUrl"
              :src="item.imageUrl"
              alt=""
              aria-hidden="true"
              class="cart-item-image" />
            <div v-else class="cart-item-image-placeholder" aria-hidden="true">
              <i class="bi bi-image"></i>
            </div>
            <div class="cart-item-copy">
              <router-link :to="'/items/' + item.id" class="cart-item-name">{{ item.name }}</router-link>
              <span class="cart-unit-price">{{ '$' + Number(item.price).toFixed(2) }} each</span>
            </div>
          </div>
          <div class="cart-quantity-control">
            <label :for="'cart-quantity-' + item.id">Quantity</label>
            <input
              :id="'cart-quantity-' + item.id"
              class="form-control"
              type="number"
              min="1"
              step="1"
              :value="item.quantity"
              @change="itemsStore.setCartQuantity(item.id, $event.target.value)" />
          </div>
          <p class="cart-line-total">{{ '$' + item.lineTotal.toFixed(2) }}</p>
          <button
            class="cart-remove-button"
            type="button"
            :aria-label="'Remove ' + item.name + ' from cart'"
            @click="itemsStore.removeFromCart(item.id)">
            Remove
          </button>
        </div>
        <div class="cart-total" aria-live="polite">
          <span>Cart total</span>
          <strong>{{ '$' + cartTotal.toFixed(2) }}</strong>
        </div>
        <section class="detail-information cart-policy-information" aria-labelledby="cart-policy-title">
          <p class="eyebrow">Sample policy</p>
          <h2 id="cart-policy-title">Shipping and returns</h2>
          <div class="detail-policy-item">
            <h3>Shipping</h3>
            <p>Standard delivery takes 3-5 business days. Any shipping cost is shown before checkout.</p>
          </div>
          <div class="detail-policy-item">
            <h3>Returns</h3>
            <p>Start a return within 30 days of delivery. Final return instructions are provided before checkout.</p>
          </div>
          <p class="detail-sample-note">Sample policy information for this prototype.</p>
        </section>
        <router-link to="/checkout" class="btn btn-primary mt-3">Continue to checkout</router-link>
        <router-link to="/items" class="btn btn-outline-primary mt-3">Continue shopping</router-link>
      </section>
    </section>
  `,
};