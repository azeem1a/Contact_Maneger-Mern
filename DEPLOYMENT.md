# Deployment Guide for Contact Management App

This guide will walk you through deploying your **Node.js/Express Backend** to **Render** and your **React/Vite Frontend** to **Vercel** (or Netlify).

## Prerequisites

1.  **GitHub Repository**: Ensure your project is pushed to a GitHub repository.
2.  **Accounts**: Create free accounts on [Render.com](https://render.com) and [Vercel.com](https://vercel.com).
3.  **Database Connection String**: Have your MongoDB Atlas connection string ready (the one currently in your backend `.env` file).

---

## Part 1: Deploy Backend to Render

1.  **Dashboard**: Go to your [Render Dashboard](https://dashboard.render.com).
2.  **New Web Service**: Click **New +** > **Web Service**.
3.  **Connect GitHub**: Select "Build and deploy from a Git repository" and choose your `contact-management-app` repo.
4.  **Configure Service**:
    *   **Name**: `contact-app-backend` (or similar)
    *   **Region**: Choose the one closest to you (e.g., Frankfurt, Singapore, Ohio).
    *   **Branch**: `main` (or master).
    *   **Root Directory**: `backend` (Important! This tells Render where the backend code lives).
    *   **Runtime**: `Node`
    *   **Build Command**: `npm install`
    *   **Start Command**: `npm start`
5.  **Environment Variables**:
    *   Scroll down to **Environment Variables**.
    *   Add Key: `MONGO_URI`
    *   Add Value: Paste your actual MongoDB connection string (e.g., `mongodb+srv://...`).
    *   *(Optional)* `NODE_ENV` = `production`
6.  **Deploy**: Click **Create Web Service**.
7.  **Wait**: Validation and deployment will take a few minutes.
8.  **Copy URL**: Once live, copy the URL at the top left (e.g., `https://contact-app-backend.onrender.com`). **You will need this for the frontend.**

---

## Part 2: Deploy Frontend to Vercel

1.  **Dashboard**: Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2.  **Add New**: Click **Add New...** > **Project**.
3.  **Import Git Repository**: Find your repo and click **Import**.
4.  **Configure Project**:
    *   **Framework Preset**: Select `Vite`.
    *   **Root Directory**: Click "Edit" and select the `frontend` folder.
5.  **Environment Variables**:
    *   Click to expand **Environment Variables**.
    *   **Key**: `VITE_API_URL`
    *   **Value**: The **Render Backend URL** you copied in Part 1 (e.g., `https://contact-app-backend.onrender.com/api`).
    *   *Note: Make sure to add `/api` at the end if your backend routes are prefixed with it.*
6.  **Deploy**: Click **Deploy**.
7.  **Finalize**: Vercel will build your project. Once done, you will get a live URL (e.g., `https://contact-app-frontend.vercel.app`).

---

## Verification

1.  Open your new **Vercel URL**.
2.  Try to **Add a Contact**.
3.  If it works, congratulations! Your full-stack app is live.

### Troubleshooting
*   **CORS Error**: I have updated the code to explicitly allow your Netlify domain. However, if this persists, it is likely that **the backend is crashing**.
*   **Backend Crashing (Important)**:
    *   **MongoDB IP Whitelist**: Go to your MongoDB Atlas Network Access. Add IP Address `0.0.0.0/0` (Allow Access from Anywhere). Render servers have dynamic IPs, so you must whitelist all IPs.
    *   **Check Render Logs**: Go to your Render Dashboard > specific service > Logs. If you see "MongoNetworkError" or "Authentication failed", checking your `MONGO_URI` and IP whitelist is the solution.
*   **404 Errors**: Ensure your `VITE_API_URL` in Vercel includes `/api` if that's how your backend is structured.
