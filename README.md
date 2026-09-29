# WiFi Checker UI

Checks your saved Wi-Fi Network Profile saved on your machine
Uses netsh

## Run it

### Windows / MacOS
```bash
python.exe -m venv env
env/Scripts/activate
```

### Linux
```bash
python3 -m venv env
source env/bin/activate
```

### npm start
```bash
npm install
npm start
```

Then open http://localhost:3000 in your browser.

- "Reload list" fetches your saved WiFi profile names.
- "Show password" reveals the saved key for that profile