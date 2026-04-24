const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Test App</title>
        <style>
          body {
            margin: 0;
            font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            background: #000;
            color: #fff;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .page {
            width: min(100%, 760px);
            padding: 2rem;
            border-radius: 20px;
            background: #0a0a0a;
            border: 1px solid #1a1a1a;
          }

          .title {
            margin: 0 0 1rem;
            font-size: clamp(2rem, 4vw, 3rem);
            letter-spacing: -0.02em;
            color: #ffffff;
          }

          .subtitle {
            margin: 0 0 1.75rem;
            font-size: 1.05rem;
            line-height: 1.7;
            color: #b3b3b3;
          }

          .panel {
            display: grid;
            gap: 1rem;
            padding: 1.5rem;
            border-radius: 16px;
            background: #111;
            border: 1px solid #222;
          }

          .badge {
            display: inline-flex;
            padding: 0.4rem 0.85rem;
            border-radius: 999px;
            background: #111;
            border: 1px solid #333;
            color: #fff;
            font-weight: 600;
            font-size: 0.75rem;
            letter-spacing: 0.05em;
          }

          .button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0.85rem 1.4rem;
            border-radius: 999px;
            border: 1px solid #333;
            background: #fff;
            color: #000;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.2s ease;
            width: fit-content;
          }

          .button:hover {
            background: #e5e5e5;
          }

          strong {
            color: #fff;
          }
        </style>
      </head>
      <body>
        <main class="page">
          <span class="badge">Test App v 1.0.11</span>
          <h1 class="title">Hello World from test lets learn!</h1>
          <p class="subtitle">
            This is a lightweight demo page served by Express inside a Dockerized Node app.
            It includes a cleaner UI, responsive layout, and a polished modern style.
          </p>
          <div class="panel">
            <p>
              You can continue building this app with navigation, APIs, or a frontend framework.
              For now, it is ready to run on port <strong>3000</strong> inside the container.
            </p>
            <a class="button" href="/">Refresh page</a>
          </div>
        </main>
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log("Test app listening at http://localhost:" + port);
});