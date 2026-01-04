# 🚀 Deploying CTI Blog to Hostinger

This guide will walk you through deploying your Next.js CTI Blog to Hostinger shared hosting.

## Prerequisites

- A Hostinger account with an active hosting plan
- A domain name (either from Hostinger or pointed to Hostinger's nameservers)
- FTP client (FileZilla recommended) or access to Hostinger's File Manager

---

## Step 1: Build Your Project for Static Export

Build the static version of your site for Hostinger:

```bash
npm run build:static
```

This generates static HTML files in the `out/` folder. Note: Use `build:static` (not `build`) for Hostinger, as it enables static export mode.

---

## Step 2: Access Hostinger File Manager

1. Log in to your [Hostinger hPanel](https://hpanel.hostinger.com/)
2. Click on **Hosting** in the left sidebar
3. Select your hosting plan
4. Click on **File Manager** (or use FTP)

---

## Step 3: Upload Files to Hostinger

### Option A: Using Hostinger File Manager (Recommended for beginners)

1. Navigate to **File Manager** in hPanel
2. Go to the `public_html` folder (this is your web root)
3. **Delete** or backup any existing files in `public_html`
4. Click **Upload Files** button (top-right)
5. Upload **all contents** from your local `out/` folder:
   - `index.html`
   - `404.html`
   - `.htaccess`
   - `_next/` folder
   - `about/` folder
   - `blog/` folder
   - `tags/` folder
   - All other files and folders

### Option B: Using FTP (FileZilla)

1. Download FileZilla from [https://filezilla-project.org/](https://filezilla-project.org/)

2. Get your FTP credentials from Hostinger:
   - Go to hPanel → **Files** → **FTP Accounts**
   - Note down: Host, Username, Password, Port (usually 21)

3. Connect to your server:
   - Open FileZilla
   - Enter your FTP credentials
   - Click **Quickconnect**

4. Upload files:
   - On the left panel (Local), navigate to your `out/` folder
   - On the right panel (Remote), navigate to `public_html`
   - Select all files in `out/` and drag them to `public_html`

### Option C: Using ZIP Upload (Fastest method)

1. Compress the `out` folder contents into a ZIP file:
   ```bash
   cd out
   # On Windows (PowerShell):
   Compress-Archive -Path * -DestinationPath ../cti-blog-deploy.zip
   
   # On Mac/Linux:
   zip -r ../cti-blog-deploy.zip .
   ```

2. Upload `cti-blog-deploy.zip` to `public_html` via File Manager

3. Right-click the ZIP file in File Manager and select **Extract**

4. Delete the ZIP file after extraction

---

## Step 4: Configure SSL (HTTPS)

1. In hPanel, go to **SSL** section
2. Click **Setup** for your domain
3. Enable **Free SSL** (Let's Encrypt)
4. Wait for SSL to be activated (usually 5-10 minutes)

5. After SSL is active, edit the `.htaccess` file in `public_html`:
   - Uncomment the HTTPS redirect lines:
   ```apache
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```

---

## Step 5: Verify Deployment

1. Visit your domain: `https://yourdomain.com`
2. Test all pages:
   - Home page: `https://yourdomain.com/`
   - Blog page: `https://yourdomain.com/blog/`
   - About page: `https://yourdomain.com/about/`
   - Tags page: `https://yourdomain.com/tags/`
   - Individual posts: `https://yourdomain.com/blog/sliver-rat-threat-intelligence/`

---

## Troubleshooting

### 404 Errors on Pages

Make sure the `.htaccess` file was uploaded correctly. Check that it contains the `ErrorDocument 404 /404.html` line.

### CSS/JS Not Loading

1. Clear your browser cache (Ctrl+Shift+R or Cmd+Shift+R)
2. Verify that the `_next/` folder was uploaded completely
3. Check browser console for any errors (F12 → Console tab)

### Blank Page

1. Check if `index.html` exists in `public_html`
2. Verify file permissions are 644 for files and 755 for folders

### Images Not Showing

1. Ensure the `public/` folder contents were included
2. Check image paths in browser developer tools

---

## Updating Your Site

When you make changes to your blog:

1. Run `npm run build` locally
2. Upload the new `out/` folder contents to `public_html` (overwrite existing files)

---

## Performance Tips

1. **Enable Hostinger Cache**: 
   - hPanel → **Advanced** → **Cache Manager** → Enable

2. **Use Cloudflare (Optional)**:
   - Sign up at [cloudflare.com](https://cloudflare.com)
   - Add your domain and update nameservers
   - Enable caching and security features

---

## File Structure on Hostinger

After upload, your `public_html` should look like:

```
public_html/
├── .htaccess
├── index.html
├── 404.html
├── _next/
│   └── static/
│       ├── chunks/
│       ├── css/
│       └── media/
├── about/
│   └── index.html
├── blog/
│   ├── index.html
│   └── sliver-rat-threat-intelligence/
│       └── index.html
└── tags/
    ├── index.html
    ├── sliver/
    ├── rat/
    ├── c2/
    └── ...
```

---

## Need Help?

- Hostinger Support: [support.hostinger.com](https://support.hostinger.com)
- Next.js Static Export Docs: [nextjs.org/docs/app/building-your-application/deploying/static-exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)

---

**Happy Hosting! 🎉**
