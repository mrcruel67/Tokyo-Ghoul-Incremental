# Tokyo Ghoul: Rebirth

This is a modern React application. Due to security policies (CORS), it **cannot** be opened by simply double-clicking the `index.html` file in your browser.

### How to Run:

#### Option 1: Development Mode (Recommended)
1. Open a terminal in the project folder.
2. Run `npm install` (if not already done).
3. Run `npm run dev`.
4. Open the provided local URL (usually `http://localhost:5173`).

#### Option 2: Running the Build
1. Run `npm run build`.
2. To view the built files, you need a local server. You can use:
   - `npx serve -s dist`
   - Or any other local server pointing to the `dist` folder.

#### Why the blank screen?
Browsers block "Module" scripts from loading via the `file://` protocol for security reasons. Using a local server resolves this immediately.
