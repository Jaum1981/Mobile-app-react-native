import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS, SHADOWS } from '../../theme/colors';
import { TYPOGRAPHY } from '../../theme/typography';
import { BORDER_RADIUS, SPACING } from '../../theme/spacing';

export default function NewsCard({ title, author, authorImage, onPress }) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
            <Image
                source={{ uri: 'https://picsum.photos/320/200' }}
                style={styles.image}
            />
            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.footer}>
                    <View style={styles.authorRow}>
                        <Image source={{ uri: authorImage }} style={styles.authorImage} />
                        <Text style={styles.authorText}>{author}</Text>
                    </View>
                    <Text style={styles.cta}>ler</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.lg,
        marginBottom: SPACING.lg,
        ...SHADOWS.small,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 180,
    },
    content: {
        padding: SPACING.base,
    },
    title: {
        ...TYPOGRAPHY.h2,
        color: COLORS.textPrimary,
        marginBottom: SPACING.sm,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    authorRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    authorImage: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: SPACING.sm,
    },
    authorText: {
        ...TYPOGRAPHY.body,
        color: COLORS.textSecondary,
    },
    cta: {
        ...TYPOGRAPHY.body,
        color: COLORS.primary,
        fontWeight: '700',
    },
});
