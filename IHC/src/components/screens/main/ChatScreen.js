import React, { useMemo } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../theme/colors';
import { TYPOGRAPHY } from '../../../theme/typography';
import { BORDER_RADIUS, SPACING } from '../../../theme/spacing';

const ACCENT_PINK = '#E6007A';

const DEFAULT_MESSAGES = [
    { id: 'm1', text: 'Oi, tudo bem?', time: '15:54', isMine: false },
    { id: 'm2', text: 'Olá, tudo sim', time: '15:55', isMine: true },
    {
        id: 'm3',
        text: 'Eu adorei essa sua última exposição captou bem a essência do movimento pop art.',
        time: '15:55',
        isMine: false,
    },
    {
        id: 'm4',
        text: 'Que bom que gostou, fico muito feliz estou preparando mais uma coleção que acho que vocês vão adorar',
        time: '15:57',
        isMine: true,
    },
];

export default function ChatScreen({ navigation, route }) {
    const conversation = route?.params?.conversation;
    const messages = useMemo(() => conversation?.messages || DEFAULT_MESSAGES, [conversation]);
    const name = conversation?.name || 'Conversa';
    const avatar = conversation?.avatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=60';

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={22} color={COLORS.white} />
                </TouchableOpacity>
                <Image source={{ uri: avatar }} style={styles.headerAvatar} />
                <Text style={styles.headerName}>{name}</Text>
            </View>

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 24 : 0}
            >
                <ScrollView contentContainerStyle={styles.messagesContent} showsVerticalScrollIndicator={false}>
                    <Text style={styles.dateLabel}>31 de julho de 2021</Text>
                    {messages.map((msg) => (
                        <View
                            key={msg.id}
                            style={[styles.bubbleWrap, msg.isMine ? styles.alignEnd : styles.alignStart]}
                        >
                            <View style={[styles.bubble, msg.isMine ? styles.bubbleMine : styles.bubbleTheirs]}>
                                <Text style={msg.isMine ? styles.textMine : styles.textTheirs}>{msg.text}</Text>
                            </View>
                            <View style={styles.metaRow}>
                                <Text style={styles.time}>{msg.time}</Text>
                                {msg.isMine ? <Ionicons name="checkmark-done" size={16} color={COLORS.primary} /> : null}
                            </View>
                        </View>
                    ))}
                </ScrollView>

                <View style={styles.inputBar}>
                    <View style={styles.inputLeftIcons}>
                        <TouchableOpacity style={styles.iconCircle}>
                            <Ionicons name="happy" size={18} color={COLORS.white} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconCircle}>
                            <Ionicons name="attach" size={18} color={COLORS.white} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputFieldWrap}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Digite aqui sua mensagem..."
                            placeholderTextColor={COLORS.placeholder}
                        />
                    </View>
                    <View style={styles.inputRightIcons}>
                        <TouchableOpacity style={styles.iconCircle}>
                            <Ionicons name="mic" size={18} color={COLORS.white} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconCircle}>
                            <Ionicons name="send" size={18} color={COLORS.white} />
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.base,
        backgroundColor: COLORS.primary,
        borderBottomLeftRadius: BORDER_RADIUS.md,
        borderBottomRightRadius: BORDER_RADIUS.md,
    },
    backBtn: {
        marginRight: SPACING.base,
    },
    headerAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: SPACING.sm,
        backgroundColor: COLORS.lightGray,
    },
    headerName: {
        ...TYPOGRAPHY.body,
        color: COLORS.white,
        fontWeight: '600',
    },
    messagesContent: {
        padding: SPACING.lg,
        paddingBottom: SPACING['2xl'],
        gap: SPACING.md,
    },
    dateLabel: {
        alignSelf: 'center',
        ...TYPOGRAPHY.bodySmall,
        color: COLORS.textSecondary,
    },
    bubbleWrap: {
        maxWidth: '80%',
    },
    alignStart: {
        alignSelf: 'flex-start',
    },
    alignEnd: {
        alignSelf: 'flex-end',
    },
    bubble: {
        borderRadius: BORDER_RADIUS.xl,
        paddingHorizontal: SPACING.base,
        paddingVertical: SPACING.sm,
    },
    bubbleTheirs: {
        backgroundColor: ACCENT_PINK,
    },
    bubbleMine: {
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.primary,
    },
    textTheirs: {
        ...TYPOGRAPHY.bodySmall,
        color: COLORS.white,
    },
    textMine: {
        ...TYPOGRAPHY.bodySmall,
        color: COLORS.textPrimary,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
        marginTop: SPACING.xs,
    },
    time: {
        ...TYPOGRAPHY.caption,
        color: COLORS.textSecondary,
    },
    inputBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.base,
        paddingVertical: SPACING.sm,
        backgroundColor: COLORS.primary,
        gap: SPACING.sm,
    },
    inputLeftIcons: {
        flexDirection: 'row',
        gap: SPACING.xs,
    },
    inputRightIcons: {
        flexDirection: 'row',
        gap: SPACING.xs,
    },
    iconCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: COLORS.primaryDark,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputFieldWrap: {
        flex: 1,
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.xl,
        paddingHorizontal: SPACING.sm,
    },
    textInput: {
        ...TYPOGRAPHY.bodySmall,
        color: COLORS.textPrimary,
        height: 40,
    },
});
