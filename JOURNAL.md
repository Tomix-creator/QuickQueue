# QuickQueue — Ship Log Journal

## 1. What I decided to build

QuickQueue is a small waitlist for keeping track of who is waiting and who should be helped next. The core job is simple: add people in arrival order, then move the line forward as each person is served.

## 2. Problem observed

At a busy counter, event desk, or small service point, staff may need to remember the order people arrived. A handwritten list can work, but it can be hard to update quickly when someone leaves or the next person is ready.

## 3. Product hypothesis

If a person can add names to one visible list and serve the next entry with one action, it will be easier to keep the line moving without relying on memory.

## 4. MVP decision

The first version focuses on one queue and three actions:

**Add a name → see who is next → serve or remove an entry.**

I left out accounts, notifications, multiple queues, staff roles, and shared access. Those features would add setup and coordination before validating whether the basic queue is useful.

## 5. What the first version includes

- Add a name to the end of the list
- Show the number of people waiting
- Identify the person at the front of the queue
- Serve the next person and move the remaining entries up
- Remove an entry if someone leaves
- Save the queue in the current browser
- Responsive layout with empty and validation states

## 6. Technical approach

I used plain HTML, CSS, and JavaScript so the app can run without a build step or backend. The queue is an array of entries, each with an ID and a name. `localStorage` keeps that array available after a refresh in the same browser.

This means the data stays on one device and is not shared with another staff member. That limitation is acceptable for the first version, but it should be clear to anyone using the app.

## 7. UX decisions

The first person in the list is labeled “Next” and gets a stronger visual treatment. The main action serves that person; a smaller remove action handles someone leaving the line. The empty state explains how to begin, and the form gives a direct message if a name is missing.

## 8. What I intentionally did not build

There are no login accounts, cloud database, SMS alerts, multiple service lines, ticket printing, or staff permissions. QuickQueue does not claim to be a shared system across devices.

## 9. Review status

The first local implementation is in place. Manual browser review and any deployment decision are still pending.

## 10. What I learned

A small feature still needs clear rules. In this case, the list order is the source of truth: adding puts someone at the end, serving removes the first person, and removing an entry keeps the remaining order intact.

Keeping the MVP local also makes the tradeoff visible. It reduces setup and keeps the first version simple, while limiting the queue to one browser.
