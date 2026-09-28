export default {
  name: 'item-detail-page-component',
  setup() {
    const itemsStore = Vue.inject('itemsStore');
    const route = VueRouter.useRoute();

    const selectedItem = Vue.computed(() => {
      return itemsStore.items.find((item) => item.id === route.params.id);
    });
    const cartMessage = Vue.computed(() => (
      selectedItem.value && itemsStore.cartMessage.includes(selectedItem.value.name)
        ? itemsStore.cartMessage
        : ''
    ));

    return {
      itemsStore,
      selectedItem,
      cartMessage,
    };
  },
  template: /* html */ `
    <section class="page-section content-width" aria-label="Pillow details">
      <router-link to="/items" class="back-link mb-4">
        <i class="bi bi-arrow-left" aria-hidden="true"></i> Back to pillows
      </router-link>

      <div v-if="itemsStore.isLoading" class="state-message" role="status">
        Loading pillow details...
      </div>

      <div v-else-if="itemsStore.error" class="state-message state-error" role="alert">
        {{ itemsStore.error }}
      </div>

      <div v-else-if="!selectedItem" class="state-message" role="status">
        This pillow could not be found. Return to the collection to see the available options.
      </div>

      <article v-else class="detail-layout">
        <img
          v-if="selectedItem.imageUrl"
          :src="selectedItem.imageUrl"
          :alt="selectedItem.name + ' pillow'"
          class="item-detail-image detail-image object-fit-cover" />
        <div
          v-else
          class="item-detail-image detail-image image-placeholder d-flex align-items-center justify-content-center">
          Image not available
        </div>

        <div class="detail-content">
          <p class="product-category">{{ selectedItem.category || 'Pillow' }}</p>
          <h1>{{ selectedItem.name }}</h1>
          <p class="detail-description">{{ selectedItem.description || 'Details coming soon.' }}</p>
          <p class="detail-price">
            {{ selectedItem.price == null ? 'Price not listed' : '$' + Number(selectedItem.price).toFixed(2) }}
          </p>
          <p class="availability-label" :class="selectedItem.inStock ? 'availability-in-stock' : 'availability-out-of-stock'">
            {{ selectedItem.inStock ? 'In stock' : 'Out of stock' }}
          </p>
          <button
            class="btn btn-primary detail-add-to-cart"
            type="button"
            :disabled="!selectedItem.inStock"
            @click="itemsStore.addToCart(selectedItem)">
            {{ selectedItem.inStock ? 'Add to cart' : 'Out of stock' }}
          </button>
          <p v-if="cartMessage" class="cart-message" role="status">
            {{ cartMessage }}
          </p>

          <h2 class="detail-subheading">Pillow details</h2>
          <dl class="detail-attributes">
            <template v-if="selectedItem.size">
              <dt>Size</dt><dd>{{ selectedItem.size }}</dd>
            </template>
            <template v-if="selectedItem.firmness">
              <dt>Firmness</dt><dd>{{ selectedItem.firmness }}</dd>
            </template>
            <template v-if="selectedItem.height">
              <dt>Height</dt><dd>{{ selectedItem.height }}</dd>
            </template>
            <template v-if="selectedItem.material">
              <dt>Material</dt><dd>{{ selectedItem.material }}</dd>
            </template>
            <template v-if="selectedItem.cooling">
              <dt>Cooling</dt><dd>{{ selectedItem.cooling }}</dd>
            </template>
            <template v-if="selectedItem.sleepingPosition">
              <dt>Recommended for</dt><dd>{{ selectedItem.sleepingPosition }}</dd>
            </template>
          </dl>
        </div>
      </article>

      <div v-if="selectedItem" class="detail-information-grid">
        <section class="detail-information" aria-labelledby="review-title">
          <p class="eyebrow">Sample review</p>
          <h2 id="review-title">Customer feedback</h2>
          <p class="detail-review-rating">
            <span class="detail-review-stars" aria-hidden="true">
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
            </span>
            <span>5.0 out of 5 (1 sample review)</span>
          </p>
          <blockquote class="detail-review-quote">
            <p>Comfortable and supportive for my usual sleep position.</p>
            <footer>Sample customer</footer>
          </blockquote>
          <p class="detail-sample-note">Sample review content for this prototype.</p>
        </section>

        <section class="detail-information" aria-labelledby="delivery-title">
          <p class="eyebrow">Before you buy</p>
          <h2 id="delivery-title">Shipping and returns</h2>
          <div class="detail-policy-item">
            <h3>Shipping</h3>
            <p>Sample policy: Standard delivery takes 3-5 business days. Any shipping cost is shown before checkout.</p>
          </div>
          <div class="detail-policy-item">
            <h3>Returns</h3>
            <p>Sample policy: Start a return within 30 days of delivery. Final return instructions are provided before checkout.</p>
          </div>
          <p class="detail-sample-note">Sample policy information for this prototype.</p>
        </section>
      </div>
    </section>
  `,
};
