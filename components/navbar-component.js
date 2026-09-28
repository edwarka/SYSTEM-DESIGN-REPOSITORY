export default {
  name: 'navbar-component',
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
          <router-link class="site-nav-link" to="/about">About</router-link>
        </div>
      </div>
    </nav>
  `,
};
