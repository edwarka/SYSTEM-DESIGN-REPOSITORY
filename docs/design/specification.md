# Online Pillow Shopping Platform — Specification

 
---
 
## 0. Constitution (fill once per project, reuse across specs)

| # | Principle | Why it exists |
|---|---|---|
| 1 | Protect customer and payment information. | Prevents security problems and protects customer trust. |
| 2 | Keep product, pricing, and inventory data accurate. | Helps customers make informed purchases. |
| 3 | Make pillow selection simple and easy to compare. | Reduces confusion and shopping time. |
| 4 | Launch an MVP before adding advanced features. | Controls cost and allows demand to be tested. |

---

## 1. Problem & Intent

**Who is this for?**

Consumers shopping online for pillows.

**What problem do they have today?**

Customers often visit multiple websites to compare pillows, prices, materials, firmness, height, sleeping position, reviews, and other features.

**Why now / why us?**

Competitive research of Purple, Casper, and Sleep Number shows that customers benefit from guided pillow selection, filters, product comparisons, and detailed product information. Our platform will bring these features together in one simple shopping experience.

**What does success look like?**

- 80% of test users find a suitable pillow within 5 minutes.
- 80% complete checkout without assistance.
- Customers can compare up to three pillows.
- Customers can use a pillow finder based on their preferences.
- The business approaches the estimated $60,000 annual benefit.
- Target first-year ROI is approximately 20%.

---

## 2. Scope

**In scope** — what this version must do.

- Pillow product catalog
- Search and filtering
- Pillow finder quiz
- Product comparison
- Product reviews and ratings
- Product images and descriptions
- Price, size, material, firmness, height, cooling, and sleeping-position information
- Shipping and return information
- Customer accounts
- Guest checkout
- Shopping cart
- Secure payment processing
- Order confirmation and tracking
- Inventory management
- Basic administration and sales reporting
- Mobile and desktop support

**Out of scope** — what it explicitly will NOT do.

- Mobile apps
- International shipping
- Medical advice
- Subscriptions
- Marketplace sellers
- Loyalty programs
- Advanced AI recommendations
- Live sleep experts
- AR/VR features

---

## 3. User Scenarios

### Scenario 1: Find a Pillow
- **Actor:** Customer
- **Trigger:** Needs to buy a new pillow.
- **Steps:** Search/browse -> apply filters or use pillow finder -> review products.
- **Success outcome:** Finds suitable pillow options.
- **Failure outcome:** Cannot find a suitable product or enough information.

### Scenario 2: Compare Pillows
- **Actor:** Customer
- **Trigger:** Choosing between multiple pillows.
- **Steps:** Select up to three products -> compare price, size, material, firmness, height, cooling, sleeping position, and ratings.
- **Success outcome:** Identifies the best option.
- **Failure outcome:** Comparison information is missing or unclear.

### Scenario 3: Purchase a Pillow
- **Actor:** Customer
- **Trigger:** Decides to purchase.
- **Steps:** Add to cart -> checkout -> enter shipping information -> pay.
- **Success outcome:** Order is completed and confirmation is received.
- **Failure outcome:** Payment or checkout fails and the customer can retry.

### Scenario 4: Manage an Order
- **Actor:** Customer
- **Trigger:** Wants to check an order.
- **Steps:** Log in -> view order history -> select order.
- **Success outcome:** Sees order status and tracking information.
- **Failure outcome:** Order information cannot be retrieved.

### Scenario 5: Manage the Store
- **Actor:** Administrator
- **Trigger:** Needs to update the store.
- **Steps:** Log in -> manage products, inventory, or orders.
- **Success outcome:** Changes are saved correctly.
- **Failure outcome:** Required information cannot be updated.

---

## 4. Requirements (EARS notation)

