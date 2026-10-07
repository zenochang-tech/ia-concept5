# Backup — previous sticky-nav "glass / blur" background style

This is the nav header style **before** it was changed to solid Midnight
(commit `b1020ef`, "Sticky nav: solid Midnight chrome instead of blurred glass").

It lives in the `Nav()` component in **both** `ia-shared.jsx` (inner pages) and
`ia-bundle.jsx` (homepage). The two copies are identical. To restore the glass
look, swap the current code back to the snippets below in **both** files.

> Note: the exact original is also always recoverable from git — e.g.
> `git show b1020ef^:ia-shared.jsx` (the `^` = the commit just before the change).

---

## 1. Header `<header>` style (the glass/blur background)

Current (solid Midnight):

```jsx
const dark = onDark || scrolled || mobile;
...
<header ref={navRef} className={`hdr4${dark ? ' nav-on-dark' : ''}${scrolled ? ' solid' : ''}`} style={{
  position: 'sticky', top: 0, zIndex: 100,
  background: dark ? 'var(--midnight)' : 'transparent',
  backdropFilter: 'none',
  WebkitBackdropFilter: 'none',
  boxShadow: 'none',
  borderBottom: `1px solid ${dark ? 'rgba(255,255,255,.10)' : 'transparent'}`,
  transition: 'background .3s, border-color .3s, box-shadow .3s',
}} onMouseLeave={scheduleClose}>
```

Previous (glass / blur) — restore this:

```jsx
// (remove the `const dark = ...` line)
<header ref={navRef} className={`hdr4${onDark ? ' nav-on-dark' : ''}${scrolled ? ' solid' : ''}`} style={{
  position: 'sticky', top: 0, zIndex: 100,
  background: onDark ? 'rgba(15,28,46,.72)' : ((scrolled || mobile) ? 'rgba(248,250,250,.82)' : 'transparent'),
  backdropFilter: (onDark || scrolled || mobile) ? 'saturate(180%) blur(14px)' : 'none',
  WebkitBackdropFilter: (onDark || scrolled || mobile) ? 'saturate(180%) blur(14px)' : 'none',
  boxShadow: (scrolled && !onDark) ? '0 1px 0 var(--warm-200)' : 'none',
  borderBottom: `1px solid ${onDark ? 'rgba(255,255,255,.10)' : 'transparent'}`,
  transition: 'background .3s, border-color .3s, box-shadow .3s',
}} onMouseLeave={scheduleClose}>
```

## 2. Logo crossfade (the two `<img>` tags in the home link)

Current uses `dark`; previous used `onDark`:

```jsx
// Midnight wordmark — previous:
<img src={R('logoMidnight', ...)} ... style={{ ..., opacity: onDark ? 0 : 1 }} />
// White wordmark — previous:
<img src={R('logoWhite', ...)} ... style={{ ..., opacity: onDark ? 1 : 0 }} />
```

(Current versions use `dark ? 0 : 1` and `dark ? 1 : 0` respectively.)

---

## Behaviour summary

| State | Glass/blur (previous) | Solid Midnight (current) |
|---|---|---|
| Top of page | transparent, dark text | transparent, dark text |
| Scrolled | light glass `rgba(248,250,250,.82)` + blur, dark text | solid `--midnight`, white text/logo |
| Over dark section (`onDark`) | midnight glass `rgba(15,28,46,.72)` + blur, white text | solid `--midnight`, white text/logo |
| Mobile menu open | light glass + blur | solid `--midnight`, white text/logo |

The `nav-on-dark` CSS rules (white link/login/burger colors) are unchanged —
only *when* that class is applied changed (`onDark` → `onDark || scrolled || mobile`).
