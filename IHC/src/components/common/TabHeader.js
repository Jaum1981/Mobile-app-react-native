import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';
import { TYPOGRAPHY } from '../../theme/typography';
import { BORDER_RADIUS, SPACING } from '../../theme/spacing';

export default function TabHeader({ tabs = [], activeTab, onTabPress }) {
    return (
        <View style={styles.container}>
            {tabs.map((tab) => {
                const isActive = tab.key === activeTab;
                return (
                    <TouchableOpacity
                        key={tab.key}
                        style={[styles.tab, isActive && styles.tabActive]}
                        onPress={() => onTabPress && onTabPress(tab.key)}
                        activeOpacity={0.8}
                    >
                        <Text style={[styles.label, isActive && styles.labelActive]}>{tab.label}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: SPACING.base,
        paddingVertical: SPACING.sm,
        gap: SPACING.sm,
    },
    tab: {
        paddingVertical: SPACING.sm,
        paddingHorizontal: SPACING.lg,
        borderRadius: BORDER_RADIUS.lg,
        backgroundColor: COLORS.lightGray,
    },
    tabActive: {
        backgroundColor: COLORS.primary,
    },
    label: {
        ...TYPOGRAPHY.body,
        color: COLORS.textPrimary,
    },
    labelActive: {
        color: COLORS.white,
        fontWeight: '700',
    },
});