| ID | Requirement | Pattern |
|---|---|---|
| R1 | The system shall provide a searchable pillow catalog with complete product information. | Ubiquitous |
| R2 | When a customer searches or filters products, the system shall display matching products. | Event-driven |
| R3 | When a customer completes the pillow finder, the system shall recommend pillows based on the selected preferences. | Event-driven |
| R4 | When a customer compares products, the system shall display key differences between up to three pillows. | Event-driven |
| R5 | When a customer adds an available product to the cart, the system shall update the cart and total. | Event-driven |
| R6 | When payment succeeds, the system shall create the order and send confirmation. | Event-driven |
| R7 | If payment fails or inventory is unavailable, then the system shall prevent the completed purchase and explain the issue. | Unwanted behavior |
| R8 | The system shall not store full payment card information. | Ubiquitous |
| R9 | The system shall allow customers to view reviews, orders, and order status. | Ubiquitous |
| R10 | The system shall allow administrators to manage products, inventory, and orders. | Ubiquitous |
| R11 | While a customer is logged in, the system shall protect their account and order information from unauthorized access. | State-driven |
| R12 | While a product is out of stock, the system shall prevent customers from purchasing that product. | State-driven |
| R13 | Where guest checkout is available, the system shall allow customers to purchase without creating an account. | Optional |
| R14 | Where product reviews are available, the system shall display ratings and reviews on product pages. | Optional |
| R15 | The system shall provide product information about firmness, height, material, cooling, and recommended sleeping position. | Ubiquitous |
| R16 | The system shall provide shipping and return information before purchase. | Ubiquitous |
| R17 | The system shall work on supported mobile and desktop devices. | Ubiquitous |

---

## 5. Acceptance Criteria

| Requirement | Test | Pass condition |
|---|---|---|
| R1 | Open the product catalog. | Products and required information are displayed. |
| R2 | Search or apply a filter. | Matching products are displayed. |
| R3 | Complete the pillow finder. | Recommended products match selected preferences. |
| R4 | Compare three pillows. | Key differences are clearly displayed. |
| R5 | Add a pillow to the cart. | Product, quantity, and total update correctly. |
| R6 | Complete successful payment. | Order is created and confirmation is received. |
| R7 | Use failed payment or unavailable inventory. | Purchase is prevented and the issue is explained. |
| R8 | Complete a test purchase. | Full payment card information is not stored. |
| R9 | View reviews or order history. | Reviews, orders, and statuses are displayed. |
| R10 | Log in as an administrator. | Products, inventory, and orders can be managed. |
| R11 | Access protected information. | Only authorized information is accessible. |
| R12 | Attempt to buy an out-of-stock product. | Purchase cannot be completed. |
| R13 | Complete checkout as a guest. | Customer can purchase without creating an account. |
| R14 | Open a product with reviews. | Ratings and reviews are displayed. |
| R15 | Open a product page. | Firmness, height, material, cooling, and sleeping position are shown when applicable. |
| R16 | Review a product before purchase. | Shipping and return information is accessible. |
| R17 | Open the site on mobile and desktop. | Core features work correctly on both. |

---

## 6. Constraints & Non-Functional Requirements

- **Performance:** Core pages should load within approximately 3 seconds.
- **Security/Privacy:** Customer information and payment data must be protected. Full payment card information shall not be stored.
- **Accessibility:** The platform should target WCAG 2.2 AA.
- **Compliance/Legal:** The platform shall provide privacy, terms, shipping, and return policies.
- **Budget/Timeline:** Initial investment is approximately $50,000, with a target payback period of 12–18 months.

---

## 7. Open Questions

| Question | Owner | Status |
|---|---|---|
| Which pillows will launch first? | Business Owner | Open |
| Where will inventory come from? | Business Owner | Open |
| Which payment and shipping providers will be used? | Business Owner | Open |
| What are the return and refund policies? | Business Owner | Open |
| What product attributes are required for every pillow? | Business Owner | Open |
| What defines MVP success? | Sponsor | Open |
| What is the target launch date? | Sponsor | Open |
| What do user interviews/surveys reveal? | Researcher | Open |
| What do prototype usability tests reveal? | Researcher | Open |

---
 
## 8. Plan (derived from this spec — separate document once approved)
 
Once the spec above is approved, translate it into:
- **`plan.md`** — the approach and key decisions, each traced back to a requirement ID above
- **`tasks.md`** — atomic, ordered, checkable tasks derived from the plan
Do not skip from spec straight to a build without reviewing the plan first.
 
---
 
## 9. Approval
 
| Role | Name | Date | Signed off? |
|------|------|------|-------------|
| Spec owner | Kaleb Edwards| 9/12/2026| |
| Reviewer | | | |
 
---
 
### Primary sources this template draws on
- [GitHub Spec Kit](https://github.com/github/spec-kit) — open-source spec/plan/tasks toolkit
- [Spec-Driven Development methodology](https://github.com/github/spec-kit/blob/main/spec-driven.md) — GitHub's explainer
- [EARS notation](https://alistairmavin.com/ears/) — requirements syntax
- [Microsoft: Spec-Driven Development for AI-Native Engineering](https://developer.microsoft.com/blog/spec-driven-development-ai-native-engineering/)