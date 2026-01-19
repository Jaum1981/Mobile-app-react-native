import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../../theme/colors';
import { TYPOGRAPHY } from '../../theme/typography';
import { BORDER_RADIUS, SPACING } from '../../theme/spacing';

export default function MainHeader({ userName = 'Usuário', greeting, userImage, onSearch, onNotifications }) {
    return (
        <View style={styles.container}>
            <View style={styles.userRow}>
                <View>
                    <Text style={styles.welcome}>Olá, {userName}</Text>
                    {greeting ? <Text style={styles.greeting}>{greeting}</Text> : null}
                </View>
                <TouchableOpacity>
                    <Image
                        source={{ uri: userImage || 'https://i.pravatar.cc/100' }}
                        style={styles.avatar}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.iconButton} onPress={onSearch}>
                    <Ionicons name="search" size={20} color={COLORS.textPrimary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={onNotifications}>
                    <Ionicons name="notifications-outline" size={20} color={COLORS.textPrimary} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: SPACING.base,
        paddingVertical: SPACING.lg,
        backgroundColor: COLORS.white,
    },
    userRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    welcome: {
        ...TYPOGRAPHY.h2,
        color: COLORS.textPrimary,
    },
    greeting: {
        ...TYPOGRAPHY.body,
        color: COLORS.textSecondary,
        marginTop: SPACING.xs,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: BORDER_RADIUS.xl,
        backgroundColor: COLORS.lightGray,
    },
    actions: {
        flexDirection: 'row',
        marginTop: SPACING.md,
        gap: SPACING.sm,
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.lightGray,
        alignItems: 'center',
        justifyContent: 'center',
        ...SHADOWS.small,
    },
});
