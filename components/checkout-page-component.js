export default {
  name: 'checkout-page-component',
  setup() {
    const itemsStore = Vue.inject('itemsStore');
    const shippingDetails = Vue.reactive({
      fullName: '',
      email: '',
      address: '',
      city: '',
      region: '',
      postalCode: '',
      country: 'United States',
    });
    const paymentMethod = Vue.ref('simulated-card');
    const paymentResult = Vue.ref('approved');
    const checkoutMessage = Vue.ref('');
    const checkoutStatus = Vue.ref('');
    const completedOrder = Vue.ref(null);

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
    const cartTotal = Vue.computed(() => cartItems.value.reduce((total, item) => (
      total + item.lineTotal
    ), 0));
    const unavailableItems = Vue.computed(() => cartItems.value.filter((item) => !item.inStock));

    function simulatePayment() {
      if (unavailableItems.value.length) {
        checkoutStatus.value = 'error';
        checkoutMessage.value = 'An item in your cart is unavailable. Return to your cart to remove it.';
        return;
      }

      if (paymentResult.value === 'declined') {
        checkoutStatus.value = 'error';
        checkoutMessage.value = 'The demo payment was declined. Your cart is unchanged. Try again with an approved result.';
        return;
      }

      const order = {
        id: 'DEMO-' + Date.now().toString(36).toUpperCase(),
        customer: { ...shippingDetails },
        items: cartItems.value.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: Number(item.price),
          lineTotal: item.lineTotal,
        })),
        total: cartTotal.value,
      };

      itemsStore.orders.push(order);
      itemsStore.cart.splice(0);
      itemsStore.cartMessage = '';
      completedOrder.value = order;
      checkoutStatus.value = 'success';
      checkoutMessage.value = 'Demo order created. No real charge or email was sent.';
    }

    return {
      itemsStore,
      shippingDetails,
      paymentMethod,
      paymentResult,
      checkoutMessage,
      checkoutStatus,
      completedOrder,
      cartItems,
      cartTotal,
      unavailableItems,
      simulatePayment,
    };
  },
  template: /* html */ `
    <section class="page-section content-width" aria-labelledby="checkout-title">
      <router-link to="/cart" class="back-link mb-4">
        <i class="bi bi-arrow-left" aria-hidden="true"></i> Back to cart
      </router-link>

      <div class="page-heading">
        <div>
          <p class="eyebrow">Guest checkout</p>
          <h1 id="checkout-title">Shipping and payment</h1>
        </div>
      </div>

      <div v-if="itemsStore.isLoading" class="state-message" role="status">
        Loading checkout...
      </div>
      <div v-else-if="itemsStore.error" class="state-message state-error" role="alert">
        {{ itemsStore.error }}
      </div>
      <section v-else-if="completedOrder" class="checkout-completion" aria-labelledby="order-confirmation-title">
        <p class="eyebrow">Order confirmed</p>
        <h2 id="order-confirmation-title">Thank you, {{ completedOrder.customer.fullName }}</h2>
        <p class="checkout-confirmation-message" role="status">
          Order {{ completedOrder.id }} was created for this prototype. No real charge or email was sent.
        </p>
        <ul class="checkout-summary-list">
          <li v-for="item in completedOrder.items" :key="item.id">
            <span>{{ item.name }} x {{ item.quantity }}</span>
            <span>{{ '$' + item.lineTotal.toFixed(2) }}</span>
          </li>
        </ul>
        <div class="checkout-summary-total">
          <span>Order total</span>
          <strong>{{ '$' + completedOrder.total.toFixed(2) }}</strong>
        </div>
        <router-link to="/items" class="btn btn-primary mt-3">Continue shopping</router-link>
      </section>
      <div v-else-if="cartItems.length === 0" class="state-message" role="status">
        Your cart is empty. <router-link to="/items">Browse pillows</router-link>
      </div>
      <div v-else-if="unavailableItems.length" class="state-message state-error" role="alert">
        An item in your cart is unavailable. <router-link to="/cart">Return to your cart to remove it.</router-link>
      </div>

      <div v-else class="checkout-layout">
        <form class="checkout-form" @submit.prevent="simulatePayment">
          <section class="checkout-section" aria-labelledby="shipping-details-title">
            <h2 id="shipping-details-title">Shipping details</h2>
            <div class="checkout-fields-grid">
              <div class="checkout-field checkout-field-wide">
                <label for="shipping-full-name">Full name</label>
                <input
                  id="shipping-full-name"
                  v-model.trim="shippingDetails.fullName"
                  class="form-control"
                  type="text"
                  autocomplete="name"
                  required />
              </div>
              <div class="checkout-field checkout-field-wide">
                <label for="shipping-email">Email</label>
                <input
                  id="shipping-email"
                  v-model.trim="shippingDetails.email"
                  class="form-control"
                  type="email"
                  autocomplete="email"
                  required />
              </div>
              <div class="checkout-field checkout-field-wide">
                <label for="shipping-address">Street address</label>
                <input
                  id="shipping-address"
                  v-model.trim="shippingDetails.address"
                  class="form-control"
                  type="text"
                  autocomplete="street-address"
                  required />
              </div>
              <div class="checkout-field">
                <label for="shipping-city">City</label>
                <input
                  id="shipping-city"
                  v-model.trim="shippingDetails.city"
                  class="form-control"
                  type="text"
                  autocomplete="address-level2"
                  required />
              </div>
              <div class="checkout-field">
                <label for="shipping-region">State or region</label>
                <input
                  id="shipping-region"
                  v-model.trim="shippingDetails.region"
                  class="form-control"
                  type="text"
                  autocomplete="address-level1"
                  required />
              </div>
              <div class="checkout-field">
                <label for="shipping-postal-code">Postal code</label>
                <input
                  id="shipping-postal-code"
                  v-model.trim="shippingDetails.postalCode"
                  class="form-control"
                  type="text"
                  autocomplete="postal-code"
                  required />
              </div>
              <div class="checkout-field">
                <label for="shipping-country">Country</label>
                <select
                  id="shipping-country"
                  v-model="shippingDetails.country"
                  class="form-select"
                  autocomplete="country-name"
                  required>
                  <option value="United States">United States</option>
                </select>
              </div>
            </div>
          </section>

          <fieldset class="checkout-section checkout-payment-section">
            <legend>Payment method</legend>
            <label class="checkout-payment-option" for="simulated-card-payment">
              <input
                id="simulated-card-payment"
                v-model="paymentMethod"
                class="form-check-input"
                type="radio"
                name="payment-method"
                value="simulated-card" />
              <span>Card payment (simulation)</span>
            </label>
            <p class="checkout-demo-note">
              Payments are simulated. This form does not request or save card numbers, and no real charge is made.
            </p>
            <div class="checkout-field checkout-result-field">
              <label for="demo-payment-result">Demo payment result</label>
              <select id="demo-payment-result" v-model="paymentResult" class="form-select">
                <option value="approved">Approved</option>
                <option value="declined">Declined</option>
              </select>
            </div>
          </fieldset>

          <p
            v-if="checkoutMessage"
            class="checkout-feedback"
            :class="checkoutStatus === 'error' ? 'state-error' : 'checkout-feedback-success'"
            :role="checkoutStatus === 'error' ? 'alert' : 'status'">
            {{ checkoutMessage }}
          </p>
          <button class="btn btn-primary" type="submit" :disabled="!paymentMethod">
            Simulate payment
          </button>
        </form>

        <aside class="checkout-summary" aria-labelledby="checkout-summary-title">
          <h2 id="checkout-summary-title">Cart summary</h2>
          <ul class="checkout-summary-list">
            <li v-for="item in cartItems" :key="item.id">
              <span>{{ item.name }} x {{ item.quantity }}</span>
              <span>{{ '$' + item.lineTotal.toFixed(2) }}</span>
            </li>
          </ul>
          <div class="checkout-summary-total">
            <span>Total</span>
            <strong>{{ '$' + cartTotal.toFixed(2) }}</strong>
          </div>
          <section class="detail-information checkout-policy-information" aria-labelledby="checkout-policy-title">
            <p class="eyebrow">Sample policy</p>
            <h3 id="checkout-policy-title">Shipping and returns</h3>
            <div class="detail-policy-item">
              <h4>Shipping</h4>
              <p>Standard delivery takes 3-5 business days. Any shipping cost is shown before checkout.</p>
            </div>
            <div class="detail-policy-item">
              <h4>Returns</h4>
              <p>Start a return within 30 days of delivery. Final return instructions are provided before checkout.</p>
            </div>
            <p class="detail-sample-note">Sample policy information for this prototype.</p>
          </section>
        </aside>
      </div>
    </section>
  `,
};