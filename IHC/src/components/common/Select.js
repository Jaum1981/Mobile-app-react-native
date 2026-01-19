import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../theme/colors';
import { TYPOGRAPHY } from '../../theme/typography';
import { BORDER_RADIUS, SPACING } from '../../theme/spacing';

export default function Select({ placeholder, value, options = [], onSelect }) {
    const [open, setOpen] = useState(false);

    const selectedOption = options.find((opt) => opt.value === value);

    const handleSelect = (val) => {
        onSelect && onSelect(val);
        setOpen(false);
    };

    return (
        <View>
            <TouchableOpacity
                style={styles.control}
                onPress={() => setOpen(true)}
                activeOpacity={0.8}
            >
                <Text style={[styles.valueText, !selectedOption && styles.placeholderText]}>
                    {selectedOption ? selectedOption.label : placeholder || 'Selecione'}
                </Text>
                <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={20} color={COLORS.gray} />
            </TouchableOpacity>

            <Modal transparent visible={open} animationType="fade">
                <TouchableOpacity style={styles.backdrop} onPress={() => setOpen(false)}>
                    <View style={styles.sheet}>
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.option}
                                    onPress={() => handleSelect(item.value)}
                                >
                                    <Text style={styles.optionText}>{item.label}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    control: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.white,
        borderColor: COLORS.inputBorder,
        borderWidth: 1,
        borderRadius: BORDER_RADIUS.xl,
        paddingHorizontal: SPACING.base,
        paddingVertical: SPACING.md,
        marginBottom: SPACING.md,
    },
    valueText: {
        ...TYPOGRAPHY.body,
        color: COLORS.textPrimary,
    },
    placeholderText: {
        color: COLORS.placeholder,
    },
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'flex-end',
    },
    sheet: {
        backgroundColor: COLORS.white,
        borderTopLeftRadius: BORDER_RADIUS.lg,
        borderTopRightRadius: BORDER_RADIUS.lg,
        maxHeight: '50%',
        paddingBottom: SPACING.lg,
    },
    option: {
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.base,
    },
    optionText: {
        ...TYPOGRAPHY.body,
        color: COLORS.textPrimary,
    },
});
