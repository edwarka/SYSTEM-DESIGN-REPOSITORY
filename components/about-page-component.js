export default {
  name: 'about-page-component',
  template: /* html */ `
    <section class="page-section content-width about-page" aria-labelledby="about-title">
      <p class="eyebrow">A little about us</p>
      <h1 id="about-title">About Sleep Impact</h1>
      <p class="about-lead">
        Sleep Impact is a pillow-shopping concept built around a simple idea: comparing your options
        should feel clear and unhurried.
      </p>
      <p>
        This prototype uses sample product listings to show details such as firmness, height,
        material, cooling, and recommended sleeping position. The goal is to make those differences
        easier to understand as you explore.
      </p>
      <router-link to="/items" class="btn btn-primary mt-3">
        Explore pillows <i class="bi bi-arrow-right ms-2" aria-hidden="true"></i>
      </router-link>
    </section>
  `,
};
