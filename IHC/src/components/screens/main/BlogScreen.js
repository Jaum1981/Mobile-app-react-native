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
import { COLORS } from '../../../theme/colors';
import { TYPOGRAPHY } from '../../../theme/typography';
import { SPACING, BORDER_RADIUS } from '../../../theme/spacing';

const TABS = [
    { key: 'timeline', label: 'Timeline' },
    { key: 'exposicoes', label: 'Exposições' },
    { key: 'blog', label: 'Blog' },
];

const POSTS = [
    {
        id: '1',
        title: 'Como usar o GIMP para fazer seus cartazes de divulgação das exposições',
        author: 'Pedro Paulo',
        subtitle:
            'Publicado por George Viana, professor e mestre em Comunicação pela Universidade Federal do Ceará (UFC)',
        avatar: 'https://i.pravatar.cc/150?img=21',
    },
    {
        id: '2',
        title: 'New Media Art e a influência das vanguardas europeias na arte moderna',
        author: 'Viviane Gomes',
        subtitle:
            'Publicado por Liliane Campos, mestranda em Artes Visuais pela Universidade Federal do Rio de Janeiro (UFRJ).',
        avatar: 'https://i.pravatar.cc/150?img=22',
    },
    {
        id: '3',
        title: 'Você sabe como funciona o algoritmo? Descubra como usar a seu favor',
        author: 'Bárbara Holanda',
        subtitle: 'Dicas práticas para criar presença digital consistente e alcançar novos públicos.',
        avatar: 'https://i.pravatar.cc/150?img=23',
    },
];

export default function BlogScreen({ navigation }) {
    const [activeTab, setActiveTab] = useState('blog');
    const [refreshing, setRefreshing] = useState(false);

    useFocusEffect(() => {
        setActiveTab('blog');
    });

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1200);
    };

    const handleTabPress = (tabKey) => {
        if (tabKey === activeTab) return;
        if (tabKey === 'timeline') navigation.navigate('Timeline');
        if (tabKey === 'exposicoes') navigation.navigate('Exposições');
        if (tabKey === 'blog') navigation.navigate('Blog');
    };

    return (
        <SafeAreaView style={styles.container}>
            <MainHeader
                userName="Carol"
                userImage="https://i.pravatar.cc/150?img=5"
                greeting="essas são as últimas publicações"
                onSearch={() => navigation.navigate('Pesquisar')}
            />

            <TabHeader tabs={TABS} activeTab={activeTab} onTabPress={handleTabPress} />

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
                {POSTS.map((post) => (
                    <View key={post.id} style={styles.postCard}>
                        <View style={styles.postHeader}>
                            <Image source={{ uri: post.avatar }} style={styles.avatar} />
                            <Text style={styles.author}>{post.author}</Text>
                        </View>

                        <Text style={styles.postTitle}>{post.title}</Text>
                        <Text style={styles.postSubtitle}>{post.subtitle}</Text>

                        <TouchableOpacity style={styles.readMore}>
                            <Text style={styles.readMoreText}>ver mais</Text>
                        </TouchableOpacity>
                    </View>
                ))}
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
        paddingBottom: SPACING['2xl'],
    },
    postCard: {
        borderWidth: 2,
        borderColor: COLORS.primary,
        borderRadius: BORDER_RADIUS.xl,
        padding: SPACING.lg,
        marginBottom: SPACING.lg,
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.sm,
    },
    avatar: {
        width: 28,
        height: 28,
        borderRadius: 14,
        marginRight: SPACING.sm,
    },
    author: {
        ...TYPOGRAPHY.bodySmall,
        color: COLORS.textPrimary,
        fontWeight: '600',
    },
    postTitle: {
        ...TYPOGRAPHY.body,
        color: COLORS.primary,
        fontWeight: '700',
        marginBottom: SPACING.sm,
    },
    postSubtitle: {
        ...TYPOGRAPHY.caption,
        color: COLORS.textSecondary,
        lineHeight: 18,
        marginBottom: SPACING.sm,
    },
    readMore: {
        alignSelf: 'flex-end',
    },
    readMoreText: {
        ...TYPOGRAPHY.caption,
        color: '#D81B60',
        fontWeight: '700',
    },
});
