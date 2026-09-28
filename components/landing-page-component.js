export default {
  name: 'landing-page-component',
  setup() {
    const itemsStore = Vue.inject('itemsStore');
    const finderSection = Vue.ref(null);
    const hasSearched = Vue.ref(false);
    const validationMessage = Vue.ref('');
    const selectedPreferences = Vue.reactive({
      firmness: '',
      height: '',
      material: '',
      cooling: '',
      sleepingPosition: '',
    });
    const preferenceFields = [
      { key: 'firmness', label: 'Firmness' },
      { key: 'height', label: 'Height' },
      { key: 'material', label: 'Material' },
      { key: 'cooling', label: 'Cooling' },
    ];

    const preferenceOptions = Vue.computed(() => {
      const options = {};
      preferenceFields.forEach(({ key }) => {
        options[key] = [...new Set(
          itemsStore.items.map((item) => item[key]).filter(Boolean),
        )].sort((first, second) => first.localeCompare(second));
      });
      return options;
    });

    const sleepingPositionOptions = Vue.computed(() => [
      { label: 'Back sleepers', value: 'back' },
      { label: 'Side sleepers', value: 'side' },
      { label: 'Stomach sleepers', value: 'stomach' },
    ].filter(({ value }) => itemsStore.items.some((item) => (
      (item.sleepingPosition || '').toLocaleLowerCase().includes(value)
    ))));

    const recommendedItems = Vue.computed(() => itemsStore.items.filter((item) => {
      const matchesAttributes = preferenceFields.every(({ key }) => (
        !selectedPreferences[key] || item[key] === selectedPreferences[key]
      ));
      const matchesPosition = !selectedPreferences.sleepingPosition || (
        (item.sleepingPosition || '').toLocaleLowerCase()
          .includes(selectedPreferences.sleepingPosition)
      );
      return matchesAttributes && matchesPosition;
    }));

    function findMatches() {
      const hasPreference = Object.values(selectedPreferences).some(Boolean);
      if (!hasPreference) {
        validationMessage.value = 'Choose at least one preference to see recommendations.';
        hasSearched.value = false;
        return;
      }
      validationMessage.value = '';
      hasSearched.value = true;
    }

    function clearFinder() {
      Object.keys(selectedPreferences).forEach((key) => {
        selectedPreferences[key] = '';
      });
      validationMessage.value = '';
      hasSearched.value = false;
    }

    function scrollToFinder() {
      finderSection.value?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    return {
      itemsStore,
      finderSection,
      hasSearched,
      validationMessage,
      selectedPreferences,
      preferenceFields,
      preferenceOptions,
      sleepingPositionOptions,
      recommendedItems,
      findMatches,
      clearFinder,
      scrollToFinder,
    };
  },
  template: /* html */ `
    <div class="home-page">
      <section class="home-hero" aria-labelledby="home-title">
        <img
          class="home-hero-image"
          src="https://images.unsplash.com/photo-1654801837430-0cc25fee42b9?auto=format&fit=crop&w=2000&q=85"
          alt=""
          aria-hidden="true" />
        <div class="home-hero-content content-width">
          <p class="eyebrow">Comfort, considered</p>
          <h1 id="home-title">
            <img src="./assets/logo-white.svg" alt="" aria-hidden="true" />
            <span>Sleep Impact</span>
          </h1>
          <p class="home-hero-copy">Find a pillow that fits the way you sleep.</p>
          <button type="button" class="btn btn-primary" @click="scrollToFinder">
            Find your pillow <i class="bi bi-arrow-right ms-2" aria-hidden="true"></i>
          </button>
        </div>
      </section>

      <section
        id="pillow-finder"
        ref="finderSection"
        class="home-finder content-width"
        aria-labelledby="finder-title">
        <p class="eyebrow">Pillow finder</p>
        <h2 id="finder-title">Choose what matters to you</h2>

        <form class="finder-panel" @submit.prevent="findMatches">
          <div v-if="itemsStore.isLoading" class="state-message" role="status">
            Loading pillow options...
          </div>
          <div v-else-if="itemsStore.error" class="state-message state-error" role="alert">
            {{ itemsStore.error }}
          </div>

          <div class="finder-controls">
            <div v-for="field in preferenceFields" :key="field.key" class="filter-control">
              <label :for="'finder-' + field.key">{{ field.label }}</label>
              <select
                :id="'finder-' + field.key"
                v-model="selectedPreferences[field.key]"
                class="form-select"
                :disabled="itemsStore.isLoading || !!itemsStore.error">
                <option value="">Any {{ field.label.toLocaleLowerCase() }}</option>
                <option v-for="option in preferenceOptions[field.key]" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>
            </div>

            <div class="filter-control">
              <label for="finder-sleeping-position">Sleeping position</label>
              <select
                id="finder-sleeping-position"
                v-model="selectedPreferences.sleepingPosition"
                class="form-select"
                :disabled="itemsStore.isLoading || !!itemsStore.error">
                <option value="">Any sleeping position</option>
                <option
                  v-for="option in sleepingPositionOptions"
                  :key="option.value"
                  :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>
          </div>

          <p v-if="validationMessage" class="state-error finder-validation" role="alert">
            {{ validationMessage }}
          </p>
          <div class="finder-actions">
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="itemsStore.isLoading || !!itemsStore.error">
              Show recommendations
            </button>
            <button type="button" class="finder-clear" @click="clearFinder">
              Clear choices
            </button>
          </div>
        </form>

        <div v-if="hasSearched" class="finder-results" aria-live="polite">
          <h3>Recommended pillows</h3>
          <div v-if="recommendedItems.length === 0" class="state-message" role="status">
            No pillows match those choices. Try changing a preference.
          </div>
          <ul v-else class="finder-result-list">
            <li v-for="item in recommendedItems" :key="item.id" class="finder-result">
              <div>
                <p class="product-category">{{ item.category || 'Pillow' }}</p>
                <h4 class="product-name">{{ item.name }}</h4>
                <p class="product-description">
                  {{ item.price == null ? 'Price not listed' : '$' + Number(item.price).toFixed(2) }}
                  <span v-if="item.firmness"> | {{ item.firmness }}</span>
                  <span v-if="item.material"> | {{ item.material }}</span>
                </p>
              </div>
              <router-link :to="'/items/' + item.id" class="btn btn-outline-primary">
                View details <span class="visually-hidden">for {{ item.name }}</span>
              </router-link>
            </li>
          </ul>
        </div>
      </section>

      <section class="home-intro content-width" aria-labelledby="intro-title">
        <p class="eyebrow">A clearer way to compare</p>
        <h2 id="intro-title">The details that help you choose</h2>
        <p class="home-intro-copy">
          Explore sample pillows by firmness, height, material, cooling, and sleeping position.
          Compare the essentials at your own pace.
        </p>

        <div class="home-details-grid">
          <article class="home-detail">
            <i class="bi bi-sliders2" aria-hidden="true"></i>
            <h3>Know what's inside</h3>
            <p>See the materials and construction listed for each pillow.</p>
          </article>
          <article class="home-detail">
            <i class="bi bi-moon-stars" aria-hidden="true"></i>
            <h3>Find your feel</h3>
            <p>Review firmness and height to understand each option.</p>
          </article>
          <article class="home-detail">
            <i class="bi bi-arrows-angle-expand" aria-hidden="true"></i>
            <h3>Compare sleep styles</h3>
            <p>Check which sleeping positions each sample is designed for.</p>
          </article>
        </div>
      </section>
    </div>
  `,
};
