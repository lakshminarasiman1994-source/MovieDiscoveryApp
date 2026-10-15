# Movie Discovery App

A React Native mobile application built using the TMDB API to discover movies and explore TV shows. Developed as a practical assignment for Xplor BizConnect - React Native Developer.

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
- JDK compatible with this project's React Native version
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

4. Create `src/config/env.js` and configure your own TMDB Read Access Token:

   ```javascript
   const TMDB_ACCESS_TOKEN = 'YOUR_TMDB_READ_ACCESS_TOKEN';

   export default TMDB_ACCESS_TOKEN;
   ```

   Replace the placeholder with your own token. Do not commit this file or publish your token. It is excluded through `.gitignore`.

## Running the Application

Start Metro:

```bash
npm start
```

In a separate terminal, run the Android application:

```bash
npm run android
```

## Implemented TMDB API Endpoints

1. `GET /trending/movie/day` - Trending movies
2. `GET /movie/popular` - Popular movies
3. `GET /movie/top_rated` - Top-rated movies
4. `GET /movie/now_playing` - Now-playing movies
5. `GET /movie/upcoming` - Upcoming movies
6. `GET /search/movie` - Search movies
7. `GET /movie/{movie_id}` - Movie details
8. `GET /movie/{movie_id}/credits` - Cast and crew
9. `GET /movie/{movie_id}/videos` - Videos and trailers
10. `GET /movie/{movie_id}/similar` - Similar movies
11. `GET /movie/{movie_id}/recommendations` - Recommendations
12. `GET /genre/movie/list` - Movie genres
13. `GET /discover/movie` - Discover movies by genre
14. `GET /tv/popular` - Popular TV shows
15. `GET /search/tv` - Search TV shows

## Project Structure

```text
MovieDiscoveryApp/
|-- App.js
|-- src/
|   |-- config/
|   |   |-- env.js
|   |-- navigation/
|   |-- screens/
|   |-- services/
|   |   |-- api.js
|   |   |-- movieService.js
|   |-- components/
|   |-- theme/
|   |-- utils/
|-- android/
|-- ios/
|-- package.json
|-- .gitignore
|-- README.md
```

## Error Handling

The application provides loading indicators, error messages, retry actions, and fallback poster handling where implemented. Network access and valid TMDB credentials are required.

## API Documentation

TMDB API documentation: https://developer.themoviedb.org/reference/getting-started

## Notes

- Internet access is required for API requests and remote images.
- Configure the TMDB token locally before running the app.
- A token bundled in a React Native application is not truly secret. Never publish a real token in source code or Git history.
## Project Structure

```text
MovieDiscoveryApp/
├── App.js
├── src/
│   ├── components/
│   │   └── MovieCard.js
│   ├── navigation/
│   │   └── AppNavigator.js
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── SearchScreen.js
│   │   ├── ExploreScreen.js
│   │   ├── MovieDetailsScreen.js
│   │   └── TVShowsScreen.js
│   ├── services/
│   │   ├── api.js
│   │   └── movieService.js
│   ├── theme/
│   │   ├── colors.js
│   │   └── spacing.js
│   └── utils/
│       └── imageUtils.js
├── android/
├── ios/
├── package.json
├── package-lock.json
└── README.md
```
