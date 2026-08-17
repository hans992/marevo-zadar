# Inventory contract v1

Adriatic by Boat currently renders presentation inventory from `src/data/catalog.ts`. The public UI imports through `src/data/inventory.ts`, which marks the snapshot as `demo`. This boundary lets the frontend remain stable while a live loader is added later.

## Publishing gate

A live experience is publishable only when:

- the operator has approved the listing and contact details;
- the boat, capacity and skipper arrangement are verified;
- price, price unit, currency and standard fuel policy are confirmed;
- duration, departure location and meeting point are complete;
- inclusions, exclusions and cancellation terms are accurate;
- every photo has usage permission and useful alt text;
- at least one itinerary step and one image are present;
- the operator and boat are both active.

Draft records must never appear in public catalogue queries.

## Data separation

| Data                                     | Public catalogue   | Private operations |
| ---------------------------------------- | ------------------ | ------------------ |
| Operator display name, bio, avatar       | Yes                |                    |
| Operator email, phone, notes             |                    | Yes                |
| Published boat and experience details    | Yes                |                    |
| Draft listings                           |                    | Yes                |
| Availability blocks and internal reasons |                    | Yes                |
| Presentation reviews                     | Demo frontend only |                    |

Row-level security is the enforcement boundary. Anonymous users receive read-only access to active operators and boats, published experiences, images and itinerary steps. There are no anonymous write policies.

## Demo-to-live transition

1. Collect partner data with the intake template.
2. Normalize and verify it before import.
3. Import operators, boats and experiences as drafts.
4. Add a server-side inventory loader and set its snapshot mode to `live`.
5. Compare live results against the current UI routes.
6. Publish only operator-approved records.

The migration intentionally contains no invented operators or listings.
