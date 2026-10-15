
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import {
  getMovieGenres,
  discoverMoviesByGenre,
} from '../services/movieService';

import MovieCard from '../components/MovieCard';

const ExploreScreen = ({ navigation }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [moviesLoading, setMoviesLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadGenres();
  }, []);

  const loadGenres = async () => {
    try {
      setLoading(true);
      setError('');

      const data = await getMovieGenres();
      setGenres(data);
    } catch (err) {
      setError('Unable to load genres. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenrePress = async (genre) => {
    if (selectedGenre === genre.id) {
      setSelectedGenre(null);
      setMovies([]);
      return;
    }

    try {
      setSelectedGenre(genre.id);
      setMoviesLoading(true);
      setMovies([]);

      const data = await discoverMoviesByGenre(genre.id);
      setMovies(data);
    } catch (err) {
      setMovies([]);
      setError('Unable to load movies. Please try again.');
    } finally {
      setMoviesLoading(false);
    }
  };

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
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Explore</Text>
      <Text style={styles.subtitle}>
        Discover movies by genre
      </Text>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#E50914"
          style={styles.loader}
        />
      ) : error && genres.length === 0 ? (
        <Pressable onPress={loadGenres}>
          <Text style={styles.errorText}>{error}</Text>
          <Text style={styles.retryText}>Tap to retry</Text>
        </Pressable>
      ) : (
        <>
          <Text style={styles.sectionTitle}>Movie Genres</Text>

          <FlatList
            data={genres}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={styles.genreList}
            renderItem={({ item }) => {
              const isSelected = selectedGenre === item.id;

              return (
                <Pressable
                  style={[
                    styles.genreChip,
                    isSelected && styles.selectedChip,
                  ]}
                  onPress={() => handleGenrePress(item)}
                >
                  <Text
                    style={[
                      styles.genreText,
                      isSelected && styles.selectedText,
                    ]}
                  >
                    {item.name}
                  </Text>
                </Pressable>
              );
            }}
          />

          <View style={styles.movieHeadingRow}>
            <Text style={styles.sectionTitle}>
              {genres.find((item) => item.id === selectedGenre)?.name ||
                'Select a Genre'}
            </Text>
            {selectedGenre !== null && (
              <Pressable
                onPress={() => {
                  setSelectedGenre(null);
                  setMovies([]);
                  setError('');
                }}
              >
                <Text style={styles.clearText}>Clear</Text>
              </Pressable>
            )}
          </View>

          {moviesLoading ? (
            <ActivityIndicator
              size="large"
              color="#E50914"
              style={styles.loader}
            />
          ) : error ? (
            <Pressable onPress={() => {
              const genre = genres.find(
                (item) => item.id === selectedGenre
              );
              if (genre) handleGenrePress({ ...genre, id: null });
              if (genre) {
                setSelectedGenre(null);
                handleGenrePress(genre);
              }
            }}>
              <Text style={styles.errorText}>{error}</Text>
              <Text style={styles.retryText}>Tap to retry</Text>
            </Pressable>
          ) : movies.length > 0 ? (
            <FlatList
              data={movies}
              horizontal
              renderItem={renderMovie}
              keyExtractor={(item) => String(item.id)}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.movieList}
            />
          ) : (
            <Text style={styles.emptyText}>
              Select a genre to discover movies.
            </Text>
          )}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
    paddingTop: 24,
  },
  heading: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginHorizontal: 18,
  },
  subtitle: {
    color: '#AAAAAA',
    fontSize: 14,
    marginHorizontal: 18,
    marginTop: 6,
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '600',
    marginLeft: 18,
    marginBottom: 14,
  },
  genreList: {
    paddingHorizontal: 18,
    paddingBottom: 24,
  },
  genreChip: {
    backgroundColor: '#202020',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 11,
    marginRight: 10,
  },
  selectedChip: {
    backgroundColor: '#E50914',
    borderColor: '#E50914',
  },
  genreText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  selectedText: {
    fontWeight: 'bold',
  },
  movieHeadingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 18,
  },
  clearText: {
    color: '#E50914',
    marginBottom: 14,
  },
  movieList: {
    paddingHorizontal: 18,
    paddingBottom: 24,
  },
  loader: {
    marginVertical: 30,
  },
  errorText: {
    color: '#FF7777',
    marginHorizontal: 18,
  },
  retryText: {
    color: '#E50914',
    margin: 18,
  },
  emptyText: {
    color: '#AAAAAA',
    marginHorizontal: 18,
    marginBottom: 24,
  },
});

export default ExploreScreen;
