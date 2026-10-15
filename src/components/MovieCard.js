
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';

import colors from '../theme/colors';
import spacing from '../theme/spacing';
import { getPosterUrl } from '../utils/imageUtils';

const MovieCard = ({ movie, onPress }) => {
  const posterUrl = getPosterUrl(movie?.poster_path);

  return (
    <Pressable
      style={styles.container}
      onPress={onPress}
    >
      {posterUrl ? (
        <Image
          source={{ uri: posterUrl }}
          style={styles.poster}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.posterPlaceholder}>
          <Text style={styles.placeholderText}>
            No Poster
          </Text>
        </View>
      )}

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {movie?.title || 'Unknown Movie'}
        </Text>

        <Text style={styles.rating}>
          ⭐ {Number(movie?.vote_average || 0).toFixed(1)}
        </Text>
      </View>
    </Pressable>
  );
};


const styles = StyleSheet.create({
  container: {
    width: 145,
    marginRight: spacing.md,
    borderRadius: spacing.sm,
    overflow: 'hidden',
  },

  poster: {
    width: 145,
    height: 200,
    backgroundColor: colors.border,
  },

  posterPlaceholder: {
    width: 145,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.border,
  },

  placeholderText: {
    color: colors.textSecondary,
    fontSize: 12,
  },

  info: {
    width: '100%',
    padding: spacing.sm,
  },

  title: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: 'bold',
    minHeight: 36,
  },

  rating: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: spacing.sm,
  },
});

export default MovieCard;
