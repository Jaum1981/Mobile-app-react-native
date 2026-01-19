import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../theme/colors';
import { TYPOGRAPHY } from '../../../theme/typography';
import { BORDER_RADIUS, SPACING } from '../../../theme/spacing';

const CONVERSATIONS = [
    {
        id: 'c1',
        name: 'Pedro Silva',
        preview: 'Olá, tudo bem?',
        timeLabel: 'Agora',
        unread: 1,
        avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=60',
    },
    {
        id: 'c2',
        name: 'Ariadna dos Santos',
        preview: 'Adorei a sua releitura de noite estrelada!',
        timeLabel: 'Agora',
        unread: 2,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=60',
    },
    {
        id: 'c3',
        name: 'Larah Pedrosa',
        preview: 'Qual foi a sua principal referência?',
        timeLabel: 'Terça-feira',
        unread: 0,
        avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=60',
    },
    {
        id: 'c4',
        name: 'Luiz Felipe',
        preview: 'Que bom que gostou, fico muito feliz estou [...]',
        timeLabel: 'Ontem',
        unread: 0,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=60',
    },
    {
        id: 'c5',
        name: 'Rainara Marcele',
        preview: 'Você recomenda quais materiais de arte?',
        timeLabel: 'Ontem',
        unread: 0,
        avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=60',
    },
    {
        id: 'c6',
        name: 'Maria Clara',
        preview: 'Por que você não gostou da exposição?',
        timeLabel: 'Quarta-feira',
        unread: 0,
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=60',
    },
    {
        id: 'c7',
        name: 'Marcus Pinheiro',
        preview: 'Qual o valor dessa sua última pintura que você fez?',
        timeLabel: 'Quinta-feira',
        unread: 0,
        avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=60',
    },
];

export default function MessagesScreen({ navigation }) {
    const handleOpenChat = (conversation) => {
        navigation.navigate('Chat', { conversation });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.hero}>
                    <Image
                        source={{ uri: 'https://i.pravatar.cc/150?img=47' }}
                        style={styles.heroAvatar}
                    />
                    <View style={styles.heroTextWrap}>
                        <Text style={styles.heroTitle}>Carol, essas</Text>
                        <Text style={styles.heroTitle}>são suas</Text>
                        <Text style={styles.heroTitle}>mensagens</Text>
                    </View>
                </View>

                <View style={styles.list}>
                    {CONVERSATIONS.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.row}
                            activeOpacity={0.8}
                            onPress={() => handleOpenChat(item)}
                        >
                            <View style={styles.rowLeft}>
                                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                                <View style={styles.textBlock}>
                                    <Text style={styles.name}>{item.name}</Text>
                                    <Text style={styles.preview} numberOfLines={1}>
                                        {item.preview}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.rowRight}>
                                <Text style={styles.timeLabel}>{item.timeLabel}</Text>
                                {item.unread > 0 ? (
                                    <View style={styles.badge}>
                                        <Text style={styles.badgeText}>{item.unread}</Text>
                                    </View>
                                ) : null}
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray,
    },
    content: {
        padding: SPACING.lg,
        paddingBottom: SPACING['2xl'],
    },
    hero: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.cardBackground,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
        marginBottom: SPACING.lg,
    },
    heroAvatar: {
        width: 72,
        height: 72,
        borderRadius: 36,
        marginRight: SPACING.base,
        backgroundColor: COLORS.lightGray,
    },
    heroTextWrap: {
        flex: 1,
    },
    heroTitle: {
        ...TYPOGRAPHY.h1,
        color: COLORS.textPrimary,
        lineHeight: 34,
    },
    list: {
        backgroundColor: COLORS.cardBackground,
        borderRadius: BORDER_RADIUS.lg,
        paddingHorizontal: SPACING.base,
        paddingVertical: SPACING.sm,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: SPACING.sm,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.inputBorder,
    },
    rowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        paddingRight: SPACING.sm,
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: COLORS.lightGray,
        marginRight: SPACING.base,
    },
    textBlock: {
        flex: 1,
    },
    name: {
        ...TYPOGRAPHY.body,
        fontWeight: '700',
        color: COLORS.primary,
        marginBottom: SPACING.xs,
    },
    preview: {
        ...TYPOGRAPHY.bodySmall,
        color: COLORS.textSecondary,
    },
    rowRight: {
        alignItems: 'flex-end',
        gap: SPACING.xs,
    },
    timeLabel: {
        ...TYPOGRAPHY.caption,
        color: COLORS.textSecondary,
    },
    badge: {
        minWidth: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: SPACING.xs,
    },
    badgeText: {
        ...TYPOGRAPHY.caption,
        color: COLORS.white,
        fontWeight: '700',
    },
});
