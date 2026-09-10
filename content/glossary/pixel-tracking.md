---
title: Pixel Tracking
metaTitle: What is pixel tracking? | Involve Asia Glossary
metaDescription: Pixel tracking uses a small snippet of code loaded on a confirmation page to detect and report a conversion back to the tracking platform.
tldr: Pixel tracking is a method of recording a conversion by loading a small tracking snippet on the page a customer sees after completing a purchase or sign-up. It's one of the two most common ways conversions get reported.
related: postback-url, server-to-server-s2s-tracking, tracking-cookie
---

## What is pixel tracking?

Pixel tracking works by placing a small piece of tracking code on a merchant's confirmation or "thank you" page. When a customer reaches that page after converting, the pixel fires and reports the conversion back to the platform.

## Pixel vs server-to-server tracking

- **Pixel tracking** — runs in the customer's browser, so it can be affected by ad blockers or cookie restrictions.
- **[Server-to-server (S2S) tracking](server-to-server-s2s-tracking)** — sends conversion data directly between servers using a [postback URL](postback-url), without depending on the customer's browser at all.

## Why it matters

Pixel tracking is simple to set up but more exposed to browser-level blocking than server-to-server methods. It relies on the [tracking cookie](tracking-cookie) set at the click stage still being present when the pixel fires, which is one reason some conversions go missing.
