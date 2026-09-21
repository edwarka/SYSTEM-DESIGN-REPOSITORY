# Plan — Online Pillow Shopping Platform

> This first draft describes the method for building the MVP and explains the major decisions behind it. Every choice below traces back to one or more requirements from the specification.

## 1. Approach Summary
We will build a responsive online store focused on the essentials of the shopping journey: browsing pillows, filtering and searching the catalog, using a pillow finder, comparing products, adding items to a cart, and completing checkout. The first release will include guest checkout and customer account features for order tracking, while keeping the scope to the MVP and leaving advanced features such as AI recommendations out of scope. We will deliver the system in stages, starting with the data model and purchase flow so the most important customer journeys are proven before additional features are added.

## 1.5 Tech Stack
- Frontend: Responsive web storefront built with HTML, CSS, and JavaScript for the MVP; components follow a simple page-based structure for browsing, detail views, comparison, and checkout.
- Backend/DB: Hosted relational database and application API for product data, customer orders, inventory, and admin updates; database and API technology to be confirmed during implementation.
- Hosting: Cloud hosting for the storefront and API; provider to be confirmed.
- Authentication: Customer login for protected account and order data; guest checkout allowed for unauthenticated purchases; auth provider to be confirmed.
- Payments: Secure third-party payment provider for card processing and order confirmation; provider to be confirmed.
- Other services/APIs: Email or order confirmation service, inventory and tracking integrations, analytics, and cloud storage for product images; services to be confirmed.

## 2. Major Decisions (ADRs)

| ADR # | Decision | Traces to (R#) | Alternatives considered | Why this one |
|---|---|---|---|---|
| ADR-01 | Build the MVP as a responsive web shop with a public catalog, customer account area, cart, and checkout, rather than a mobile app or marketplace-only setup. | R1, R2, R3, R4, R5, R6, R9, R13, R17 | Native mobile app, marketplace storefront, single-page only without account flow | A web platform matches the MVP scope, supports both mobile and desktop, reduces complexity, and allows faster testing of the core buying experience. |
| ADR-02 | Use a hosted relational database and API layer for product catalog, inventory, and orders instead of storing everything in static files or browser-only storage. | R1, R5, R6, R7, R9, R10, R12 | Spreadsheet-based storage, browser-local storage, flat JSON files only | The system needs dependable data integrity, customer order history, live inventory checks, and admin updates; a database is the simplest reliable option for these requirements. |
| ADR-03 | Support both guest checkout and account-based order tracking in the MVP. | R6, R9, R11, R13 | Account-only checkout, no guest option | Guest checkout reduces friction for first-time buyers, while customer accounts still support protected order history and secure access to personal information. |
| ADR-04 | Use a payment processor that handles card payments and does not store full card details in the application. | R6, R7, R8, R11 | Store card data in the app database, use a custom payment gateway | This reduces security risk, follows the privacy requirement, and limits the consequences of a data breach. |
| ADR-05 | Make inventory availability a hard check before purchase completion and make product updates available through admin tools. | R5, R7, R10, R12 | Allow overselling and reconcile later, rely on manual stock updates only | Inventory must be accurate to prevent failed purchases and protect customer trust; checking stock at checkout preserves the business's reliability. |
| ADR-06 | Keep the pillow finder and product comparison aligned to a common set of product attributes, including firmness, height, material, cooling, and sleeping position. | R3, R4, R15 | Allow each product page to use different attributes, or add no structured comparison model | A standard attribute model makes the finder and comparison features consistent and prevents incomplete or confusing product comparisons. |

## 3. The components / building blocks

| Component | Purpose | Related requirements |
|---|---|---|
| Product catalog | Shows users the full range of pillows with searchable and filterable product information. | R1, R2, R15 |
| Product detail pages | Displays pillow features, pricing, shipping information, reviews, and return details. | R1, R9, R14, R15, R16 |
| Pillow finder | Helps customers choose a pillow using preferences such as sleeping position, firmness, height, and cooling needs. | R3, R15 |
| Comparison tool | Lets a customer compare up to three pillows side by side using the same product attributes. | R4, R15 |
| Reviews and ratings module | Shows customer feedback and satisfaction indicators on product pages. | R9, R14 |
| Cart and checkout flow | Lets customers add products, review totals, and complete payment. | R5, R6, R7, R13, R16 |
| Customer account and order tracking | Allows logged-in users to view protection on their data, order history, and status. | R9, R11 |
| Inventory management | Maintains product availability and prevents purchases of out-of-stock items. | R7, R10, R12 |
| Admin dashboard | Lets administrators manage products, prices, inventory, and orders. | R10 |
| Security and privacy layer | Protects customer and payment information and restricts access to personal data. | R8, R11, R17 |
| Accessibility and responsive UI layer | Ensures the platform is usable on supported mobile and desktop devices and meets accessibility expectations. | R17, NFR accessibility |

