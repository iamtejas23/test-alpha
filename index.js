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
            background: linear-gradient(135deg, #1f2937 0%, #111827 50%, #0f172a 100%);
            color: #f8fafc;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .page {
            width: min(100%, 760px);
            padding: 2rem;
            border-radius: 24px;
            background: rgba(15, 23, 42, 0.95);
            box-shadow: 0 30px 80px rgba(15, 23, 42, 0.45);
            border: 1px solid rgba(148, 163, 184, 0.12);
          }

          .title {
            margin: 0 0 1rem;
            font-size: clamp(2rem, 4vw, 3rem);
            letter-spacing: -0.03em;
          }

          .subtitle {
            margin: 0 0 1.75rem;
            font-size: 1.05rem;
            line-height: 1.8;
            color: #cbd5e1;
          }

          .panel {
            display: grid;
            gap: 1rem;
            padding: 1.5rem;
            border-radius: 18px;
            background: rgba(30, 41, 59, 0.9);
            border: 1px solid rgba(148, 163, 184, 0.08);
          }

          .badge {
            display: inline-flex;
            padding: 0.45rem 0.9rem;
            border-radius: 9999px;
            background: #0ea5e9;
            color: white;
            font-weight: 700;
            letter-spacing: 0.02em;
            text-transform: uppercase;
            font-size: 0.75rem;
          }

          .button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0.9rem 1.5rem;
            border-radius: 9999px;
            border: none;
            background: linear-gradient(90deg, #38bdf8, #60a5fa);
            color: #0f172a;
            font-weight: 700;
            text-decoration: none;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            width: fit-content;
          }

          .button:hover {
            transform: translateY(-1px);
            box-shadow: 0 18px 40px rgba(56, 189, 248, 0.25);
          }
        </style>
      </head>
      <body>
        <main class="page">
          <span class="badge">Test App v 1.0.0</span>
          <h1 class="title">Hello World from test app!</h1>
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
  console.log(`Test app listening at http://localhost:${port}`);
});