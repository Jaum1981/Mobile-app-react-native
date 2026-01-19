import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS, SHADOWS } from '../../theme/colors';
import { TYPOGRAPHY } from '../../theme/typography';
import { BORDER_RADIUS, SPACING } from '../../theme/spacing';

export default function ArtistCard({ name, workTitle, image, onPress }) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
            <Image source={{ uri: image }} style={styles.image} />
            <View style={styles.content}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.work}>{workTitle}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.lg,
        overflow: 'hidden',
        ...SHADOWS.small,
        marginBottom: SPACING.lg,
    },
    image: {
        width: '100%',
        height: 180,
    },
    content: {
        padding: SPACING.base,
    },
    name: {
        ...TYPOGRAPHY.h2,
        color: COLORS.textPrimary,
        marginBottom: SPACING.xs,
    },
    work: {
        ...TYPOGRAPHY.body,
        color: COLORS.textSecondary,
    },
});
