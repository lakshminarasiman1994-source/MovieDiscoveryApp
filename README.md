# Movie Discovery App

A React Native mobile application built using the TMDB API to discover movies and explore TV shows. Developed as a practical assignment for **Xplor BizConnect — React Native Developer**.

## Features

- Browse trending and popular movies.
- Explore top-rated, now-playing, and upcoming movies.
- Search movies by title.
- Explore movies by genre.
- View movie details, ratings, overview, cast, crew, and videos.
- Discover similar and recommended movies.
- Browse popular TV shows and search for TV shows.
- Reusable movie cards and organized screen components.
- Loading indicators and error handling with retry options.
- Bottom-tab navigation and movie-detail navigation.

## Technology Stack

- React Native
- JavaScript
- Axios
- React Navigation
- TMDB API
- Git and GitHub

## Prerequisites

- Node.js and npm
- Android Studio and Android SDK for Android development
- JDK version compatible with the React Native version used by this project
- A TMDB account and API Read Access Token

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/lakshminarasiman1994-source/MovieDiscoveryApp.git
   ```

2. Navigate to the project directory:

   ```bash
   cd MovieDiscoveryApp
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Configure the TMDB API Read Access Token locally. Create the file `src/config/env.js` and export your own token:

   ```javascript
   const TMDB_ACCESS_TOKEN = 'YOUR_TMDB_READ_ACCESS_TOKEN';

   export default TMDB_ACCESS_TOKEN;
   ```

   Replace the placeholder with your own TMDB Read Access Token. **Do not commit this file or publish your token.** The file is excluded through `.gitignore`.

## Running the Application

Start the Metro bundler:

```bash
npm start
```

In a separate terminal, run the Android application:

```bash
npm run android
```

Alternatively, open the Android project in Android Studio and run it on an emulator or connected Android device.

The first Android build may take additional time while Gradle downloads dependencies.

## Implemented TMDB API Endpoints

The application uses the following TMDB API endpoints:

1. `GET /trending/movie/day` — Trending movies
2. `GET /movie/popular` — Popular movies
3. `GET /movie/top_rated` — Top-rated movies
4. `GET /movie/now_playing` — Movies currently in theatres
5. `GET /movie/upcoming` — Upcoming movies
6. `GET /search/movie` — Search movies
7. `GET /movie/{movie_id}` — Movie details
8. `GET /movie/{movie_id}/credits` — Cast and crew
9. `GET /movie/{movie_id}/videos` — Movie videos and trailers
10. `GET /movie/{movie_id}/similar` — Similar movies
11. `GET /movie/{movie_id}/recommendations` — Recommended movies
12. `GET /genre/movie/list` — Movie genres
13. `GET /discover/movie` — Discover movies by genre
14. `GET /tv/popular` — Popular TV shows
15. `GET /search/tv` — Search TV shows

## Project Structure

```text
MovieDiscoveryApp/
├── App.js
├── src/
│   ├── config/
│   │   └── env.js             # Local credentials; not committed
│   ├── navigation/
│   ├── screens/
│   ├── services/
│   │   ├── api.js
│   │   └── movieService.js
│   ├── components/
│   ├── theme/
│   └── utils/
├── android/
├── ios/
├── package.json
├── .gitignore
└── README.md
```

## Error Handling

The application includes loading indicators, error messages, retry actions, and fallback poster handling in relevant screens. Network connectivity and valid TMDB credentials are required to retrieve live data.

## API Documentation

TMDB API documentation: https://developer.themoviedb.org/reference/getting-started

## Notes

- Internet access is required for API requests and remote images.
- The TMDB Read Access Token must be configured locally before running the application.
- A token included in a React Native application bundle is not truly secret. Never publish a real token in source code or Git history.
