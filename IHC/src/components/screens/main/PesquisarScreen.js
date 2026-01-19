import React, { useMemo, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    ScrollView,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../theme/colors';
import { TYPOGRAPHY } from '../../../theme/typography';
import { BORDER_RADIUS, SPACING } from '../../../theme/spacing';

const SUB_TABS = [
    { key: 'geral', label: 'Geral' },
    { key: 'artistas', label: 'Artistas' },
    { key: 'obras', label: 'Obras' },
    { key: 'museus', label: 'Museus' },
];

const SCREEN_WIDTH = Dimensions.get('window').width;
const CIRCLE_COLUMNS = 3;
const CIRCLE_GAP = SPACING.sm;
const H_PADDING = SPACING.lg;
const CIRCLE_SIZE = (SCREEN_WIDTH - H_PADDING * 2 - CIRCLE_GAP * (CIRCLE_COLUMNS - 1)) / CIRCLE_COLUMNS;

const MOCK_MUSEUS = [
    {
        id: 'm1',
        name: 'Museu de Arte Contemporânea do Ceará - MAC',
        cover: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=800&q=60',
        photos: [
            'https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?auto=format&fit=crop&w=200&q=60',
            'https://images.unsplash.com/photo-1529429617124-aee3f4ae7890?auto=format&fit=crop&w=200&q=60',
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=200&q=60',
            'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=200&q=60',
            'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=200&q=60',
        ],
    },
    {
        id: 'm2',
        name: 'Pinacoteca Municipal de Fortaleza',
        cover: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60',
        photos: [
            'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?auto=format&fit=crop&w=200&q=60',
            'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=200&q=60',
            'https://images.unsplash.com/photo-1508610048659-a06dda91e35d?auto=format&fit=crop&w=200&q=60',
            'https://images.unsplash.com/photo-1441123694162-e54a981ceba3?auto=format&fit=crop&w=200&q=60',
        ],
    },
    {
        id: 'm3',
        name: 'Instituto Dragão do Mar',
        cover: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=800&q=60',
        photos: [
            'https://images.unsplash.com/photo-1441123100240-f9f3f77ed41b?auto=format&fit=crop&w=200&q=60',
            'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=200&q=60',
            'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=200&q=60',
        ],
    },
];

const MOCK_PESSOAS = [
    {
        id: 'p1',
        name: 'Edilene Barbosa',
        avatar: 'https://i.pravatar.cc/150?img=31',
        works: [
            'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=200&q=60',
            'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=200&q=60',
            'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=200&q=60',
            'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=200&q=60',
        ],
    },
    {
        id: 'p2',
        name: 'João Pedro Moraes',
        avatar: 'https://i.pravatar.cc/150?img=32',
        works: [
            'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=200&q=60',
            'https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=200&q=60',
            'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=200&q=60',
            'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=200&q=60',
        ],
    },
    {
        id: 'p3',
        name: 'Larissa Guimarães',
        avatar: 'https://i.pravatar.cc/150?img=45',
        works: [
            'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?auto=format&fit=crop&w=200&q=60',
            'https://images.unsplash.com/photo-1508610048659-a06dda91e35d?auto=format&fit=crop&w=200&q=60',
            'https://images.unsplash.com/photo-1441123694162-e54a981ceba3?auto=format&fit=crop&w=200&q=60',
        ],
    },
    {
        id: 'p4',
        name: 'Rafael Azevedo',
        avatar: 'https://i.pravatar.cc/150?img=12',
        works: [
            'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=200&q=60',
            'https://images.unsplash.com/photo-1441123100240-f9f3f77ed41b?auto=format&fit=crop&w=200&q=60',
            'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=200&q=60',
        ],
    },
];

const MOCK_OBRAS = [
    {
        id: 'o1',
        title: 'Intervenção urbana colorida',
        image: 'https://images.unsplash.com/photo-1508610048659-a06dda91e35d?auto=format&fit=crop&w=400&q=60',
    },
    {
        id: 'o2',
        title: 'Escultura cinética',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=60',
    },
    {
        id: 'o3',
        title: 'Instalação imersiva',
        image: 'https://images.unsplash.com/photo-1441123694162-e54a981ceba3?auto=format&fit=crop&w=400&q=60',
    },
    {
        id: 'o4',
        title: 'Painel de luzes',
        image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=60',
    },
    {
        id: 'o5',
        title: 'Tapeçaria orgânica',
        image: 'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?auto=format&fit=crop&w=400&q=60',
    },
    {
        id: 'o6',
        title: 'Escultura metálica',
        image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=400&q=60',
    },
];

export default function PesquisarScreen() {
    const [query, setQuery] = useState('');
    const [subTab, setSubTab] = useState('geral');

    const headerTitle = useMemo(() => {
        switch (subTab) {
            case 'artistas':
                return 'Encontre artistas e seus perfis';
            case 'obras':
                return 'Descubra obras em destaque';
            case 'museus':
                return 'Explore museus e acervos';
            default:
                return 'Pesquise artistas, obras, museus';
        }
    }, [subTab]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.headerLabel}>pesquisar</Text>

                <View style={styles.searchBar}>
                    <Ionicons name="search" size={18} color={COLORS.gray} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder={headerTitle}
                        placeholderTextColor={COLORS.placeholder}
                        value={query}
                        onChangeText={setQuery}
                    />
                </View>

                <View style={styles.subTabs}>
                    {SUB_TABS.map((tab) => {
                        const active = tab.key === subTab;
                        return (
                            <TouchableOpacity
                                key={tab.key}
                                style={[styles.subTab, active && styles.subTabActive]}
                                onPress={() => setSubTab(tab.key)}
                                activeOpacity={0.8}
                            >
                                <Text style={[styles.subTabLabel, active && styles.subTabLabelActive]}>
                                    {tab.label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>
                    {subTab === 'geral' && (
                        <>
                            {MOCK_MUSEUS.map((museu) => (
                                <View key={museu.id} style={styles.museumCard}>
                                    <Image source={{ uri: museu.cover }} style={styles.museumCover} />
                                    <Text style={styles.museumName}>{museu.name}</Text>
                                    <ScrollView
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        contentContainerStyle={styles.thumbRowContent}
                                    >
                                        {museu.photos.map((photo, idx) => (
                                            <Image key={idx} source={{ uri: photo }} style={styles.thumb} />
                                        ))}
                                    </ScrollView>
                                </View>
                            ))}

                            {MOCK_PESSOAS.map((item) => (
                                <View key={item.id} style={styles.personRow}>
                                    <View style={styles.personHeader}>
                                        <Image source={{ uri: item.avatar }} style={styles.personAvatar} />
                                        <Text style={styles.personName}>{item.name}</Text>
                                    </View>
                                    <ScrollView
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        contentContainerStyle={styles.thumbRowContent}
                                    >
                                        {item.works.map((photo, idx) => (
                                            <Image key={idx} source={{ uri: photo }} style={styles.thumb} />
                                        ))}
                                    </ScrollView>
                                </View>
                            ))}
                        </>
                    )}

                    {subTab === 'artistas' && (
                        <View style={styles.gridWrap}>
                            {MOCK_PESSOAS.map((item) => (
                                <View key={item.id} style={styles.avatarBlock}>
                                    <Image source={{ uri: item.avatar }} style={styles.bigAvatar} />
                                    <Text style={styles.avatarName}>{item.name}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {subTab === 'obras' && (
                        <View style={styles.gridWrap}>
                            {MOCK_OBRAS.map((obra) => (
                                <View key={obra.id} style={styles.obraCard}>
                                    <Image source={{ uri: obra.image }} style={styles.obraImage} />
                                    <Text style={styles.obraTitle}>{obra.title}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {subTab === 'museus' && (
                        <View style={styles.gridWrap}>
                            {MOCK_MUSEUS.map((museu) => (
                                <View key={museu.id} style={styles.obraCard}>
                                    <Image source={{ uri: museu.cover }} style={styles.obraImage} />
                                    <Text style={styles.obraTitle}>{museu.name}</Text>
                                </View>
                            ))}
                        </View>
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1F1F3',
    },
    content: {
        flex: 1,
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.md,
    },
    headerLabel: {
        ...TYPOGRAPHY.caption,
        color: COLORS.textSecondary,
        marginBottom: SPACING.sm,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.xl,
        paddingHorizontal: SPACING.base,
        paddingVertical: SPACING.sm,
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
        marginBottom: SPACING.md,
    },
    searchInput: {
        flex: 1,
        marginLeft: SPACING.sm,
        ...TYPOGRAPHY.body,
        color: COLORS.textPrimary,
    },
    subTabs: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.base,
        marginBottom: SPACING.lg,
    },
    subTab: {
        paddingVertical: SPACING.sm,
        paddingHorizontal: SPACING.base,
        borderRadius: BORDER_RADIUS.lg,
    },
    subTabActive: {
        backgroundColor: COLORS.primary,
    },
    subTabLabel: {
        ...TYPOGRAPHY.bodySmall,
        color: COLORS.textSecondary,
    },
    subTabLabelActive: {
        color: COLORS.white,
        fontWeight: '700',
    },
    listContent: {
        paddingBottom: SPACING['2xl'],
    },
    museumCard: {
        marginBottom: SPACING.lg,
    },
    museumCover: {
        width: '100%',
        height: 160,
        borderRadius: BORDER_RADIUS.lg,
        marginBottom: SPACING.sm,
    },
    museumName: {
        ...TYPOGRAPHY.body,
        color: COLORS.textPrimary,
        marginBottom: SPACING.sm,
    },
    thumbRowContent: {
        flexDirection: 'row',
        gap: CIRCLE_GAP,
        paddingRight: H_PADDING,
    },
    thumb: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
        overflow: 'hidden',
        backgroundColor: COLORS.lightGray,
    },
    personRow: {
        marginBottom: SPACING.lg,
    },
    personHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.sm,
    },
    personAvatar: {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginRight: SPACING.sm,
    },
    personName: {
        ...TYPOGRAPHY.bodySmall,
        color: COLORS.textPrimary,
        fontWeight: '600',
    },
    gridWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: SPACING.md,
    },
    avatarBlock: {
        width: '47%',
        alignItems: 'center',
    },
    bigAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: SPACING.sm,
    },
    avatarName: {
        ...TYPOGRAPHY.bodySmall,
        color: COLORS.textPrimary,
        textAlign: 'center',
    },
    obraCard: {
        width: '47%',
    },
    obraImage: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: BORDER_RADIUS.lg,
        marginBottom: SPACING.xs,
    },
    obraTitle: {
        ...TYPOGRAPHY.caption,
        color: COLORS.textPrimary,
    },
});
