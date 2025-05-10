# 🎬 Movie Explorer

A responsive and interactive Movie Explorer web app built with **React**, **Vite**, and **Material UI**. This app allows users to browse trending movies, search for titles, view detailed movie information, and manage a list of favorite movies using local storage.

---

## 🌐 Live Demo

> 🔗 _Coming soon_ — you can deploy using Vercel, Netlify, or GitHub Pages.

---

## 📸 Screenshots

> Add screenshots here (UI: trending page, search, favorites page)

---

## 🧰 Tech Stack

- ⚛️ **React** – UI Library
- ⚡ **Vite** – Build tool for fast development
- 🎨 **Material UI** – Pre-built responsive UI components
- 🌐 **React Router DOM** – Client-side routing
- 📡 **Axios** – API requests
- 💅 **Emotion** – Styling for Material UI components
- 🎞 **TMDb API** – Movie data source

---

## 🚀 Features

### 🔍 Movie Search
- Real-time search with debouncing (if added)
- Fuzzy matching for partial titles

### 📊 Trending Movies
- Landing page shows trending or popular movies from TMDb

### 🧾 Movie Details Page
- Detailed view of the movie including:
  - Poster
  - Overview
  - Release year
  - Ratings (with colored badges)
  - Link to TMDb page (optional)

### ❤️ Favorites Management
- Add/remove movies from favorites
- Favorites stored in `localStorage`
- Toast/snackbar feedback for user actions

### 📱 Responsive Design
- Optimized for mobile and desktop
- Uses Material UI breakpoints

---

## 🔑 TMDb API Setup

You need an API key from **The Movie Database (TMDb)** to fetch data.

1. Go to [TMDb Developer](https://www.themoviedb.org/settings/api) and sign in/register.
2. Apply for an API key.
3. Create a `.env` file in the root directory of your project:

```bash
# .env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
