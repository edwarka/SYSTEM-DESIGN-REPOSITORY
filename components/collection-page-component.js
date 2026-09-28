export default {
  name: 'collection-page-component',
  setup() {
    const itemsStore = Vue.inject('itemsStore');

    return {
      itemsStore,
    };
  },
  template: /* html */ `
    <section class="page-section content-width" aria-labelledby="catalog-title">
      <div class="page-heading">
        <div>
          <p class="eyebrow">The pillow collection</p>
          <h1 id="catalog-title">Pillows for your kind of sleep</h1>
          <p class="page-intro">Explore sample pillows and compare the details that matter to you.</p>
        </div>
        <span class="catalog-count">
          {{ itemsStore.items.length }} {{ itemsStore.items.length === 1 ? 'sample pillow' : 'sample pillows' }}
        </span>
      </div>

      <div v-if="itemsStore.isLoading" class="state-message" role="status">
        Loading pillows...
      </div>

      <div v-else-if="itemsStore.error" class="state-message state-error" role="alert">
        {{ itemsStore.error }}
      </div>

      <div v-else-if="itemsStore.items.length === 0" class="state-message" role="status">
        No pillows are listed right now.
      </div>

      <div v-else class="row g-3">
        <div class="col-12 col-md-6 col-lg-4" v-for="item in itemsStore.items" :key="item.id">
          <article class="card product-card h-100">
            <img
              v-if="item.imageUrl"
              :src="item.imageUrl"
              :alt="item.name + ' pillow'"
              class="card-img-top collection-card-image object-fit-cover" />
            <div
              v-else
              class="collection-card-image image-placeholder d-flex align-items-center justify-content-center">
              Image not available
            </div>

            <div class="card-body d-flex flex-column">
              <p class="product-category">{{ item.category || 'Pillow' }}</p>
              <h2 class="product-name">{{ item.name }}</h2>
              <p class="product-description flex-grow-1 collection-description">
                {{ item.description || 'Details coming soon.' }}
              </p>

              <ul class="product-attributes" aria-label="Pillow details">
                <li v-if="item.firmness"><span>Firmness</span><span>{{ item.firmness }}</span></li>
                <li v-if="item.height"><span>Height</span><span>{{ item.height }}</span></li>
                <li v-if="item.material"><span>Material</span><span>{{ item.material }}</span></li>
              </ul>

              <div class="product-card-footer">
                <p class="product-price mb-0">
                  {{ item.price == null ? 'Price not listed' : '$' + Number(item.price).toFixed(2) }}
                </p>
                <router-link :to="'/items/' + item.id" class="btn btn-outline-primary">
                  View details <span class="visually-hidden">for {{ item.name }}</span>
                </router-link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  `,
};
