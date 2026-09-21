# Tasks — Online Pillow Shopping Platform

> Derived from the plan document. Each task is small, checkable, and traceable to a requirement.

## Task List

| ID | Task | Traces to (R# / ADR#) | Depends on | Status |
|----|------|--------------------------|------------|--------|
| T1 | Define the pillow product data model and required attributes for the catalog | R1, R15, ADR-06 | — | Not started |
| T2 | Add realistic placeholder pillow data for the storefront catalog | R1, R15, ADR-02 | T1 | Not started |
| T3 | Adapt the current collection view to display pillow cards with pricing, attributes, and images | R1, R2, R15, ADR-01 | T2 | Not started |
| T4 | Add search and filtering controls for pillows by price, firmness, material, size, cooling, and sleeping position | R2, R15 | T3 | Not started |
| T5 | Build the pillow finder flow using selected customer preferences and recommendation logic | R3, R15, ADR-06 | T1, T4 | Not started |
| T6 | Build the product detail page for an individual pillow with reviews, price, shipping, and return information | R1, R9, R14, R15, R16, ADR-01 | T2 | Not started |
| T7 | Add review and rating display to relevant product cards and product detail views | R9, R14 | T2, T6 | Not started |
| T8 | Build the comparison view for up to three pillows using the common product attribute model | R4, R15, ADR-06 | T1, T4, T6 | Not started |
| T9 | Add shopping cart behavior for available pillows, including quantities and calculated totals | R5, R12 | T3, T6 | Not started |
| T10 | Create the guest checkout prototype with shipping details and payment form | R5, R6, R7, R13, ADR-03, ADR-04 | T9 | Not started |
| T11 | Add order confirmation states and prevent completed purchases when payment fails or inventory is unavailable | R6, R7, R12, ADR-05 | T9, T10 | Not started |
| T12 | Add shipping and return information before purchase in the cart and product flows | R16, ADR-01 | T6, T9, T10 | Not started |
| T13 | Improve the storefront layout for mobile and desktop usability across catalog, detail, cart, and checkout sections | R17, ADR-01 | T3, T6, T8, T9, T10 | Not started |
| T14 | Test the key customer flows for catalog browsing, finder use, comparison, and checkout completion | R2, R3, R4, R5, R6, R7, R13, R17 | T4, T5, T8, T9, T10, T11 | Not started |

**Status values:** Not started · In progress · Done · Blocked

## Definition of Done (applies to every task)
- Matches its linked requirement's acceptance criteria in the specification.
- Reviewed by a human before marked done
- No task marked done without a test passing

## Blocked / Questions
| Task | Blocker | Raised | Resolved |
|------|---------|--------|----------|
| | | | |
