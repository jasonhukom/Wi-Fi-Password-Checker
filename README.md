# WiFi Checker UI

A tiny local web UI wrapping `netsh wlan` — same idea as the original Python
script, but with a browser front-end instead of a terminal prompt.

Windows only (uses `netsh`), and only shows profiles saved on this machine.

## Run it

```bash
npm install
npm start
```

Then open http://localhost:3000 in your browser.

- "Reload list" fetches your saved WiFi profile names.
- "Show password" reveals the saved key for that profile (same as
  `netsh wlan show profile "<name>" key=clear`).
