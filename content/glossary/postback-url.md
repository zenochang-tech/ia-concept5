---
title: Postback URL
metaTitle: What is a postback URL? | Involve Asia Glossary
metaDescription: A postback URL is the server address a platform calls to report a conversion directly, without relying on a tracking pixel in the customer's browser.
tldr: A postback URL is the address a tracking platform sends a request to whenever a conversion happens, passing along details like the order ID and commission. It's the mechanism behind server-to-server tracking.
related: server-to-server-s2s-tracking, pixel-tracking, webhook
---

## What is a postback URL?

A postback URL is a server endpoint that a tracking platform calls automatically whenever a conversion is recorded, passing along parameters such as the [click ID](click-id), order value, and commission. Unlike [pixel tracking](pixel-tracking), it happens server-to-server, not in the customer's browser.

## How it's used

- **[Server-to-server (S2S) tracking](server-to-server-s2s-tracking)** — the postback URL is the core mechanism that makes this method work.
- **Passing data onward** — publishers and networks can register their own postback URL to receive conversion data as it happens, similar to how a [webhook](webhook) pushes updates elsewhere.
- **Not browser-dependent** — because it bypasses the browser, it isn't affected by ad blockers or cleared cookies.

## Why it matters

Postback URLs make tracking more reliable, particularly for app installs and cases where a customer's browser can't be relied on to fire a pixel correctly.
