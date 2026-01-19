import React, { useState } from 'react';
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
} from 'react-native';
import MainHeader from '../../common/MainHeader';
import TabHeader from '../../common/TabHeader';
import NewsCard from '../../common/NewsCard';
import { COLORS, SHADOWS } from '../../../theme/colors';
import { TYPOGRAPHY } from '../../../theme/typography';
import { SPACING, BORDER_RADIUS } from '../../../theme/spacing';

const TABS = [
  { key: 'timeline', label: 'Timeline' },
  { key: 'exposicoes', label: 'Exposições' },
  { key: 'blog', label: 'Blog' },
];

const MOCK_NEWS = [
  {
    id: '1',
    title: 'Expressão de arte em tempos conturbados',
    author: 'Museu da Arte Paulista e Tamires Borges',
    authorImage: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    title: 'Museu da UFC realiza exposição interativa imersiva',
    author: 'Museu da Universidade Federal do Ceará',
    authorImage: 'https://i.pravatar.cc/150?img=2',
    featured: true,
  },
  {
    id: '3',
    title: 'Nova exposição traz obras raras do período barroco',
    author: 'João Pedro Moraes',
    authorImage: 'https://i.pravatar.cc/150?img=3',
  },
];

export default function TimelineScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('timeline');
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(() => {
    setActiveTab('timeline');
  });

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const handleTabPress = (tabKey) => {
    if (tabKey === activeTab) return;
    if (tabKey === 'exposicoes') {
      navigation.navigate('Exposições');
    } else if (tabKey === 'blog') {
      navigation.navigate('Blog');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <MainHeader
        userName="Carol"
        userImage="https://i.pravatar.cc/150?img=5"
        greeting="essas são as últimas notícias"
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
        {MOCK_NEWS.map((news) => (
          <View key={news.id}>
            {news.featured ? (
              <FeaturedCard
                title={news.title}
                author={news.author}
                authorImage={news.authorImage}
                onPress={() => console.log('Open news', news.id)}
              />
            ) : (
              <NewsCard
                title={news.title}
                author={news.author}
                authorImage={news.authorImage}
                onPress={() => console.log('Open news', news.id)}
              />
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function FeaturedCard({ title, author, authorImage, onPress }) {
  return (
    <TouchableOpacity
      style={styles.featuredCard}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.featuredImageContainer}>
        <Image
          source={{ uri: 'https://picsum.photos/400/300' }}
          style={styles.featuredImage}
        />
        <View style={styles.featuredOverlay}>
          <Text style={styles.featuredTitle}>{title}</Text>
        </View>
      </View>

      <View style={styles.featuredFooter}>
        <View style={styles.authorRow}>
          <Image source={{ uri: authorImage }} style={styles.authorImage} />
          <Text style={styles.authorText}>{author}</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.seeMore}>ver mais</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
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

  // Featured Card
  featuredCard: {
    backgroundColor: COLORS.accent,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
    overflow: 'hidden',
    ...SHADOWS.small,
  },
  featuredImageContainer: {
    position: 'relative',
    height: 160,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  featuredOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SPACING.md,
    backgroundColor: 'rgba(107, 78, 170, 0.85)',
  },
  featuredTitle: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    color: COLORS.white,
  },
  featuredFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  authorImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: SPACING.sm,
  },
  authorText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    flex: 1,
  },
  seeMore: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primary,
    fontWeight: '700',
  },
});
