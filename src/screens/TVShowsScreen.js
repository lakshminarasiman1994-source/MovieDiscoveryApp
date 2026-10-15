
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Keyboard,
} from 'react-native';

import {
  getPopularTVShows,
  searchTVShows,
} from '../services/movieService';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const TVShowsScreen = () => {
  const [shows, setShows] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadPopularShows = async () => {
    try {
      setLoading(true);
      setError('');

      const data = await getPopularTVShows();
      setShows(data);
    } catch (err) {
      setError('Unable to load TV shows. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPopularShows();
  }, []);

  const handleSearch = async () => {
    const searchText = query.trim();

    if (!searchText) {
      loadPopularShows();
      return;
    }

    try {
      Keyboard.dismiss();
      setLoading(true);
      setError('');

      const data = await searchTVShows(searchText);
      setShows(data);

      if (data.length === 0) {
        setError('No TV shows found.');
      }
    } catch (err) {
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderShow = ({ item }) => {
    const poster = item.poster_path
      ? `${IMAGE_BASE_URL}${item.poster_path}`
      : null;

    return (
      <View style={styles.card}>
        {poster ? (
          <Image
            source={{ uri: poster }}
            style={styles.poster}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.poster, styles.placeholder]}>
            <Text style={styles.placeholderText}>No Poster</Text>
          </View>
        )}

        <Text style={styles.title} numberOfLines={2}>
          {item.name || 'Unknown Show'}
        </Text>

        <Text style={styles.rating}>
          ⭐ {Number(item.vote_average || 0).toFixed(1)}
        </Text>

        <Text style={styles.year}>
          {item.first_air_date
            ? item.first_air_date.slice(0, 4)
            : 'Release date N/A'}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>TV Shows</Text>

      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder="Search TV shows..."
          placeholderTextColor="#888"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />

        <Pressable
          style={styles.searchButton}
          onPress={handleSearch}
        >
          <Text style={styles.buttonText}>Search</Text>
        </Pressable>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#E50914"
          style={styles.loader}
        />
      ) : error ? (
        <View style={styles.messageContainer}>
          <Text style={styles.error}>{error}</Text>

          <Pressable
            style={styles.retryButton}
            onPress={
              query.trim() ? handleSearch : loadPopularShows
            }
          >
            <Text style={styles.buttonText}>Retry</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <Text style={styles.subheading}>
            {query.trim() ? 'Search Results' : 'Popular TV Shows'}
          </Text>

          <FlatList
            data={shows}
            renderItem={renderShow}
            keyExtractor={(item) => String(item.id)}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  heading: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchRow: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#242424',
    color: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 46,
  },
  searchButton: {
    backgroundColor: '#E50914',
    borderRadius: 8,
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  subheading: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 14,
  },
  list: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    marginBottom: 20,
  },
  poster: {
    width: '100%',
    height: 230,
    borderRadius: 10,
    backgroundColor: '#242424',
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#AAAAAA',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 8,
  },
  rating: {
    color: '#FFD166',
    marginTop: 5,
  },
  year: {
    color: '#AAAAAA',
    marginTop: 3,
  },
  loader: {
    marginTop: 40,
  },
  messageContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  error: {
    color: '#FF7777',
    textAlign: 'center',
    marginBottom: 12,
  },
  retryButton: {
    backgroundColor: '#E50914',
    padding: 12,
    borderRadius: 8,
  },
});

export default TVShowsScreen;
