# Copilot Prompt — First Draft of `tasks.md`

Prepare the initial draft of the file called `tasks.md` for the Online Pillow Shopping Platform.

Before creating the tasks, review:

Use the file named `plan.md` when making your decisions about sequencing and implementation.
Use specification.md for the requirements and acceptance criteria.
Use the `business-case.md` file to ensure that the tasks stay in line with the business goals and the MVP scope.
The plan-guide.md document should be used if you want to understand the reasons that led to the decisions and the order in which they were made.
- Use the existing file as a template and keep its structure.
Use the `tasks-guide.md` file to ensure that the tasks are small, checkable, ordered, and traceable.

Before creating tasks, also look over the application code that is already in the workspace. The aim should be to build upon what is currently there rather than replacing or unnecessarily rewriting the existing application.

## What we are trying to accomplish

For the initial set of tasks, you should concentrate on producing a compelling and functional **front-end MVP prototype** of the pillow shopping experience.

Wherever needed the prototype should make use of local or placeholder data. We do not intend to finish off the database, the backend, authentication, payment integration, or the other external services unless those services are already supported by the existing application.

The front-end needs to show off the main customer experience and should enable people to browse and evaluate pillows in a realistic way.

The first phase should cover the customer-facing experience, including:

- Pillow catalog
- Product cards and product details
- Search
- Filtering
- Pillow finder
- Product comparison for up to three pillows
- Reviews and ratings
- Shopping cart
- Checkout flow/prototype
- Shipping and return information
- Responsive mobile and desktop layouts

Use realistic placeholder pillow data that includes the product attributes required by the specification, such as:

- Price
- Size
- Material
- Firmness
- Height
- Cooling
- Recommended sleeping position
- Ratings/reviews
- Product images
- Availability

We want the prototype to have the feel of an actual pillow shopping site, not just be a set of placeholder screens.

## Follow the existing plan

Take the sequence listed in `plan.md` and use it as the order for the tasks.

You should not generate tasks that belong to later phases unless they are required to support the front-end prototype.

Features involving persistent backend data, real authentication, payment processing, inventory integration, order tracking, and administrator functionality should only be included when suitable according to the plan; don't bring those features into the front-end phase too early.

## Keep tasks small

A developer should have something completed for each task in less than a day.

A task must begin with a verb and describe a single clear action.

Good:

- `Build the pillow catalog view using the existing product card component`
- `Add firmness and sleeping-position filters`
- `Build the product comparison view for up to three pillows`

Avoid tasks like:

- `Build the frontend`
- `Build the shopping experience`
- `Complete the application`

If the task seems too big to make it clear what constitutes 'done', then divide it into smaller tasks.

## Use the required task format

Follow the current `tasks.md` structure.

| ID | Task | Traces to (R# / ADR#) | Depends on | Status |
|---|---|---|---|---|

Begin with T1 and then go on in sequence.

Use:

`Not started`

for all new tasks.

Each task must be linked to at least one requirement taken from specification.md or an ADR from plan.md.

Make sure that you do not set up any tasks which have no direct connection with the project requirements or decisions.

## Make the tasks testable

It should be possible for someone to examine every task and judge if it is complete.

When deciding what is meant by "done", refer to the acceptance criteria in specification.md.

For instance, when a task involves implementing product filtering, the associated requirement and acceptance criteria should clearly state what is required to work.

It is a good idea to include separate testing tasks where this is appropriate, particularly in the case of important customer workflows.

## Respect the existing code

Prior to preparing the tasks, you should check the application as it currently is.

Wherever possible, reuse components, layouts, styles, utilities, and patterns since they have already solved part of the problem.

You should not design tasks that would require you to rewrite the whole template in order to implement the pillow experience.

Where a component that already exists can be adapted, it is necessary to create a task for adapting it rather than replacing it.

The task list produced should show what the actual starting point of the workspace is.

## Suggested front-end progression

Use the plan and existing code to determine the exact order, but the work will likely move roughly from:

1. Modify the current data model so that it includes representations of pillows and the necessary product attributes.
2. Add realistic placeholder pillow data.
3. Adjust the current catalog/listing experience.
4. Create or change product detail pages.
5. Include the ability to search and filter products.
Include the pillow finder experience.
7. Include a comparison of the pillows for up to three of them.
8. Include reviews and ratings with the product information.
9. Include the shopping cart experience.
10. Include the front-end checkout process.
11. Include details about shipping and returns.
12. Ensure that the main experience functions well on both mobile and desktop devices.
13. Check the key customer workflows against the specification.

You shouldn't blindly adhere to this order; instead, refer to the dependencies listed in `plan.md` and the current codebase to work out the real sequence.

## Out-of-scope features

Do not create MVP tasks for:

- Mobile apps
- International shipping
- Medical advice
- Subscriptions
- Marketplace sellers
- Loyalty programs
- Advanced AI recommendations
- Live sleep experts
- AR/VR

The pillow finder must be built using the defined product attributes and customer preferences, not an advanced AI system.

## Definition of Done

Do not alter the Definition of Done that is currently in the `tasks.md` template:

- It meets the acceptance criteria stated in the specification for the linked requirement.
A human reviews it before marking it done.
- A task will not be marked as done unless a test has passed.

Do not rewrite or customize this section.

## Blocked / Questions

Make sure that the `Blocked / Questions` section remains in the template.

Instead of quietly skipping the task, you should record the reason why it cannot proceed because of a missing business decision, dependency, or some other blocker.

## Final check

Before you finish `tasks.md`, check that:

All tasks have an R number or an ADR number.
- Each task is small enough that it can be completed within one day.
- The tasks are carried out in the order specified in `plan.md`.
The dependencies between the tasks are clearly identified.
-The tasks are specific in such a way that it is easy to know when they are completed.
- Before carrying out the new work, the existing application was taken into account.
- Where it is practical, the components that already exist are reused or modified.
- In the first phase a convincing and functional front-end prototype is created.
The backend and integration work is not unreasonably included in the front-end phase.
Features that are out of scope are not included.
- New tasks begin in the 'Not started' state.

Prepare just the first draft of the file called tasks.md; don't carry out the tasks at this stage.
