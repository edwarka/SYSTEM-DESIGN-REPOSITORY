## The first draft of the file plan.md

Before you start, please read these four files:

- `plan.md`
- `plan-guide.md`
- `business-case.md`
- `specification.md`

Take the current `plan.md` and use it as your starting point; retain its fundamental structure but improve the phrasing and organisation where appropriate.

Check `plan-guide.md` to ensure that the plan adheres to the expected format, and refer to `business-case.md` in order to understand the purpose and objectives of the project, with `specification.md` serving as the definitive source of what the system needs to do.

For this step you should produce only the first draft of the file `plan.md`. It is not necessary to write any application code, create `tasks.md`, or make changes to other files.

## What the plan should cover

The specification details both what is being built and the reasons for it; the plan should set out the method of how it will be built.

The project must be treated as a minimum viable product. Instead of attempting to create all the features at once, begin with the essential shopping experience and then develop it in stages.

The initial experience should let customers:

- Browse pillows and view product details
- Search and filter products
- Use the pillow finder
- Compare up to three pillows
- Read reviews and ratings
- Add products to a cart
- Check out as a guest or logged-in customer

The plan should include the work required for accounts, persistent data, secure payments, orders, inventory, order tracking, and the admin side of the store.

Security, privacy, accessibility, performance, and support for mobile and desktop systems are included in the MVP and must not be regarded as optional additions.

The advanced AI recommendations are not included in the MVP.

## 1. Approach Summary

Keep this short — about 2–4 sentences.

Put forward the general method in simple terms so that a person with no technical knowledge can understand it.

## 1.5 Tech Stack

Give a list of the technologies and services that we intend to use.

For example:

- Frontend:
- Backend/DB:
- Hosting:
- Authentication:
- Payments:
- Other services/APIs:

Include only those options which have in fact been made; if a decision still has to be made, state that rather than making a guess.

The ADR section should contain an explanation of any important technology decision.

## 2. Major decisions (ADRs)

Record the significant technical decisions that might have reasonably been arrived at in a different manner.

Use this table:

| ADR # | Decision | Traces to (R#) | Alternatives considered | Why this one |
|---|---|---|---|---|

Every ADR must be linked to at least one requirement from specification.md.

Consider issues involving the application's structure, the database, authentication, payments, image storage, inventory, hosting, and the way the pillow finder will function.

You shouldn't draw up an ADR for every minor decision; rather, reserve them for cases in which it might be reasonable for someone to ask at a later stage, "Why did we choose this method rather than the other one?"

## 3. The components / building blocks

Give a list of the main components of the application and provide a short explanation of what each one is responsible for.

Use:

| Component | Purpose | Related requirements |
|---|---|---|

The key components required for the MVP should be included, for example the product catalog, the product pages, search and filtering facilities, the pillow finder, the comparison tool, the reviews, the cart, checkout, customer accounts, payments, orders, inventory, and administration.

Every part should link to at least one requirement.

## 4. Dependencies and Assumptions

Provide a list of all the things we will need from the development work, together with the assumptions that still require confirmation.

Pay particular attention to the open questions in the specification:

— What pillows will be on offer at launch?
- What is the source of the inventory?
What payment and shipping services will be used?
- Can you tell me about the return and refund policy?
What product attributes are necessary?
- What criteria will be used to judge the success of the MVP?
- At what time should the product be launched?
– What do the interviews with users and the surveys indicate?
– What do the prototype usability tests have to say?

Do not make up your mind on behalf of the business owner or the sponsor; if a point is still unclear, then leave it as an open decision or assumption.

## 5. Risks

Give a list of the primary factors which might cause difficulties with the project.

Use:

| Risk | Likelihood | Impact | Mitigation | Owner |
|---|---|---|---|---|

Indicate the likelihood and impact as Low, Medium, or High.

Look at the risks that actually pertain to this project. For example:

The information regarding the product or inventory is incorrect.
-The payment or checkout process does not work properly.
- Customers find the pillow finder to be of no use.
The information used for comparing the products is incomplete.
-The pages take a long time to load.
-The customer's information is made public.
The accessibility requirements are not met.
-The mobile experience works poorly.
Business decisions take too much time and slow down development.
-The real costs or sales differ from the business-case estimates.

There must be a reasonable method for reducing or managing every risk and a person who is responsible for it.

## 6. Sequencing

Describe which thing should be built first, followed by the next one, and give the reason for this.

Use a numbered list.

Begin with the components that other parts of the system rely on and look at the uncertain areas early on; afterwards, proceed with the customer shopping experience and then cover payments, orders, inventory, and administration.

The sequence should help achieve the aim of launching a useful MVP without first adding unnecessary features.

## 7. Review & Approval

We should identify the people who are responsible for reviewing and approving the plan before proceeding to 'tasks.md'.

Instead, use titles like Sponsor or Business Owner rather than coming up with people's names.

## Keep the Business Case in Mind

The plan must support the main goals set out in `business-case.md`:

- This will make it easier for customers to buy pillows.
- Provide customers with improved methods for comparing products.
- Assist customers in selecting a pillow according to their requirements.
Start with a smaller MVP in order to test the idea.
- Assume the initial investment is about $50,000.
- Aim at an annual benefit of about $60,000 and a first-year return on investment of around 20%.

Regard these financial figures as approximations, not as assurances.

## Keep the MVP Focused

Do not add these features to the MVP:

- Mobile apps
- International shipping
- Medical advice
- Subscriptions
- Marketplace sellers
- Loyalty programs
- Advanced AI recommendations
- Live sleep experts
- AR/VR

Although they may be referred to as possible future developments, they must not be included in the present implementation plan.

## Before You Finish

Go through the completed `plan.md` one final time by referring to `plan-guide.md`, `business-case.md`, and `specification.md`.

Make sure:

- ADRs refer to the relevant requirements.
Components refer to the relevant requirements.
The risks involve likelihood, impact, mitigation, and the person responsible.
The way in which the build order is arranged is sensible.
Questions that have not been answered must be supported by evidence.
Business-case estimates are still given as estimates.
The features that were out of scope have not been included in the MVP.
- The text includes coverage of security, privacy, accessibility, performance, and the requirements for mobile and desktop systems.
- There is a clear stage involving review and approval before the file tasks.md.

The aim is to produce a practical first draft which a developer can use in order to understand what needs to be built, the order in which it should be built, and the reasons for this.