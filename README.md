# MovieMobileApp 🎬

A sleek and modern mobile application for browsing movies, viewing details, and tracking trending searches.

---

## Features ✨

- **Movie Search**: Search for movies with real-time results.
- **Movie Details**: View comprehensive information about movies, including rating, budget, revenue, and more.
- **Trending Movies**: See what movies are trending based on user searches.
- **Latest Movies**: Browse the latest movie releases.
- **Beautiful UI**: Enjoy a dark-themed, modern interface with smooth animations.

---

## Tech Stack 🛠️

- **Frontend**:
  - [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
  - [Expo Router](https://docs.expo.dev/router/introduction/) for navigation
  - [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native)
  - [React Native Masked View](https://github.com/react-native-masked-view/masked-view) for visual effects

- **Backend**:
  - [Appwrite](https://appwrite.io/) for database and backend services
  - [TMDB API](https://www.themoviedb.org/documentation/api) for movie data

---

## Installation 📲

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/MovieMobileApp.git
   cd MovieMobileApp
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**:
   Create a `.env` file in the root directory with the following:
   ```
   EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_appwrite_project_id
   EXPO_PUBLIC_APPWRITE_DATABASE_ID=your_appwrite_database_id
   EXPO_PUBLIC_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
   EXPO_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
   ```

4. **Start the development server**:
   ```bash
   npx expo start
   ```

---

## Appwrite Setup 🔧

1. Create an Appwrite project.
2. Create a database with a collection for tracking movie searches.
3. The collection should have the following attributes:
   - `searchTerm` (string)
   - `movie_id` (string)
   - `title` (string)
   - `count` (integer)
   - `poster_url` (string)

---

## Usage 📱

1. **Home Screen**: Browse trending and latest movies.
2. **Search**: Tap the search bar and enter a movie title.
3. **Movie Details**: Tap on any movie card to view detailed information.
4. **Navigation**: Use the tab bar to switch between home and search screens.

---

## Screenshots 📸

| Home Screen | Search Screen | Movie Details |
|-------------|---------------|---------------|
| ![Home](https://example.com/home-placeholder.png) | ![Search](https://example.com/search-placeholder.png) | ![Details](https://example.com/details-placeholder.png) |

---

## Project Structure 📁

```
MovieMobileApp/
├── app/                  # Main application screens
│   ├── (tabs)/           # Tab-based screens (index, search)
│   ├── movie/            # Movie detail screens
│   └── _layout.tsx       # Root layout configuration
├── components/           # Reusable components
│   ├── MovieCard.tsx     # Movie card component
│   ├── SearchBar.tsx     # Search input component
│   └── TrendingCard.tsx  # Trending movie card with ranking
├── constants/            # App constants
│   ├── icons.ts          # Icon imports
│   └── images.ts         # Image imports
├── services/             # API and data services
│   ├── api.ts            # TMDB API functions
│   ├── appwrite.ts       # Appwrite database functions
│   └── usefetch.ts       # Custom hook for data fetching
```

---

## Features in Detail 🔍

### Search with Trending Tracking
The app tracks user searches and displays the most searched movies in the trending section. Search data is stored in Appwrite.

### Movie Details
View comprehensive movie details including:
- Poster and title
- Release year and runtime
- Rating and vote count
- Overview
- Genres
- Budget and revenue information
- Production companies

### Custom Components
The app uses several custom components for a consistent UI:
- `MovieCard`: Displays movie posters with rating and year.
- `TrendingCard`: Shows trending movies with a gradient ranking number.
- `SearchBar`: Provides a clean interface for user searches.
- `MovieInfo`: Consistently formats movie information sections.

---

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments 🙏

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the movie data API.
- [Appwrite](https://appwrite.io/) for the backend services.
- [Expo](https://expo.dev/) for making React Native development easier.

---

Built with ❤️ by Thanh Dat Vu