import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { TYPOGRAPHY } from '../../../theme/typography';
import { BORDER_RADIUS, SPACING } from '../../../theme/spacing';

const ACTIONS = [
    'Trabalhos Favoritos',
    'Trabalhos Publicados',
    'Artigos Publicados',
    'Artigos Favoritos',
    'Rascunhos',
];

export default function ProfileScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                <View style={styles.headerRow}>
                    <Image
                        source={{ uri: 'https://i.pravatar.cc/150?img=47' }}
                        style={styles.avatar}
                    />
                    <View style={styles.titleWrap}>
                        <Text style={styles.title}>Carol, esse é</Text>
                        <Text style={styles.title}>seu perfil</Text>
                    </View>
                </View>

                <View style={styles.actionsWrap}>
                    {ACTIONS.map((label) => (
                        <TouchableOpacity key={label} style={styles.primaryButton} activeOpacity={0.8}>
                            <Text style={styles.primaryButtonText}>{label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.8}>
                    <Text style={styles.secondaryButtonText}>Lixeira</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray,
        padding: SPACING.lg,
    },
    card: {
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
        flex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.xl,
    },
    avatar: {
        width: 72,
        height: 72,
        borderRadius: 36,
        marginRight: SPACING.base,
        backgroundColor: COLORS.lightGray,
    },
    titleWrap: {
        flex: 1,
    },
    title: {
        ...TYPOGRAPHY.h1,
        color: COLORS.textPrimary,
        lineHeight: 34,
    },
    actionsWrap: {
        gap: SPACING.md,
        marginBottom: SPACING['2xl'],
    },
    primaryButton: {
        backgroundColor: COLORS.primary,
        borderRadius: BORDER_RADIUS.xl,
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.base,
        alignItems: 'center',
    },
    primaryButtonText: {
        ...TYPOGRAPHY.body,
        color: COLORS.white,
        fontWeight: '600',
    },
    secondaryButton: {
        borderRadius: BORDER_RADIUS.xl,
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.base,
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: COLORS.primary,
    },
    secondaryButtonText: {
        ...TYPOGRAPHY.body,
        color: COLORS.primary,
        fontWeight: '600',
    },
});