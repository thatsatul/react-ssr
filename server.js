const express = require('express');
const compression = require('compression');
const app = express();
const ReactDOMServer = require('react-dom/server');

// const path = require('path');

import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from "redux";
import middlewares from './middlewares';
import Layout  from './layout';

// console.log('__dirname', __dirname);
// console.log(process.cwd());

// const rootDir = process.cwd();

import appReducer from './src/fe/reducers';
import FERoutes from './src/fe/routes';
// import { getTestData } from './src/fe/actions/test';

// Compression for gzip, deflate
app.use(compression());

// parse application/x-www-form-urlencoded and json
app.use(express.json({limit: '20mb'}));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

const defaultPort = process.env.PORT || 8081;

app.use(express.static('dist'));
app.use('/static', express.static('static'));

// This is fired every time the server side receives a request
app.use((req, res, next) => {
  console.log('**** Middleware - called on every server side request ****', req.url);
  next();
});

app.get('/favicon.ico', () => {});

app.get('/test', (req, res) => {
  // console.log('**** Req get *****', req.query);
  res.send('Hello World 1!');
});

app.post('/test', (req, res) => {
  // console.log('**** Req post *****', req.body);
  res.send('Hello World!');
});

// anything beginning with "/api" will go into this
// app.use('/api', require(path.join(rootDir, './src/be/routes/api/index.js')));

// Creating a single index route to server our React application from.
app.get('*', handleRender);

function handleRender(req, res) {

  // Create a new Redux store instance
  const store = createStore(appReducer, {}, applyMiddleware(...middlewares));
  const context = {};

  // Promise.all(store.dispatch(getTestData(1)))
  //   .then(() => {
  //     console.log(store.getState());
  //   })
  //   .catch(err => {
  //     console.log('Some error happened', err);
  //   });

  // Render the component to a string
  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <FERoutes />
      </StaticRouter>
    </Provider>
  );

  // Grab the initial state from our Redux store
  const preloadedState = store.getState();
  const htmlToRender = Layout({html, preloadedState});

  res.setHeader('Content-Type', 'text/html; charset=UTF-8');
  res.send(htmlToRender);
}

app.listen(defaultPort, () => {
  console.log(`App listening at http://localhost:${defaultPort}`);
});
