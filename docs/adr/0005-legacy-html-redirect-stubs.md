# Legacy .html URLs get build-time redirect stubs

The build emits minimal `.html` files at the old paths (`games.html`,
`tools.html`, `about.html`) that forward to the corresponding clean route via
`<meta http-equiv="refresh">`, a canonical link, and `location.replace`.

GitHub Pages has no server-side redirects, so a static stub is the only
mechanism available. The old URLs have external inbound links (itch.io project
pages, YouTube descriptions, LinkedIn) that cannot be updated, and letting them
404 would lose that traffic and the URLs' search history. The cost is three
generated files and ~10 lines of build config.
