export default {
  name: 'collection-page-component',
  setup() {
    const itemsStore = Vue.inject('itemsStore');
    const searchQuery = Vue.ref('');
    const priceLimit = Vue.ref(null);
    const selectedComparisonIds = Vue.ref([]);
    const selectedFilters = Vue.reactive({
      firmness: '',
      material: '',
      size: '',
      cooling: '',
      sleepingPosition: '',
    });

    const filterDefinitions = [
      { key: 'firmness', label: 'Firmness' },
      { key: 'material', label: 'Material' },
      { key: 'size', label: 'Size' },
      { key: 'cooling', label: 'Cooling' },
      { key: 'sleepingPosition', label: 'Sleeping position' },
    ];
    const comparisonAttributes = [
      { key: 'price', label: 'Price' },
      { key: 'size', label: 'Size' },
      { key: 'firmness', label: 'Firmness' },
      { key: 'height', label: 'Height' },
      { key: 'material', label: 'Material' },
      { key: 'cooling', label: 'Cooling' },
      { key: 'sleepingPosition', label: 'Sleeping position' },
      { key: 'rating', label: 'Sample rating' },
    ];

    const selectedComparisonItems = Vue.computed(() => itemsStore.items.filter((item) => (
      selectedComparisonIds.value.includes(item.id)
    )));

    const filterOptions = Vue.computed(() => {
      const getOptions = (property) => [...new Set(
        itemsStore.items.map((item) => item[property]).filter(Boolean),
      )].sort((first, second) => first.localeCompare(second));

      return {
        firmness: getOptions('firmness'),
        material: getOptions('material'),
        size: getOptions('size'),
        cooling: getOptions('cooling'),
        sleepingPosition: getOptions('sleepingPosition'),
      };
    });

    const maxCatalogPrice = Vue.computed(() => {
      const prices = itemsStore.items
        .map((item) => item.price)
        .filter((price) => price != null && Number.isFinite(Number(price)))
        .map(Number);

      return prices.length ? Math.ceil(Math.max(...prices)) : 0;
    });

    const filteredItems = Vue.computed(() => {
      const query = searchQuery.value.trim().toLocaleLowerCase();

      return itemsStore.items.filter((item) => {
        const searchableText = [
          item.name,
          item.description,
          item.category,
          item.size,
          item.firmness,
          item.height,
          item.material,
          item.cooling,
          item.sleepingPosition,
        ].filter(Boolean).join(' ').toLocaleLowerCase();

        const matchesSearch = !query || searchableText.includes(query);
        const matchesAttributes = filterDefinitions.every(({ key }) => {
          return !selectedFilters[key] || item[key] === selectedFilters[key];
        });
        const matchesPrice = priceLimit.value == null || (
          item.price != null && Number(item.price) <= priceLimit.value
        );

        return matchesSearch && matchesAttributes && matchesPrice;
      });
    });

    const activeFilters = Vue.computed(() => {
      const active = [];
      const trimmedQuery = searchQuery.value.trim();

      if (trimmedQuery) {
        active.push({ key: 'search', label: 'Search', value: trimmedQuery });
      }

      filterDefinitions.forEach(({ key, label }) => {
        if (selectedFilters[key]) {
          active.push({ key, label, value: selectedFilters[key] });
        }
      });

      if (priceLimit.value != null && priceLimit.value < maxCatalogPrice.value) {
        active.push({ key: 'price', label: 'Up to', value: '$' + priceLimit.value });
      }

      return active;
    });

    function clearFilter(key) {
      if (key === 'search') {
        searchQuery.value = '';
      } else if (key === 'price') {
        priceLimit.value = null;
      } else {
        selectedFilters[key] = '';
      }
    }

    function clearAllFilters() {
      searchQuery.value = '';
      priceLimit.value = null;
      filterDefinitions.forEach(({ key }) => {
        selectedFilters[key] = '';
      });
    }

    function removeComparisonItem(itemId) {
      selectedComparisonIds.value = selectedComparisonIds.value.filter((id) => id !== itemId);
    }

    function clearComparison() {
      selectedComparisonIds.value = [];
    }

    function comparisonValue(item, key) {
      if (key === 'price') {
        return item.price == null || !Number.isFinite(Number(item.price))
          ? 'Price not listed'
          : '$' + Number(item.price).toFixed(2);
      }
      if (key === 'rating') {
        return '5.0 out of 5 (1 sample review)';
      }
      return item[key] || 'Not listed';
    }

    return {
      itemsStore,
      searchQuery,
      priceLimit,
      selectedFilters,
      filterOptions,
      maxCatalogPrice,
      filteredItems,
      activeFilters,
      clearFilter,
      clearAllFilters,
      selectedComparisonIds,
      selectedComparisonItems,
      comparisonAttributes,
      removeComparisonItem,
      clearComparison,
      comparisonValue,
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
        <span class="catalog-count" aria-live="polite">
          {{ filteredItems.length }} of {{ itemsStore.items.length }} pillows
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

      <div v-else>
        <section class="filter-panel" aria-label="Search and filter pillows">
          <div class="filter-controls">
            <div class="search-control">
              <label for="pillow-search">Search pillows</label>
              <div class="search-input-wrap">
                <input
                  id="pillow-search"
                  v-model="searchQuery"
                  class="form-control"
                  type="search"
                  autocomplete="off"
                  placeholder="Search by name, material, or feature" />
                <button
                  v-if="searchQuery"
                  class="search-clear"
                  type="button"
                  aria-label="Clear search"
                  @click="clearFilter('search')">
                  <i class="bi bi-x-circle" aria-hidden="true"></i>
                </button>
              </div>
            </div>
            <div class="filter-control price-filter-control">
              <label for="pillow-price">Maximum price</label>
              <input
                id="pillow-price"
                class="form-range"
                type="range"
                min="0"
                :max="maxCatalogPrice || 1"
                step="1"
                :value="priceLimit == null ? maxCatalogPrice : priceLimit"
                :disabled="maxCatalogPrice === 0"
                :aria-valuetext="'Up to $' + (priceLimit == null ? maxCatalogPrice : priceLimit)"
                aria-describedby="pillow-price-value"
                @input="priceLimit = Number($event.target.value)" />
              <output id="pillow-price-value" for="pillow-price">
                Up to \${{ priceLimit == null ? maxCatalogPrice : priceLimit }}
              </output>
            </div>

            <div class="filter-control">
              <label for="pillow-firmness">Firmness</label>
              <select id="pillow-firmness" v-model="selectedFilters.firmness" class="form-select">
                <option value="">All firmness</option>
                <option v-for="option in filterOptions.firmness" :key="option" :value="option">{{ option }}</option>
              </select>
            </div>

            <div class="filter-control">
              <label for="pillow-material">Material</label>
              <select id="pillow-material" v-model="selectedFilters.material" class="form-select">
                <option value="">All materials</option>
                <option v-for="option in filterOptions.material" :key="option" :value="option">{{ option }}</option>
              </select>
            </div>

            <div class="filter-control">
              <label for="pillow-size">Size</label>
              <select id="pillow-size" v-model="selectedFilters.size" class="form-select">
                <option value="">All sizes</option>
                <option v-for="option in filterOptions.size" :key="option" :value="option">{{ option }}</option>
              </select>
            </div>

            <div class="filter-control">
              <label for="pillow-cooling">Cooling</label>
              <select id="pillow-cooling" v-model="selectedFilters.cooling" class="form-select">
                <option value="">All cooling features</option>
                <option v-for="option in filterOptions.cooling" :key="option" :value="option">{{ option }}</option>
              </select>
            </div>

            <div class="filter-control">
              <label for="pillow-position">Sleeping position</label>
              <select id="pillow-position" v-model="selectedFilters.sleepingPosition" class="form-select">
                <option value="">All sleeping positions</option>
                <option v-for="option in filterOptions.sleepingPosition" :key="option" :value="option">{{ option }}</option>
              </select>
            </div>
          </div>

          <div v-if="activeFilters.length" class="active-filter-section" aria-label="Active filters">
            <span class="active-filter-label">Active filters</span>
            <div class="active-filter-list">
              <button
                v-for="filter in activeFilters"
                :key="filter.key"
                class="active-filter"
                type="button"
                :aria-label="'Remove filter: ' + filter.label + ' ' + filter.value"
                @click="clearFilter(filter.key)">
                {{ filter.label }}: {{ filter.value }}
                <i class="bi bi-x" aria-hidden="true"></i>
              </button>
              <button class="clear-filters-button" type="button" @click="clearAllFilters">
                Clear filters
              </button>
            </div>
          </div>
        </section>

        <div v-if="filteredItems.length === 0" class="state-message no-results" role="status">
          <p>No pillows match your search or filters.</p>
          <button class="clear-filters-button" type="button" @click="clearAllFilters">
            Clear search and filters
          </button>
        </div>

        <div v-else class="row g-3">
        <div class="col-12 col-md-6 col-lg-4" v-for="item in filteredItems" :key="item.id">
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
              <p class="product-rating-label">Sample rating</p>
              <p class="product-rating">
                <span class="product-rating-stars" aria-hidden="true">
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                </span>
                <span>5.0 out of 5</span>
                <span>(1 sample review)</span>
              </p>
              <p class="product-description flex-grow-1 collection-description">
                {{ item.description || 'Details coming soon.' }}
              </p>

              <ul class="product-attributes" aria-label="Pillow details">
                <li v-if="item.size"><span>Size</span><span>{{ item.size }}</span></li>
                <li v-if="item.firmness"><span>Firmness</span><span>{{ item.firmness }}</span></li>
                <li v-if="item.height"><span>Height</span><span>{{ item.height }}</span></li>
                <li v-if="item.material"><span>Material</span><span>{{ item.material }}</span></li>
                <li v-if="item.cooling"><span>Cooling</span><span>{{ item.cooling }}</span></li>
                <li v-if="item.sleepingPosition"><span>Recommended for</span><span>{{ item.sleepingPosition }}</span></li>
              </ul>

              <div class="compare-choice form-check">
                <input
                  :id="'compare-' + item.id"
                  v-model="selectedComparisonIds"
                  class="form-check-input"
                  type="checkbox"
                  :value="item.id"
                  :disabled="selectedComparisonIds.length >= 3 && !selectedComparisonIds.includes(item.id)" />
                <label class="form-check-label" :for="'compare-' + item.id">Compare</label>
              </div>

              <div class="product-card-footer">
                <p class="product-price mb-0">
                  {{ item.price == null ? 'Price not listed' : '$' + Number(item.price).toFixed(2) }}
                </p>
                <div class="product-card-actions">
                  <router-link :to="'/items/' + item.id" class="btn btn-outline-primary">
                    View details <span class="visually-hidden">for {{ item.name }}</span>
                  </router-link>
                  <button
                    class="btn btn-primary"
                    type="button"
                    :disabled="!item.inStock"
                    :aria-label="'Add ' + item.name + ' to cart'"
                    @click="itemsStore.addToCart(item)">
                    {{ item.inStock ? 'Add to cart' : 'Out of stock' }}
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>

      <section class="comparison-section" aria-labelledby="comparison-title">
        <div class="comparison-heading">
          <div>
            <h2 id="comparison-title">Compare pillows</h2>
            <p class="comparison-count" aria-live="polite">
              {{ selectedComparisonItems.length }} of 3 selected
            </p>
          </div>
          <button
            v-if="selectedComparisonItems.length"
            class="clear-filters-button"
            type="button"
            @click="clearComparison">
            Clear comparison
          </button>
        </div>

        <p v-if="selectedComparisonItems.length < 2" class="comparison-guidance" role="status">
          Select at least two pillows to compare.
        </p>
        <p v-else-if="selectedComparisonItems.length === 3" class="comparison-guidance" role="status">
          Three pillows selected. Remove one to choose another.
        </p>

        <div v-if="selectedComparisonItems.length >= 2" class="comparison-table-wrap" tabindex="0" aria-label="Pillow comparison table">
          <table class="comparison-table">
            <caption class="visually-hidden">Comparison of selected pillows</caption>
            <thead>
              <tr>
                <th scope="col">Pillow detail</th>
                <th v-for="item in selectedComparisonItems" :key="item.id" scope="col">
                  <div class="comparison-column-heading">
                    <div class="comparison-product">
                      <img
                        v-if="item.imageUrl"
                        :src="item.imageUrl"
                        alt=""
                        aria-hidden="true"
                        class="comparison-product-image" />
                      <div v-else class="comparison-image-placeholder" aria-hidden="true">
                        <i class="bi bi-image"></i>
                      </div>
                      <span>{{ item.name }}</span>
                    </div>
                    <button
                      class="remove-comparison-item"
                      type="button"
                      :aria-label="'Remove ' + item.name + ' from comparison'"
                      @click="removeComparisonItem(item.id)">
                      <i class="bi bi-x-lg" aria-hidden="true"></i>
                    </button>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="attribute in comparisonAttributes" :key="attribute.key">
                <th scope="row">{{ attribute.label }}</th>
                <td v-for="item in selectedComparisonItems" :key="item.id">
                  {{ comparisonValue(item, attribute.key) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `,
};
