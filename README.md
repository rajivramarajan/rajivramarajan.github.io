# Marriage Ritual App

A two-page web app that creates a wedding agenda woven from two faiths and traditions.

## Files
- `index.html` — entry point
- `app.css` — styles
- `polished-input.jsx` — input form (page 1)
- `polished-output.jsx` — storybook output (page 2)
- `tweaks-panel.jsx` — design tweaks panel (palette + view toggle)

## Hosting
Drop the entire `publish/` folder onto any static host:
- **Netlify** — drag the folder onto the Netlify Drop page
- **Vercel** — `vercel deploy` from inside the folder
- **GitHub Pages** — commit the folder and point Pages at it
- **Cloudflare Pages** — connect a repo or upload the folder

No build step is required. The page loads React + Babel from a CDN and transpiles JSX in the browser.

## Local preview
Any static file server works:
```
cd publish
python3 -m http.server 8000
```
Then open http://localhost:8000

## Notes
- Fonts (Cormorant Garamond, EB Garamond, JetBrains Mono) load from Google Fonts
- React 18.3.1 + Babel Standalone load from unpkg
- An internet connection is required for first load; everything is cacheable after
