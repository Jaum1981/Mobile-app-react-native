import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MainHeader from '../../common/MainHeader';
import TabHeader from '../../common/TabHeader';
import { COLORS, SHADOWS } from '../../../theme/colors';
import { TYPOGRAPHY } from '../../../theme/typography';
import { SPACING, BORDER_RADIUS } from '../../../theme/spacing';

const TABS = [
  { key: 'timeline', label: 'Timeline' },
  { key: 'exposicoes', label: 'Exposições' },
  { key: 'blog', label: 'Blog' },
];

async function fetchMetObjectIds() {
  const searchUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=art';
  const res = await fetch(searchUrl);
  const json = await res.json();
  return Array.isArray(json?.objectIDs) ? json.objectIDs : [];
}

async function fetchMetObjects(ids = []) {
  const detailPromises = ids.map((id) =>
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`).then((r) => r.json())
  );
  const details = await Promise.all(detailPromises);
  return details
    .filter((item) => item?.primaryImageSmall)
    .map((item) => ({
      id: String(item.objectID),
      title: item.title || 'Obra sem título',
      image: item.primaryImageSmall,
      artist: item.artistDisplayName || 'Artista não informado',
    }));
}

export default function ExposicoesScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('exposicoes');
  const [refreshing, setRefreshing] = useState(false);
  const [featured, setFeatured] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(false);
  const [objectIds, setObjectIds] = useState([]);
  const [cursor, setCursor] = useState(0);
  const noMore = cursor >= objectIds.length;

  useFocusEffect(() => {
    setActiveTab('exposicoes');
  });

  useEffect(() => {
    loadMet();
  }, []);

  const loadMet = async () => {
    setError(false);
    setLoading(true);
    try {
      const ids = await fetchMetObjectIds();
      setObjectIds(ids);
      setArtworks([]);
      setFeatured(null);
      setCursor(0);
      if (!ids.length) {
        setError(true);
      } else {
        await loadMore(ids, 7); // initial load: 1 featured + 6 grid
      }
    } catch (e) {
      setError(true);
      setFeatured(null);
      setArtworks([]);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async (ids = objectIds, count = 5) => {
    if (!ids.length) return;
    const start = cursor;
    const end = start + count;
    const batchIds = ids.slice(start, end);
    if (!batchIds.length) return;
    setLoadingMore(true);
    try {
      const items = await fetchMetObjects(batchIds);
      if (!items.length) return;
      setCursor((prev) => prev + batchIds.length);

      if (!featured) {
        const [first, ...rest] = items;
        if (first) setFeatured(first);
        if (rest.length) setArtworks((prev) => [...prev, ...rest]);
      } else {
        setArtworks((prev) => [...prev, ...items]);
      }
    } catch (e) {
      setError(true);
    } finally {
      setLoadingMore(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadMet().finally(() => setTimeout(() => setRefreshing(false), 400));
  };

  const handleTabPress = (tabKey) => {
    if (tabKey === activeTab) return;
    if (tabKey === 'timeline') {
      navigation.navigate('Timeline');
    } else if (tabKey === 'blog') {
      navigation.navigate('Blog');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <MainHeader
        userName="Carol"
        userImage="https://i.pravatar.cc/150?img=5"
        greeting="essas exposições tá bombando"
        onSearch={() => navigation.navigate('Pesquisar')}
      />

      <TabHeader
        tabs={TABS}
        activeTab={activeTab}
        onTabPress={handleTabPress}
      />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
          />
        }
      >
        {loading ? (
          <View style={styles.loadingBox}>
            <Text style={styles.loadingText}>Carregando exposições do Met...</Text>
          </View>
        ) : error ? (
          <View style={styles.loadingBox}>
            <Text style={styles.errorText}>Não foi possível carregar agora.</Text>
          </View>
        ) : (
          <>
            {featured ? (
              <TouchableOpacity
                style={styles.featuredCard}
                activeOpacity={0.9}
                onPress={() => navigation.navigate('ArtworkDetail', { objectID: featured.id, fallback: featured })}
              >
                <Image
                  source={{ uri: featured.image }}
                  style={styles.featuredImage}
                />
                <View style={styles.featuredOverlay}>
                  <Text style={styles.featuredTitle}>
                    {featured.title}
                  </Text>
                </View>
              </TouchableOpacity>
            ) : null}

            <View style={styles.artworksGrid}>
              {artworks.map((item) => (
                <View key={item.id} style={styles.artworkCard}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.navigate('ArtworkDetail', { objectID: item.id, fallback: item })}
                  >
                    <Image source={{ uri: item.image }} style={styles.artworkImage} />
                  </TouchableOpacity>
                  <Text style={styles.artworkTitle} numberOfLines={2}>{item.title}</Text>
                  <Text style={styles.artworkArtist} numberOfLines={1}>{item.artist}</Text>
                </View>
              ))}
            </View>

            <View style={styles.loadMoreWrap}>
              {loadingMore ? (
                <ActivityIndicator color={COLORS.primary} />
              ) : noMore ? (
                <Text style={styles.loadingText}>Não há mais itens.</Text>
              ) : (
                <TouchableOpacity
                  style={styles.loadMoreButton}
                  onPress={() => loadMore(objectIds, 5)}
                  activeOpacity={0.8}
                >
                  <Ionicons name="add" size={20} color={COLORS.white} />
                </TouchableOpacity>
              )}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.lg,
  },
  loadingBox: {
    paddingVertical: SPACING['2xl'],
    alignItems: 'center',
  },
  loadingText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
  errorText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.error,
  },
  loadMoreWrap: {
    alignItems: 'center',
    marginTop: SPACING.lg,
    marginBottom: SPACING['2xl'],
  },
  loadMoreButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.medium,
  },

  // Featured Exhibition
  featuredCard: {
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
    marginBottom: SPACING.xl,
    borderWidth: 3,
    borderColor: COLORS.primary,
    ...SHADOWS.medium,
  },
  featuredImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  featuredOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SPACING.md,
    backgroundColor: 'rgba(107, 78, 170, 0.9)',
  },
  featuredTitle: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    color: COLORS.white,
  },

  // Artworks Grid
  artworksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  artworkCard: {
    width: '48%',
    marginBottom: SPACING.lg,
  },
  artworkImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.xs,
  },
  artworkTitle: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textPrimary,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  artworkArtist: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
});
