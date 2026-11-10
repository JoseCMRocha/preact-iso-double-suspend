# preact-iso: previous route dropped on a second suspension

No build step and no dependencies: `index.html` loads preact 11.2.0 and preact-iso 2.12.2 from esm.sh, and `npm start` serves the folder (`serve.mjs`, Node only). Opens in StackBlitz too.

Click "Go to page B". Page B's code is loaded with `lazy()`, then it waits one second for its data. Expected: Home stays on screen until page B is ready. Actual: the page is empty for that second.

Change `component: LazyB` to `component: PageB` in `main.js` (one suspension only) and Home stays, as expected.

`check.mjs` records what's on screen after the click (needs Playwright).
