
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Linking,
  Pressable,
  FlatList,
} from 'react-native';

import colors from '../theme/colors';
import spacing from '../theme/spacing';
import MovieCard from '../components/MovieCard';

import {
  getMovieDetails,
  getMovieCredits,
  getMovieVideos,
  getSimilarMovies,
  getMovieRecommendations,
} from '../services/movieService';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

const MovieDetailsScreen = ({ route, navigation }) => {
  const { movieId } = route.params;

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [videos, setVideos] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    const fetchMovieData = async () => {
      try {
        setLoading(true);
        setError('');

        const [
          movieData,
          creditsData,
          videoData,
          similarData,
          recommendationsData,
        ] = await Promise.all([
          getMovieDetails(movieId),
          getMovieCredits(movieId),
          getMovieVideos(movieId),
          getSimilarMovies(movieId),
          getMovieRecommendations(movieId),
        ]);

        if (!active) {
          return;
        }

        setMovie(movieData);
        setCast(creditsData.cast || []);
        setCrew(creditsData.crew || []);
        setVideos(videoData || []);
        setSimilarMovies(similarData || []);
        setRecommendedMovies(recommendationsData || []);
      } catch (err) {
        console.log(
          'Movie Details API Error:',
          err.response?.data || err.message,
        );

        if (active) {
          setError('Unable to load movie details. Please try again.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchMovieData();

    return () => {
      active = false;
    };
  }, [movieId]);

  const openTrailer = async key => {
    try {
      await Linking.openURL(`https://www.youtube.com/watch?v=${key}`);
    } catch (err) {
      console.log('Unable to open trailer:', err.message);
    }
  };

  const openMovie = id => {
    navigation.push('MovieDetails', { movieId: id });
  };

  const renderPerson = ({ item }) => (
    <View style={styles.personCard}>
      {item.profile_path ? (
        <Image
          source={{
            uri: `${IMAGE_BASE_URL}w185${item.profile_path}`,
          }}
          style={styles.personImage}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.personImage, styles.placeholder]}>
          <Text style={styles.placeholderText}>No Image</Text>
        </View>
      )}

      <Text style={styles.personName} numberOfLines={2}>
        {item.name}
      </Text>

      <Text style={styles.personRole} numberOfLines={2}>
        {item.character || item.job || 'Not available'}
      </Text>
    </View>
  );

  const renderCrew = ({ item }) => (
    <View style={styles.crewCard}>
      <Text style={styles.personName} numberOfLines={2}>
        {item.name}
      </Text>
      <Text style={styles.personRole} numberOfLines={2}>
        {item.job}
      </Text>
    </View>
  );

  const renderTrailer = ({ item }) => (
    <Pressable
      style={styles.trailerCard}
      onPress={() => openTrailer(item.key)}
    >
      <View style={styles.playButton}>
        <Text style={styles.playIcon}>▶</Text>
      </View>
      <Text style={styles.trailerName} numberOfLines={2}>
        {item.name}
      </Text>
      <Text style={styles.personRole}>
        {item.type}
        {item.official ? ' • Official' : ''}
      </Text>
    </Pressable>
  );

  const renderMovie = ({ item }) => (
    <MovieCard
      movie={item}
      onPress={() => openMovie(item.id)}
    />
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.message}>Loading movie details...</Text>
      </View>
    );
  }

  if (error || !movie) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>
          {error || 'Movie details not found.'}
        </Text>

        <Pressable
          style={styles.retryButton}
          onPress={() => navigation.replace('MovieDetails', { movieId })}
        >
          <Text style={styles.retryText}>Try Again</Text>
        </Pressable>
      </View>
    );
  }

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}w500${movie.poster_path}`
    : null;

  const backdropUrl = movie.backdrop_path
    ? `${IMAGE_BASE_URL}w1280${movie.backdrop_path}`
    : null;

  const releaseYear = movie.release_date
    ? movie.release_date.substring(0, 4)
    : 'Year unavailable';

  const runtime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : 'Runtime unavailable';

  const genres = movie.genres?.map(item => item.name).join(' • ');

  const importantCrew = crew
    .filter(item =>
      ['Director', 'Writer', 'Screenplay', 'Producer'].includes(item.job),
    )
    .filter(
      (item, index, list) =>
        list.findIndex(
          other => other.id === item.id && other.job === item.job,
        ) === index,
    )
    .slice(0, 12);

  const trailerVideos = videos
    .filter(item => item.site === 'YouTube' && item.key)
    .slice(0, 10);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {backdropUrl ? (
        <Image
          source={{ uri: backdropUrl }}
          style={styles.backdrop}
          resizeMode="cover"
        />
      ) : null}

      <View style={styles.header}>
        {posterUrl ? (
          <Image
            source={{ uri: posterUrl }}
            style={styles.poster}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.poster, styles.placeholder]}>
            <Text style={styles.placeholderText}>No Poster</Text>
          </View>
        )}

        <View style={styles.movieInfo}>
          <Text style={styles.title}>{movie.title}</Text>

          <Text style={styles.rating}>
            ⭐ {Number(movie.vote_average || 0).toFixed(1)} / 10
          </Text>

          <Text style={styles.meta}>{releaseYear}</Text>
          <Text style={styles.meta}>{runtime}</Text>
          <Text style={styles.meta}>
            {movie.status || 'Unknown status'}
          </Text>

          {movie.original_language ? (
            <Text style={styles.meta}>
              Language: {movie.original_language.toUpperCase()}
            </Text>
          ) : null}
        </View>
      </View>

      {genres ? <Text style={styles.genres}>{genres}</Text> : null}

      {movie.tagline ? (
        <Text style={styles.tagline}>{movie.tagline}</Text>
      ) : null}

      <Text style={styles.sectionTitle}>Overview</Text>
      <Text style={styles.overview}>
        {movie.overview || 'Overview is not available.'}
      </Text>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Votes</Text>
          <Text style={styles.statValue}>
            {(movie.vote_count || 0).toLocaleString()}
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Budget</Text>
          <Text style={styles.statValue}>
            {movie.budget
              ? `$${(movie.budget / 1000000).toFixed(1)}M`
              : 'N/A'}
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Revenue</Text>
          <Text style={styles.statValue}>
            {movie.revenue
              ? `$${(movie.revenue / 1000000).toFixed(1)}M`
              : 'N/A'}
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Top Cast</Text>
      {cast.length > 0 ? (
        <FlatList
          horizontal
          data={cast.slice(0, 15)}
          renderItem={renderPerson}
          keyExtractor={(item, index) =>
            `${item.credit_id || item.id}-${index}`
          }
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled
          contentContainerStyle={styles.horizontalList}
        />
      ) : (
        <Text style={styles.message}>Cast information unavailable.</Text>
      )}

      <Text style={styles.sectionTitle}>Crew</Text>
      {importantCrew.length > 0 ? (
        <FlatList
          horizontal
          data={importantCrew}
          renderItem={renderCrew}
          keyExtractor={(item, index) =>
            `${item.credit_id || item.id}-${item.job}-${index}`
          }
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled
          contentContainerStyle={styles.horizontalList}
        />
      ) : (
        <Text style={styles.message}>Crew information unavailable.</Text>
      )}

      <Text style={styles.sectionTitle}>Videos & Trailers</Text>
      {trailerVideos.length > 0 ? (
        <FlatList
          horizontal
          data={trailerVideos}
          renderItem={renderTrailer}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled
          contentContainerStyle={styles.horizontalList}
        />
      ) : (
        <Text style={styles.message}>No videos available.</Text>
      )}

      <Text style={styles.sectionTitle}>Similar Movies</Text>
      {similarMovies.length > 0 ? (
        <FlatList
          horizontal
          data={similarMovies.slice(0, 15)}
          renderItem={renderMovie}
          keyExtractor={item => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled
          contentContainerStyle={styles.horizontalList}
        />
      ) : (
        <Text style={styles.message}>No similar movies available.</Text>
      )}

      <Text style={styles.sectionTitle}>Recommended Movies</Text>
      {recommendedMovies.length > 0 ? (
        <FlatList
          horizontal
          data={recommendedMovies.slice(0, 15)}
          renderItem={renderMovie}
          keyExtractor={item => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled
          contentContainerStyle={styles.horizontalList}
        />
      ) : (
        <Text style={styles.message}>
          No recommended movies available.
        </Text>
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
    paddingBottom: spacing.xl,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  backdrop: {
    width: '100%',
    height: 190,
    backgroundColor: colors.surface,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  poster: {
    width: 118,
    height: 172,
    borderRadius: spacing.sm,
    backgroundColor: colors.surface,
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: colors.textSecondary,
    fontSize: 11,
    textAlign: 'center',
  },
  movieInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  rating: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  meta: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  genres: {
    fontSize: 13,
    color: colors.primary,
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
  },
  tagline: {
    fontSize: 14,
    fontStyle: 'italic',
    color: colors.textSecondary,
    marginHorizontal: spacing.md,
    marginTop: spacing.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginHorizontal: spacing.md,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  overview: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSecondary,
    marginHorizontal: spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    padding: spacing.sm,
    borderRadius: spacing.sm,
    backgroundColor: colors.surface,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  statValue: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  horizontalList: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xs,
  },
  personCard: {
    width: 112,
    marginRight: spacing.sm,
    borderRadius: spacing.sm,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    paddingBottom: spacing.sm,
  },
  personImage: {
    width: '100%',
    height: 125,
    backgroundColor: colors.border,
  },
  personName: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: 'bold',
    marginHorizontal: spacing.sm,
    marginTop: spacing.sm,
  },
  personRole: {
    color: colors.textSecondary,
    fontSize: 11,
    marginHorizontal: spacing.sm,
    marginTop: spacing.xs,
  },
  crewCard: {
    width: 135,
    minHeight: 90,
    marginRight: spacing.sm,
    padding: spacing.md,
    borderRadius: spacing.sm,
    backgroundColor: colors.surface,
    justifyContent: 'center',
  },
  trailerCard: {
    width: 165,
    minHeight: 110,
    marginRight: spacing.sm,
    padding: spacing.md,
    borderRadius: spacing.sm,
    backgroundColor: colors.surface,
    justifyContent: 'center',
  },
  playButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  playIcon: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  trailerName: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: 'bold',
  },
  message: {
    color: colors.textSecondary,
    fontSize: 13,
    marginHorizontal: spacing.md,
    marginTop: spacing.xs,
  },
  error: {
    color: colors.error,
    fontSize: 15,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: spacing.sm,
    marginTop: spacing.md,
  },
  retryText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default MovieDetailsScreen;
