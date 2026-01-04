# 🚀 Deploying CTI Blog to Vercel via GitHub

This guide will walk you through pushing your project to GitHub and deploying it to Vercel.

---

## Prerequisites

- Git installed on your computer ([Download Git](https://git-scm.com/downloads))
- A GitHub account ([Sign up](https://github.com/signup))
- A Vercel account ([Sign up with GitHub](https://vercel.com/signup))

---

## Step 1: Install Git (if not installed)

1. Download Git from [https://git-scm.com/downloads](https://git-scm.com/downloads)
2. Run the installer with default options
3. **Important**: During installation, select "Git from the command line and also from 3rd-party software"
4. Restart your terminal/VS Code after installation

Verify installation:
```bash
git --version
```

---

## Step 2: Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `cti-blog` (or your preferred name)
3. Description: `Professional Cybersecurity Threat Intelligence Blog`
4. Select **Public** or **Private**
5. **Do NOT** check "Add a README file" (we already have one)
6. Click **Create repository**
7. Copy the repository URL (e.g., `https://github.com/YOUR_USERNAME/cti-blog.git`)

---

## Step 3: Push Code to GitHub

Open a terminal in your project directory and run these commands:

```bash
# Initialize Git repository (if not already done)
git init

# Add all files to staging
git add .

# Create initial commit
git commit -m "Initial commit: CTI Blog with Next.js"

# Add GitHub as remote origin (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/cti-blog.git

# Push to GitHub
git branch -M main
git push -u origin main
```

If prompted for credentials:
- **Username**: Your GitHub username
- **Password**: Use a [Personal Access Token](https://github.com/settings/tokens) (not your password)

---

## Step 4: Deploy to Vercel

### Option A: Import from GitHub (Recommended)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import Git Repository**
3. Select your GitHub account
4. Find and select `cti-blog` repository
5. Vercel will auto-detect Next.js settings
6. Click **Deploy**
7. Wait for deployment (usually 1-2 minutes)
8. Your site is live! 🎉

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy from project directory
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No
# - Project name? cti-blog
# - Directory? ./
# - Override settings? No
```

---

## Step 5: Configure Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click **Settings** → **Domains**
3. Add your custom domain
4. Follow the DNS configuration instructions
5. Vercel will automatically provision SSL

---

## Automatic Deployments

After the initial setup:
- Every push to `main` branch triggers automatic deployment
- Pull requests get preview deployments
- Vercel handles builds automatically

---

## Vercel Features You Get

✅ **Server-Side Rendering (SSR)** - Unlike static hosting  
✅ **Automatic HTTPS** - SSL certificates included  
✅ **Global CDN** - Fast delivery worldwide  
✅ **Preview Deployments** - Test PRs before merging  
✅ **Analytics** - Built-in web analytics (optional)  
✅ **Edge Functions** - If you add API routes later  

---

## Updating Your Site

Simply push changes to GitHub:

```bash
git add .
git commit -m "Update: description of changes"
git push
```

Vercel automatically rebuilds and deploys!

---

## Environment Variables (if needed)

1. Go to Vercel Project → **Settings** → **Environment Variables**
2. Add any variables your app needs
3. Redeploy for changes to take effect

---

## Build Commands (Reference)

| Command | Use Case |
|---------|----------|
| `npm run build` | Vercel deployment (standard Next.js) |
| `npm run build:static` | Hostinger/static hosting (exports to `out/`) |

---

## Troubleshooting

### Build Fails on Vercel

1. Check the build logs in Vercel dashboard
2. Ensure all dependencies are in `package.json`
3. Test locally with `npm run build`

### Git Push Rejected

```bash
# Pull remote changes first
git pull origin main --rebase
git push
```

### Authentication Issues

Create a Personal Access Token:
1. GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token with `repo` scope
3. Use this token as your password when pushing

---

## Useful Links

- Vercel Dashboard: [vercel.com/dashboard](https://vercel.com/dashboard)
- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Next.js on Vercel: [vercel.com/docs/frameworks/nextjs](https://vercel.com/docs/frameworks/nextjs)

---

**Happy Deploying! 🎉**
