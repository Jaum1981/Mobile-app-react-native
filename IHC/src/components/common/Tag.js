import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';
import { TYPOGRAPHY } from '../../theme/typography';
import { BORDER_RADIUS, SPACING } from '../../theme/spacing';

export default function Tag({ label, selected = false, onPress, style }) {
    return (
        <TouchableOpacity
            style={[styles.tag, selected ? styles.tagSelected : styles.tagDefault, style]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Text style={[styles.text, selected ? styles.textSelected : styles.textDefault]}>
                {label}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    tag: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderRadius: BORDER_RADIUS.lg,
        borderWidth: 1,
    },
    tagDefault: {
        backgroundColor: COLORS.white,
        borderColor: COLORS.inputBorder,
    },
    tagSelected: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    text: {
        ...TYPOGRAPHY.body,
    },
    textDefault: {
        color: COLORS.textPrimary,
    },
    textSelected: {
        color: COLORS.white,
        fontWeight: '600',
    },
});
