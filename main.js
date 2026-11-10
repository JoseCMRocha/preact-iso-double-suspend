import { h, render } from 'preact';
import { useState } from 'preact/hooks';
import { LocationProvider, Router, Route, lazy } from 'preact-iso';

// Data that takes a second, read by suspending (throwing a promise). Like
// lazy(), the component redraws itself once the data is here.
let data;
function useSlowData() {
  const [, redraw] = useState(0);
  if (data && data.value) return data.value;
  if (!data) data = { promise: new Promise((ok) => setTimeout(() => ok('Page B data'), 1000)) };
  throw data.promise.then((value) => { data.value = value; redraw((n) => n + 1); });
}

function Home() {
  return h('div', null, h('h1', null, 'Home'), h('a', { href: '/b' }, 'Go to page B'));
}

function PageB() {
  return h('h1', null, useSlowData());
}

// Page B's code is loaded on demand, then it waits for its data: two
// suspensions in a row.
const LazyB = lazy(() => Promise.resolve(PageB));

function App() {
  return h(LocationProvider, null,
    h(Router, null,
      h(Route, { path: '/', component: Home }),
      h(Route, { path: '/b', component: LazyB }),
    ),
  );
}

render(h(App), document.getElementById('app'));
