import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../../../theme/colors';
import { SPACING, BORDER_RADIUS } from '../../../theme/spacing';
import { TYPOGRAPHY } from '../../../theme/typography';
import Button from '../../common/Button';

const INTERACTIONS = [
    { key: 'engrenagem', label: 'Engrenagem', icon: 'construct-outline' },
    { key: 'motor', label: 'Motor', icon: 'hardware-chip-outline' },
    { key: 'misturar', label: 'Misturar', icon: 'color-palette-outline' },
    { key: '3d', label: '3D', icon: 'cube-outline' },
    { key: 'audio', label: 'Áudio', icon: 'musical-notes-outline' },
    { key: 'download', label: 'Download', icon: 'download-outline' },
    { key: 'quadro', label: 'Quadro', icon: 'image-outline' },
    { key: 'texto', label: 'Texto', icon: 'document-text-outline' },
    { key: 'sinal', label: 'Sinal', icon: 'radio-outline' },
    { key: 'link', label: 'Código/iframe', icon: 'code-slash-outline' },
    { key: 'vr', label: 'VR', icon: 'cube-outline' },
    { key: 'sol', label: 'Ligar lanterna', icon: 'sunny-outline' },
    { key: 'emoji', label: 'Emojis', icon: 'happy-outline' },
    { key: 'video', label: 'Vídeo', icon: 'videocam-outline' },
    { key: 'imagem', label: 'Imagem', icon: 'images-outline' },
];

export default function PublicarObraScreen({ navigation }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [classification, setClassification] = useState('');
    const [category, setCategory] = useState('');
    const [interactionsVisible, setInteractionsVisible] = useState(false);

    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={22} color={COLORS.primary} />
                    </TouchableOpacity>
                    <Text style={styles.screenTitle}>Publicar obra</Text>
                    <View style={{ width: 22 }} />
                </View>

                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Nome da obra<Text style={styles.required}>*</Text></Text>
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

                <TouchableOpacity style={styles.addCard} activeOpacity={0.9} onPress={() => setInteractionsVisible(true)}>
                    <Text style={styles.addCardText}>Adicionar</Text>
                </TouchableOpacity>

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

            <Modal visible={interactionsVisible} transparent animationType="fade" onRequestClose={() => setInteractionsVisible(false)}>
                <View style={styles.interactionOverlay}>
                    <View style={styles.interactionCard}>
                        <Text style={styles.interactionTitle}>Selecione a interação desejada</Text>
                        <View style={styles.interactionGrid}>
                            {INTERACTIONS.map((item) => (
                                <TouchableOpacity key={item.key} style={styles.interactionItem} activeOpacity={0.8}>
                                    <View style={styles.iconCircle}>
                                        <Ionicons name={item.icon} size={20} color={COLORS.primary} />
                                    </View>
                                    <Text style={styles.interactionLabel}>{item.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <Button title="Próximo" onPress={() => setInteractionsVisible(false)} style={styles.interactionButton} />
                    </View>
                </View>
            </Modal>
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
    addCard: {
        height: 120,
        borderWidth: 1.5,
        borderColor: COLORS.primary,
        borderRadius: BORDER_RADIUS.xl,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        ...SHADOWS.small,
    },
    addCardText: {
        ...TYPOGRAPHY.button,
        color: COLORS.primary,
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
    interactionOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: SPACING.lg,
    },
    interactionCard: {
        width: '90%',
        backgroundColor: COLORS.white,
        borderRadius: 28,
        padding: SPACING.lg,
        ...SHADOWS.large,
    },
    interactionTitle: {
        ...TYPOGRAPHY.body,
        fontWeight: '700',
        color: COLORS.textPrimary,
        textAlign: 'center',
        marginBottom: SPACING.md,
    },
    interactionGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        rowGap: SPACING.base,
        marginBottom: SPACING.md,
    },
    interactionItem: {
        width: '30%',
        alignItems: 'center',
        gap: SPACING.xs,
    },
    iconCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1.5,
        borderColor: COLORS.primary,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        ...SHADOWS.small,
    },
    interactionLabel: {
        ...TYPOGRAPHY.caption,
        color: COLORS.primary,
        textAlign: 'center',
    },
    interactionButton: {
        marginTop: SPACING.sm,
    },
});
