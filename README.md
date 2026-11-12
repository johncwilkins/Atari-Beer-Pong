# Atari Beer Pong

Classic cup Pong against the computer and solo Beer Breakout. No build step or dependencies.

Pong: scroll wheel, arrows, W/S, or touch drag. Breakout: wheel, left/right arrows, A/D, mouse, or touch drag. Space serves or pauses.

## Run

Serve this folder with any static web server, for example `python3 -m http.server 8000`, and open http://localhost:8000.

## GitHub Pages

Upload this folder's contents to the root of the main branch. Under Settings > Pages, choose Deploy from a branch, main, and /(root), then Save.

## Tests

Run `node tests/rules.mjs` and `node tests/solo.mjs`.
