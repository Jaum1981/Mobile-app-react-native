import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    StyleSheet,
    Image,
    ActivityIndicator,
} from 'react-native';
import { COLORS } from '../../../theme/colors';
import { TYPOGRAPHY } from '../../../theme/typography';
import { BORDER_RADIUS, SPACING } from '../../../theme/spacing';

async function fetchMetObject(id) {
    const res = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
    if (!res.ok) throw new Error('Failed');
    return res.json();
}

export default function ArtworkDetailScreen({ route }) {
    const objectID = route?.params?.objectID;
    const fallback = route?.params?.fallback;

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        let mounted = true;
        const load = async () => {
            try {
                const detail = await fetchMetObject(objectID);
                if (mounted) setData(detail);
            } catch (e) {
                if (mounted) {
                    setError(true);
                    setData(fallback || null);
                }
            } finally {
                if (mounted) setLoading(false);
            }
        };
        if (objectID) load();
        else {
            setLoading(false);
            setError(true);
        }
        return () => {
            mounted = false;
        };
    }, [objectID]);

    const title = data?.title || 'Obra sem título';
    const artist = data?.artistDisplayName || data?.artist || 'Artista não informado';
    const date = data?.objectDate || 'Data não informada';
    const medium = data?.medium || 'Material não informado';
    const dimensions = data?.dimensions || 'Dimensões não informadas';
    const department = data?.department || 'Departamento não informado';
    const culture = data?.culture || data?.country || 'Cultura/Origem não informada';
    const image = data?.primaryImage || data?.primaryImageSmall || fallback?.image;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.hero} />
                ) : (
                    <View style={[styles.hero, styles.heroPlaceholder]} />
                )}

                {loading ? (
                    <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />
                ) : null}

                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{artist}</Text>

                <View style={styles.metaBlock}>
                    <MetaRow label="Data" value={date} />
                    <MetaRow label="Técnica" value={medium} />
                    <MetaRow label="Dimensões" value={dimensions} />
                    <MetaRow label="Departamento" value={department} />
                    <MetaRow label="Origem" value={culture} />
                </View>

                {error ? (
                    <Text style={styles.errorText}>Não foi possível carregar todos os dados. Exibindo o que temos.</Text>
                ) : null}
            </ScrollView>
        </SafeAreaView>
    );
}

function MetaRow({ label, value }) {
    return (
        <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>{label}</Text>
            <Text style={styles.metaValue}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    content: {
        padding: SPACING.lg,
        paddingBottom: SPACING['2xl'],
    },
    hero: {
        width: '100%',
        height: 320,
        borderRadius: BORDER_RADIUS.lg,
        marginBottom: SPACING.lg,
        backgroundColor: COLORS.lightGray,
    },
    heroPlaceholder: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loader: {
        marginBottom: SPACING.md,
    },
    title: {
        ...TYPOGRAPHY.h2,
        color: COLORS.textPrimary,
        marginBottom: SPACING.xs,
    },
    subtitle: {
        ...TYPOGRAPHY.body,
        color: COLORS.textSecondary,
        marginBottom: SPACING.md,
    },
    metaBlock: {
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.base,
        gap: SPACING.sm,
        backgroundColor: COLORS.cardBackground,
    },
    metaRow: {
        gap: SPACING.xs,
    },
    metaLabel: {
        ...TYPOGRAPHY.caption,
        color: COLORS.textSecondary,
    },
    metaValue: {
        ...TYPOGRAPHY.bodySmall,
        color: COLORS.textPrimary,
        fontWeight: '600',
    },
    errorText: {
        ...TYPOGRAPHY.caption,
        color: COLORS.error,
        marginTop: SPACING.md,
    },
});