## 4. Dependencies and Assumptions

- External services/tools needed:
  - Product catalog source and initial set of pillow data for launch.
  - Hosted database and API environment for products, carts, orders, and inventory.
  - Authentication provider for customer logins and protected account access.
  - Secure payment provider that supports tokenization and order confirmation.
  - Hosting provider for the storefront and admin tools.
  - Product image storage and delivery service.
  - Shipping/return policy support and fulfillment integration if available.
  - Email or messaging service for confirmations and account notifications.

- Assumptions being made (to be confirmed before build or launch):
  - The initial launch will include a limited range of pillows rather than a very large catalog.
  - Inventory data will come from a defined source that can be updated by administration or a simple stock process.
  - Payment and shipping providers will be chosen before the MVP is launched.
  - Return and refund policies will be confirmed and shown before purchase.
  - Required product attributes will be agreed with the business owner before final catalog design.
  - MVP success will be measured using the target thresholds in the specification, including completion of checkout and product-finding speed.
  - Launch timing will depend on completion of the core product and testing cycle.
  - User interviews, surveys, and usability test findings will be used to refine the pillow finder and the product information layout.

## 5. Risks

| Risk | Likelihood | Impact | Mitigation | Owner |
|---|---|---|---|---|
| Product information or inventory data is inaccurate. | Medium | High | Use validated admin entry, required fields, stock checks at checkout, and routine product review. | Business Owner |
| Payment or checkout fails for customers. | Medium | High | Test the payment flow before launch, validate edge cases, and provide clear error messages. | Development Lead |
| Customers do not find the pillow finder useful. | Medium | Medium | Run prototype testing, review the selection questions, and refine the logic based on user feedback. | Product Owner |
| Product comparison information is incomplete or inconsistent. | Medium | Medium | Standardize product attributes and require key fields before products are published. | Product Owner |
| Pages load too slowly or feel heavy on mobile. | Medium | Medium | Compress images, optimize asset delivery, and test on low-bandwidth and mobile devices. | Frontend Lead |
| Customer data is exposed or payment information is mishandled. | Low | High | Enforce least-privilege access, secure API design, tokenized payments, and regular security reviews. | Security/Operations Lead |
| Accessibility requirements are not met. | Medium | High | Review keyboard support, contrast, labels, and form usability against WCAG 2.2 AA during development. | QA Lead |
| Mobile experience is poor for smaller screens. | Medium | Medium | Use responsive layouts, test common device sizes, and prioritize core tasks on narrow screens. | UI/UX Lead |
| Business decisions take too long and slow product delivery. | Medium | Medium | Set decision deadlines, document open questions, and move forward with clearly stated assumptions. | Sponsor |
| Forecasted sales or costs differ from the business-case estimates. | Medium | Medium | Review early results against plan assumptions and adjust spending or roadmap based on data. | Business Owner |

## 6. Sequencing

1. Confirm the product data model and the required pillow attributes, because most pages and the finder depend on this structure. This addresses the biggest source of uncertainty early and reduces rework later.
2. Build the inventory and admin foundations, including stock rules and product management, because the purchase flow and customer trust depend on accurate availability. This also supports the requirement to prevent out-of-stock purchases.
3. Create the catalog and search/filter experience, because it is the entry point for customers and it is required before deeper shopping features can be tested. This covers the browsing and matching requirements.
4. Develop the pillow finder and comparison views, because they are central to the product-selection value proposition and rely on the agreed attribute model.
5. Build the cart, guest checkout, and payment flow, because it is the highest-risk customer journey and it must work before launch. Validation here protects the order-confirmation process and the secure purchase flow.
6. Add customer accounts, order history, and protected access, because these features depend on the purchase and user data model and should be validated after the purchase flow is stable.
7. Validate security, privacy, accessibility, performance, and mobile/desktop support across the full MVP and then complete review and approval before launch. This ensures the product is usable, secure, and aligned with the business case before the first live release.

## 7. Review & Approval

| Reviewer | Date | Approved? |
|---|---|---|
| Sponsor / Business Owner | | |
| Development Lead | | |
| Security / Privacy Reviewer | | |
| QA / Accessibility Reviewer | | |

This plan should be reviewed and approved before moving to tasks.md. The purpose is to confirm that the MVP remains focused on the core shopping experience, that the high-risk areas are addressed early, and that the business and technical assumptions are acceptable before implementation begins.
