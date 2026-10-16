# QuickQueue

QuickQueue is a small waitlist for a busy counter, event check-in, or any moment when people need to be helped in order. Add names as people arrive, see who is next, and remove someone when they have been served.

## Problem

When several people are waiting, it is easy to lose track of who arrived first or who should be helped next. QuickQueue keeps the line visible and the next person easy to identify.

## MVP

- Add a name to the end of the queue
- See the queue position and the person who is next
- Serve the next person and move everyone else up
- Remove an entry if plans change
- Keep the list in the current browser with `localStorage`
- Use the interface on desktop or mobile

## Intentionally excluded from V1

Accounts, cloud sync, multiple queues, staff roles, SMS notifications, ticket numbers, analytics, and a server or database. The queue is stored only in the browser where it was created.

## Tech

Vanilla HTML, CSS, and JavaScript. No framework, external service, or backend is required. Queue data is stored in browser `localStorage`.

## Run locally

Open `index.html` in a modern browser, or serve the folder with a simple local web server.

## Files

- `index.html` — page structure and accessible controls
- `styles.css` — responsive layout and visual styles
- `app.js` — queue state, rendering, and browser storage
- `README.md` — project overview and scope
- `JOURNAL.md` — Ship Log and product decisions

## Possible V2

Multiple queues, optional notes, a way to restore a mistakenly served person, and shared access could be considered after observing how people use the first version.
