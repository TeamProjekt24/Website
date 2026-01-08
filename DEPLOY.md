# Deployment Instructions for GitHub

## Step 1: Install Git (if not already installed)

If Git is not installed on your system:
1. Download Git from: https://git-scm.com/download/win
2. Install it with default settings
3. Restart your terminal/command prompt

## Step 2: Push to GitHub Repository

Open PowerShell or Command Prompt in this directory and run these commands:

```powershell
# Navigate to the project directory (if not already there)
cd "c:\Users\flori\Documents\Programmieren\Projekt24Website"

# Initialize git repository (if not already initialized)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Projekt 24 Website"

# Add the remote repository
git remote add origin https://github.com/TeamProjekt24/Website.git

# Set the branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

## Alternative: Using GitHub Desktop

1. Download GitHub Desktop: https://desktop.github.com/
2. Sign in with your GitHub account
3. Click "File" → "Add Local Repository"
4. Select this folder: `c:\Users\flori\Documents\Programmieren\Projekt24Website`
5. Click "Publish repository" and select the `TeamProjekt24/Website` repository

## After Pushing

1. Go to: https://github.com/TeamProjekt24/Website
2. Click "Settings" → "Pages"
3. Under "Source", select branch `main` and folder `/ (root)`
4. Click "Save"
5. Your website will be available at: `https://teamprojekt24.github.io/Website/`
