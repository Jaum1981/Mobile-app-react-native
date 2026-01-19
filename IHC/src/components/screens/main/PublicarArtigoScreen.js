import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../../../theme/colors';
import { SPACING, BORDER_RADIUS } from '../../../theme/spacing';
import { TYPOGRAPHY } from '../../../theme/typography';
import Button from '../../common/Button';

export default function PublicarArtigoScreen({ navigation }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [classification, setClassification] = useState('');
    const [category, setCategory] = useState('');

    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={22} color={COLORS.primary} />
                    </TouchableOpacity>
                    <Text style={styles.screenTitle}>Publicar artigo</Text>
                    <View style={{ width: 22 }} />
                </View>

                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Nome do artigo<Text style={styles.required}>*</Text></Text>
                    <TextInput
                        value={title}
                        onChangeText={setTitle}
                        placeholder="Nome"
                        placeholderTextColor={COLORS.placeholder}
                        style={styles.input}
                    />
                </View>

                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Conteúdo<Text style={styles.required}>*</Text></Text>
                    <View style={styles.toolbar}>
                        {['text-outline', 'link-outline', 'list-outline', 'image-outline', 'code-slash-outline'].map((icon) => (
                            <TouchableOpacity key={icon} style={styles.toolbarIcon}>
                                <Ionicons name={icon} size={16} color={COLORS.primary} />
                            </TouchableOpacity>
                        ))}
                    </View>
                    <TextInput
                        value={content}
                        onChangeText={setContent}
                        placeholder="Digite o conteúdo"
                        placeholderTextColor={COLORS.placeholder}
                        multiline
                        style={styles.textArea}
                    />
                </View>

                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Classificação<Text style={styles.required}>*</Text></Text>
                    <TouchableOpacity style={styles.select} activeOpacity={0.8}>
                        <Text style={[styles.selectText, !classification && styles.placeholderText]}>
                            {classification || 'Ex: Para maiores de 16 anos'}
                        </Text>
                        <Ionicons name="chevron-down" size={18} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>

                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Categoria<Text style={styles.required}>*</Text></Text>
                    <TouchableOpacity style={styles.select} activeOpacity={0.8}>
                        <Text style={[styles.selectText, !category && styles.placeholderText]}>
                            {category || 'Selecione uma categoria'}
                        </Text>
                        <Ionicons name="chevron-down" size={18} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>

                <Button title="Publicar" onPress={() => navigation.goBack()} style={styles.submitBtn} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    container: {
        padding: SPACING.lg,
        paddingBottom: SPACING['2xl'],
        gap: SPACING.lg,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: SPACING.sm,
    },
    backButton: {
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    screenTitle: {
        ...TYPOGRAPHY.h2,
        color: COLORS.textPrimary,
    },
    fieldGroup: {
        gap: SPACING.sm,
    },
    label: {
        ...TYPOGRAPHY.body,
        color: COLORS.textPrimary,
    },
    required: {
        color: COLORS.error,
        marginLeft: 4,
    },
    input: {
        borderWidth: 1.5,
        borderColor: COLORS.primary,
        borderRadius: 24,
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        backgroundColor: COLORS.white,
        ...TYPOGRAPHY.body,
        color: COLORS.textPrimary,
    },
    toolbar: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: SPACING.base,
        paddingVertical: SPACING.sm,
        backgroundColor: COLORS.white,
    },
    toolbarIcon: {
        padding: 4,
    },
    textArea: {
        borderWidth: 1.5,
        borderColor: COLORS.primary,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        minHeight: 220,
        backgroundColor: COLORS.white,
        padding: SPACING.lg,
        ...TYPOGRAPHY.body,
        color: COLORS.textPrimary,
        textAlignVertical: 'top',
    },
    select: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1.5,
        borderColor: COLORS.primary,
        borderRadius: 24,
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        backgroundColor: COLORS.white,
        ...SHADOWS.small,
    },
    selectText: {
        ...TYPOGRAPHY.body,
        color: COLORS.textPrimary,
    },
    placeholderText: {
        color: COLORS.placeholder,
    },
    submitBtn: {
        marginTop: SPACING.lg,
    },
});
