# Redirect Options for 0xadroit.com

## Option 1: Simple index.html (Recommended)

Upload this as `index.html` on 0xadroit.com:

```html
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="refresh" content="0;url=https://wkexl5fef.localto.net/about">
    <script>window.location.replace("https://wkexl5fef.localto.net/about");</script>
</head>
<body>
    <p>Redirecting to <a href="https://wkexl5fef.localto.net/about">0xadroit's secure server</a>...</p>
</body>
</html>
```

## Option 2: Fancy Redirect Page

Use the `redirect.html` file in this public folder - it has Matrix rain animation and hacker aesthetic.

## Option 3: .htaccess (Apache Server)

If 0xadroit.com runs on Apache, add this to `.htaccess`:

```apache
RewriteEngine On
RewriteRule ^(.*)$ https://wkexl5fef.localto.net/about [R=301,L]
```

## Option 4: Nginx Configuration

If using Nginx, add to your server block:

```nginx
server {
    server_name 0xadroit.com www.0xadroit.com;
    return 301 https://wkexl5fef.localto.net/about;
}
```

## Option 5: Cloudflare Page Rules

If using Cloudflare:
1. Go to Rules > Page Rules
2. Add URL: `*0xadroit.com*`
3. Setting: Forwarding URL (301)
4. Destination: `https://wkexl5fef.localto.net/about`

## Option 6: DNS CNAME (if localto supports it)

Point 0xadroit.com CNAME to the localto.net tunnel.

## Option 7: JavaScript Only (Inline)

For any HTML page, add this to `<head>`:

```html
<script>
if (window.location.hostname === '0xadroit.com' || window.location.hostname === 'www.0xadroit.com') {
    window.location.replace('https://wkexl5fef.localto.net/about');
}
</script>
```

---

## Current Tunnel URL
- **Tunnel:** https://wkexl5fef.localto.net
- **About Page:** https://wkexl5fef.localto.net/about
- **Local Port:** 5173
