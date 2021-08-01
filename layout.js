const Layout = ({ html, preloadedState }) => `
  <!DOCTYPE html>
  <html lang="en">

    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="description" content="Simple React Bootstrap">
      <base href="/" />
      <link rel="manifest" href="/manifest.json">
      <title>React simple bootstrap</title>
    </head>

    <body>
      <noscript>Your browser does not support Javascript</noscript>
      <div id="root">${html}</div>
      <link rel="icon" sizes="192x192" href="/static/img/icons-192.png">
      <link rel="icon" sizes="512x512" href="/static/img/icons-512.png">
      <link rel="apple-touch-icon" href="/static/img/icons-192.png">
      <script>
        // WARNING: See the following for security issues around embedding JSON in HTML:
        // https://redux.js.org/recipes/server-rendering/#security-considerations
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
      </script>
      <script defer src="/client_bundle.js"></script>
    </body>
  </html>
`;

export default Layout;
