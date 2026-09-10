---
title: Server-to-Server (S2S) Tracking
metaTitle: What is server-to-server (S2S) tracking? | Involve Asia Glossary
metaDescription: Server-to-server (S2S) tracking passes conversion data directly between an advertiser's server and the tracking platform, bypassing the browser.
tldr: Server-to-server (S2S) tracking sends conversion data directly from an advertiser's server to the tracking platform via a postback URL, rather than relying on a browser cookie or pixel.
related: postback-url, pixel-tracking, tracking-cookie, cross-device-tracking
---

## What is server-to-server tracking?

Server-to-server (S2S) tracking is a method of recording conversions where the [advertiser](advertiser)'s server sends confirmation of a sale or action directly to the tracking platform, usually through a [postback URL](postback-url). It bypasses the customer's browser entirely, unlike methods that rely on a [tracking cookie](tracking-cookie) or [pixel](pixel-tracking).

## Why it is used

- **More reliable** — not affected by browser settings, ad blockers, or cookie restrictions.
- **Works across devices** — supports [cross-device tracking](cross-device-tracking), since it does not depend on the browser that clicked the original link.
- **Common in app tracking** — widely used for mobile and in-app conversions, where a pixel is often impractical.

## How it compares

Where pixel tracking fires from the customer's browser at the moment of conversion, S2S tracking fires from the advertiser's own backend once the transaction is confirmed, which many advertisers consider a more accurate and tamper-resistant source of conversion data.
