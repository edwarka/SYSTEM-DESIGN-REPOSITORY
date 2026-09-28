export default {
  name: 'landing-page-component',
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
          <router-link to="/items" class="btn btn-primary">
            Find your pillow <i class="bi bi-arrow-right ms-2" aria-hidden="true"></i>
          </router-link>
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
