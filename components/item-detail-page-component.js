export default {
  name: 'item-detail-page-component',
  setup() {
    const itemsStore = Vue.inject('itemsStore');
    const route = VueRouter.useRoute();

    const selectedItem = Vue.computed(() => {
      return itemsStore.items.find((item) => item.id === route.params.id);
    });

    return {
      itemsStore,
      selectedItem,
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
    </section>
  `,
};
