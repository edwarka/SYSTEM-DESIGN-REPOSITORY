# Sleep Impact — Design System

**Version:** 1.0  
**Date:** September 28, 2026  
**Applies to:** Sleep Impact organization/brand

---

## 1. Brand Principles

I want Sleep Impact to feel **calm, trustworthy, simple, and helpful**. The design should make it easy for people to find and understand sleep products without making the experience feel crowded or confusing. I want the overall experience to feel comfortable and reliable while still helping customers make decisions quickly.

---

## 2. Color Palette

I want to keep the color palette simple so the website stays consistent and easy to recognize.

| Name | Hex | Use |
|---|---|---|
| Primary | #174A5B | Main brand color, primary buttons, and navigation |
| Primary Dark | #103541 | Hover states, strong headings, and important elements |
| Accent | #D9A441 | Small highlights, selected states, and secondary actions |
| Background | #F7F8F6 | Main page background |
| Surface | #FFFFFF | Cards, forms, and product sections |
| Text | #172126 | Main text and headings |
| Muted Text | #5E6B70 | Secondary information and metadata |

### Color Rules

- The **Primary** color should be the main color people associate with Sleep Impact.
- The **Accent** color should be used sparingly so it does not compete with the primary color.
- The **Background** color should help the site feel light and calm.
- **Surface** should be used for cards, forms, and other areas that need to stand out from the background.
- **Text** should be used for important information.
- **Muted Text** should only be used for supporting information.
- Should not use color by itself to communicate things like errors, selections, or product availability.

---

## 3. Typography

I want to use one font family throughout the design to keep everything consistent and easy to manage.

**Font family:** Inter

| Role | Font | Size | Weight |
|---|---|---:|---:|
| Heading 1 | Inter | 32px | 700 |
| Heading 2 | Inter | 24px | 600 |
| Heading 3 | Inter | 20px | 600 |
| Body | Inter | 16px | 400 |
| Small / Metadata | Inter | 14px | 400 |
| Button | Inter | 15px | 600 |

### Typography Rules

- Use normal sentence case instead of using all capital letters for regular interface text.
- Body text should generally be 16px or larger.
- Use different font weights to create hierarchy instead of adding more fonts.
- Avoid decorative fonts.
- Don't add another font family unless the design system is updated.

---

## 4. Logo Usage

### Primary Logo

The Sleep Impact logo should be used in its original approved form.

**Expected files:**

- `/assets/logo.svg`
- `/assets/logo-white.svg`

If the official logo files do not exist yet, they should be created and approved before being used in the final product.

### Usage Rules

- Do not stretch or distort the logo.
- Do not rotate or change the shape of the logo.
- Do not recolor the logo outside of the approved brand colors.
- Leave enough space around the logo so it does not feel crowded.
- Use the white logo when it provides better contrast.
- Do not place the logo over a busy image if it becomes difficult to read.
- The logo should be used as a brand identifier, not as decoration.

---

## 5. Spacing & Grid

### Base Unit

**Base spacing unit: 8px**

I will use multiples of 8px whenever possible so the spacing stays consistent throughout the site.

**Standard spacing scale:**

- 8px
- 16px
- 24px
- 32px
- 48px
- 64px

### Grid

- Desktop: 12-column grid
- Maximum content width: **1200px**
- Mobile: single-column layout when appropriate
- Standard page padding: 24px on desktop and 16px on mobile

### Layout Principles

- I want the site to have enough whitespace so it does not feel crowded.
- Related information should stay grouped together.
- Product cards should line up consistently.
- I will avoid creating random spacing values when an existing spacing value works.
- The mobile version should keep the same important information and hierarchy instead of simply shrinking the desktop version.

---

## 6. Core Components

