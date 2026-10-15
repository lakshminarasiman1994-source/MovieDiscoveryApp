
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import MovieCard from '../components/MovieCard';
import colors from '../theme/colors';
import spacing from '../theme/spacing';
import { searchMovies } from '../services/movieService';

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!query.trim()) {
      setMovies([]);
      setError('Enter a movie name to search.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const data = await searchMovies(query.trim());
      setMovies(data);
    } catch (err) {
      console.log('Search API Error:', err.response?.data || err.message);
      setError('Unable to search movies. Please try again.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const renderMovie = ({ item }) => (
    <MovieCard
      movie={item}
      onPress={() =>
        navigation.navigate('MovieDetails', { movieId: item.id })
      }
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Search Movies</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter movie name..."
        placeholderTextColor={colors.textSecondary}
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />

      <Text
        style={styles.searchButton}
        onPress={handleSearch}
      >
        Search
      </Text>

      {loading ? (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={styles.loader}
        />
      ) : error ? (
        <Text style={styles.message}>{error}</Text>
      ) : (
        <FlatList
          data={movies}
          renderItem={renderMovie}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={styles.message}>
              Search for your favourite movies.
            </Text>
          }
          keyboardShouldPersistTaps="handled"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: spacing.lg,
  },
  heading: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  input: {
    backgroundColor: colors.surface,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.sm,
    paddingHorizontal: spacing.md,
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: colors.primary,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    padding: spacing.md,
    borderRadius: spacing.sm,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  loader: {
    marginTop: spacing.xl,
  },
  message: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  list: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  row: {
    justifyContent: 'space-between',
  },
});

export default SearchScreen;
