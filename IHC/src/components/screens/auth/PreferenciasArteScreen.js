import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../common/Button';
import Tag from '../../common/Tag';
import { COLORS } from '../../../theme/colors';
import { TYPOGRAPHY } from '../../../theme/typography';
import { SPACING, CONTAINER, BORDER_RADIUS } from '../../../theme/spacing';

const ART_GENRES = [
  { id: 'sacro', label: 'Sacro' },
  { id: 'marinista', label: 'Marinista' },
  { id: 'pop', label: 'Pop' },
  { id: 'land-art', label: 'Land Art' },
  { id: 'audiovisual', label: 'Audiovisual' },
  { id: 'classica', label: 'Clássica' },
  { id: 'contemporanea', label: 'Contemporânea' },
  { id: 'realista', label: 'Realista' },
  { id: 'op-art', label: 'Op Art' },
  { id: 'ecologica', label: 'Ecológica' },
  { id: 'expressionista', label: 'Expressionista' },
  { id: 'abstrata', label: 'Abstrata' },
  { id: 'performance', label: 'Performance' },
  { id: 'impressionista', label: 'Impressionista' },
];

export default function PreferenciasArteScreen({ navigation, route }) {
  const previousData = route.params?.formData || {};

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleGenre = (genreId) => {
    setSelectedGenres(prev => {
      if (prev.includes(genreId)) {
        return prev.filter(id => id !== genreId);
      }
      return [...prev, genreId];
    });
  };

  const handleNext = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigation.navigate('CompletarPerfil', {
        formData: { ...previousData, artPreferences: selectedGenres },
      });
    }, 500);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={COLORS.textPrimary}
          />
        </TouchableOpacity>

        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>
              Vamos se{'\n'}conhecer{'\n'}melhor?
            </Text>
            <Text style={styles.subtitle}>
              Quais tipos de linguagens de arte você gosta?
            </Text>
          </View>

          {/* Tags Grid */}
          <View style={styles.tagsContainer}>
            {ART_GENRES.map((genre) => (
              <Tag
                key={genre.id}
                label={genre.label}
                selected={selectedGenres.includes(genre.id)}
                onPress={() => toggleGenre(genre.id)}
                style={styles.tag}
              />
            ))}
          </View>

          {/* Buttons */}
          <View style={styles.buttons}>
            <Button
              title="Próximo"
              onPress={handleNext}
              loading={loading}
              disabled={selectedGenres.length === 0}
            />
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Já tem cadastro? </Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    flexGrow: 1,
  },
  backButton: {
    padding: SPACING.lg,
    alignSelf: 'flex-start',
  },
  content: {
    flex: 1,
    paddingHorizontal: CONTAINER.paddingHorizontal,
    paddingBottom: SPACING['2xl'],
  },
  header: {
    marginBottom: SPACING.xl,
  },
  title: {
    ...TYPOGRAPHY.h1,
    color: COLORS.primary,
    lineHeight: 44,
    marginBottom: SPACING.md,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: SPACING['2xl'],
  },
  tag: {
    marginRight: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  buttons: {
    marginBottom: SPACING['2xl'],
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  loginText: {
    ...TYPOGRAPHY.body,
    color: COLORS.primary,
    fontWeight: '600',
  },
});