| Component | Rules |
|---|---|
| Button (primary) | Primary color background, white text, 8px radius, 12px vertical / 20px horizontal padding. |
| Button (secondary) | White or transparent background, Primary-colored border and text, 8px radius. |
| Text Button | Used for lower-priority actions without a large surrounding container. |
| Card | White background, subtle 1px border, 12px radius, and 16px padding. |
| Product Card | Product image, product name, important attributes, price, rating when available, and main shopping action. |
| Form Field | Label above the input with a clear focus state and helpful error text when needed. |
| Search Field | Simple search field with a clear control and accessible keyboard interaction. |
| Filter Control | Shows which filters are active and makes it easy to remove them. |
| Badge | Used for short statuses such as "Best Seller" or "Out of Stock." Status should not depend only on color. |
| Price | The current price should be easy to see and more prominent than secondary pricing information. |
| Rating | Show the rating and review count when review information is available. |
| Product Attribute | Product attributes should use the same labels and format throughout the site. |
| Navigation | Keep navigation simple and predictable, with the main shopping journey easy to access. |
| Modal / Dialog | Only use when it helps complete a task without losing the current page context. |
| Toast / Confirmation | Used for short confirmations such as when an item is successfully added to the cart. |
| Error Message | Clearly explain what went wrong and, when possible, tell the customer what they can do next. |

### Component States

Components should have clear states when they apply:

- Default
- Hover
- Focus
- Active / Selected
- Disabled
- Error
- Success
- Loading

These states should still be understandable without depending only on color.

---

## 7. Voice & Tone

### Voice

I want Sleep Impact to communicate in a **calm, friendly, clear, and confident** way.

### Tone

The tone should be:

- Brief
- Helpful
- Reassuring
- Human
- Easy to understand
- Not overly technical
- Never pushy or alarmist

### Writing Rules

- Use plain language whenever possible.
- Tell customers what they need to know before asking them to take an action.
- Avoid unnecessary business or technical terms.
- Avoid making exaggerated claims about sleep or health.
- Do not describe pillows as medical treatments.
- Use clear action words for buttons and other controls.

### Example Microcopy

**Preferred:**

- "Find your pillow"
- "Add to cart"
- "Compare pillows"
- "Choose your firmness"
- "Your order is confirmed."
- "This pillow is currently out of stock."
- "Try another payment method."

**Avoid:**

- "Submit"
- "Proceed with transaction"
- "Invalid input"
- "Optimize your sleep immediately"
- "Guaranteed to fix your sleep"

---

## 8. Accessibility Standards

**Standard:** WCAG 2.2 AA

I want accessibility to be part of the design from the beginning instead of something that is checked at the very end.

### Minimum Requirements

- Normal text should have a minimum contrast ratio of **4.5:1**.
- Large text should have a minimum contrast ratio of **3:1**.
- Interactive controls should have a visible keyboard focus state.
- Meaningful images should have appropriate alternative text.
- Decorative images should not add unnecessary information for screen readers.
- Forms should have clear and associated labels.
- Error messages should explain the problem and provide useful guidance.
- Important information should not be communicated through color alone.
- Interactive elements should be easy to use on touch devices.
- Keyboard users should be able to complete the main shopping experience without a mouse.
- The responsive design should remain usable on supported mobile and desktop screen sizes.

---

## 9. Version & Change Log

| Version | Date | Change | Approved by |
|---|---|---|---|
| 1.0 | 2026-09-28 | Initial version | Pending approval |

---

## How This Connects to Your Projects

- **specification.md (Constraints, Section 6):** The project should reference the design system version being used. For example: *"Branding: must comply with Sleep Impact Design System v1.0."* (edwarka/SYSTEM-DESIGN-REPOSITORY/docs/design/specification.md)
- **plan.md (Dependencies):** The Sleep Impact design system should be listed as a dependency and include a link to the design system document (edwarka/SYSTEM-DESIGN-REPOSITORY/docs/design/plan.md).

Projects should use the approved version of the design system that is current when the design work begins. If I make changes to the organization-level design system later, I should update the version and record the change in the change log.

---

## Quick Self-Check

- [ ] Brand Principles are specific enough to actually rule things out.
- [ ] Color palette is 3–7 colors, not a rainbow.
- [ ] No more than 2 font families.
- [ ] Accessibility contrast ratio is a real number, not "we'll check later."
- [ ] Version is logged and dated.