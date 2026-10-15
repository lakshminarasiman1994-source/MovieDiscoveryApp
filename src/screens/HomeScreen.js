import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from 'react-native';

import colors from '../theme/colors';
import spacing from '../theme/spacing';
import MovieCard from '../components/MovieCard';

import {
  getPopularMovies,
  getTrendingMovies,
  getTopratedMovies,
  getNowplayingMovies,
  getUpcomingMovies,
} from '../services/movieService';

const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [playingMovies, setPlayingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  const [loading, setLoading] = useState(true);
  const [trendingLoading, setTrendingLoading] = useState(true);
  const [topLoading, setTopLoading] = useState(true);
  const [nowloading, setNowLoading] = useState(true);
  const [upcomeloading, setUpcomeLoading] = useState(true);

  const [error, setError] = useState('');
  const [trendingError, setTrendingError] = useState('');
  const [topError, setTopError] = useState('');
  const [nowError, setNowError] = useState('');
  const [upcomeError, setUpcomeError] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setError('');

        const data = await getPopularMovies();
        setMovies(data);
      } catch (err) {
        console.log(
          'Popular Movies API Error:',
          err.response?.data || err.message,
        );

        setError('Unable to load popular movies.');
      } finally {
        setLoading(false);
      }
    };

    const fetchTrendingMovies = async () => {
      try {
        setTrendingError('');

        const data = await getTrendingMovies();
        setTrendingMovies(data);
      } catch (err) {
        console.log(
          'Trending Movies API Error:',
          err.response?.data || err.message,
        );

        setTrendingError('Unable to load trending movies.');
      } finally {
        setTrendingLoading(false);
      }
    };

    const fetchTopMovies = async () => {
      try {
        setTopError('');

        const data = await getTopratedMovies();
        setTopMovies(data);
      } catch (err) {
        console.log(
          'Top Rated Movies API Error:',
          err.response?.data || err.message,
        );

        setTopError('Unable to load top-rated movies.');
      } finally {
        setTopLoading(false);
      }
    };

    const fetchNowplayingMovies = async () => {
      try {
        setNowError('');

        const data = await getNowplayingMovies();
        setPlayingMovies(data);
      } catch (err) {
        console.log(
          'Now Playing Movies API Error:',
          err.response?.data || err.message,
        );

        setNowError('Unable to load now-playing movies.');
      } finally {
        setNowLoading(false);
      }
    };

    const fetchUpcomingMovies = async () => {
      try {
        setUpcomeError('');

        const data = await getUpcomingMovies();
        setUpcomingMovies(data);
      } catch (err) {
        console.log(
          'Upcoming Movies API Error:',
          err.response?.data || err.message,
        );

        setUpcomeError('Unable to load upcoming movies.');
      } finally {
        setUpcomeLoading(false);
      }
    };

    fetchMovies();
    fetchTrendingMovies();
    fetchTopMovies();
    fetchNowplayingMovies();
    fetchUpcomingMovies();
  }, []);

  const renderMovie = ({ item }) => (
    <MovieCard
      movie={item}
      onPress={() =>
        navigation.navigate('MovieDetails', {
          movieId: item.id,
        })
      }
    />
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Movie Discovery</Text>

      {/* TRENDING MOVIES */}
      <Text style={styles.subtitle}>Trending Movies</Text>

      {trendingLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="small" color={colors.primary} />
          <Text style={styles.message}>Loading trending movies...</Text>
        </View>
      ) : trendingError ? (
        <View style={styles.center}>
          <Text style={styles.error}>{trendingError}</Text>
        </View>
      ) : (
        <FlatList
          horizontal
          data={trendingMovies}
          renderItem={renderMovie}
          keyExtractor={item => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.movieList}
          nestedScrollEnabled
        />
      )}

      {/* POPULAR MOVIES */}
      <Text style={styles.subtitle}>Popular Movies</Text>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="small" color={colors.primary} />
          <Text style={styles.message}>Loading popular movies...</Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.error}>{error}</Text>
        </View>
      ) : (
        <FlatList
          horizontal
          data={movies}
          renderItem={renderMovie}
          keyExtractor={item => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.movieList}
          nestedScrollEnabled
        />
      )}

      {/* TOP RATED MOVIES */}
      <Text style={styles.subtitle}>Top Rated Movies</Text>

      {topLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="small" color={colors.primary} />
          <Text style={styles.message}>Loading top-rated movies...</Text>
        </View>
      ) : topError ? (
        <View style={styles.center}>
          <Text style={styles.error}>{topError}</Text>
        </View>
      ) : (
        <FlatList
          horizontal
          data={topMovies}
          renderItem={renderMovie}
          keyExtractor={item => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.movieList}
          nestedScrollEnabled
        />
      )}

      {/* NOW PLAYING MOVIES */}
      <Text style={styles.subtitle}>Now Playing Movies</Text>

      {nowloading ? (
        <View style={styles.center}>
          <ActivityIndicator size="small" color={colors.primary} />
          <Text style={styles.message}>Loading now-playing movies...</Text>
        </View>
      ) : nowError ? (
        <View style={styles.center}>
          <Text style={styles.error}>{nowError}</Text>
        </View>
      ) : (
        <FlatList
          horizontal
          data={playingMovies}
          renderItem={renderMovie}
          keyExtractor={item => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.movieList}
          nestedScrollEnabled
        />
      )}

      {/* UPCOMING MOVIES */}
      <Text style={styles.subtitle}>Upcoming Movies</Text>

      {upcomeloading ? (
        <View style={styles.center}>
          <ActivityIndicator size="small" color={colors.primary} />
          <Text style={styles.message}>Loading upcoming movies...</Text>
        </View>
      ) : upcomeError ? (
        <View style={styles.center}>
          <Text style={styles.error}>{upcomeError}</Text>
        </View>
      ) : (
        <FlatList
          horizontal
          data={upcomingMovies}
          renderItem={renderMovie}
          keyExtractor={item => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.movieList}
          nestedScrollEnabled
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },

  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
  },

  center: {
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
  },

  message: {
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },

  error: {
    color: colors.error,
    textAlign: 'center',
  },

  movieList: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
  },
});

export default HomeScreen;
