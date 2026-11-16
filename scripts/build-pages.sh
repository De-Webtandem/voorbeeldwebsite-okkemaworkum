#!/usr/bin/env bash
# Bouwt de statische demo voor GitHub Pages in ./out.
#
# Draai dit alleen in een schone checkout (zoals in GitHub Actions): het script
# verwijdert src/app/robots.ts en sitemap.ts, omdat Next 16 die in een
# statische export alleen met `dynamic = "force-static"` toestaat, wat weer
# niet samengaat met Cache Components in de normale build. De demo is
# noindex; een vaste robots.txt blokkeert alle zoekmachines.
set -euo pipefail
rm -f src/app/robots.ts src/app/sitemap.ts
printf 'User-agent: *\nDisallow: /\n' > public/robots.txt
GITHUB_PAGES=true NEXT_PUBLIC_NOINDEX=true npm run build
touch out/.nojekyll
