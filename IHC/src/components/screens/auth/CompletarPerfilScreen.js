import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../common/Button";
import Input from "../../common/Input";
import { COLORS } from "../../../theme/colors";
import { TYPOGRAPHY } from "../../../theme/typography";
import { CONTAINER, SPACING, BORDER_RADIUS } from "../../../theme/spacing";

export default function CompletarPerfilScreen({ navigation, route }) {
  const previousData = route?.params?.formData || {};
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFinish = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.replace("Main", { formData: { ...previousData, description } });
    }, 700);
  };

  const handleLogin = () => navigation.navigate("Login");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{`Complete o\nseu perfil`}</Text>
          </View>

          <View style={styles.avatarWrapper}>
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="person" size={48} color={COLORS.white} />
            </View>
            <TouchableOpacity style={styles.addPhotoButton} activeOpacity={0.8}>
              <Text style={styles.addPhotoText}>Adicionar Foto</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <Text style={styles.subtitle}>Que tal adicionar uma descrição sobre você?</Text>
            <Input
              placeholder="Digite aqui sua descrição"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              inputStyle={styles.textArea}
              style={styles.textAreaWrapper}
            />
          </View>

          <Button
            title="Finalizar"
            onPress={handleFinish}
            loading={loading}
            disabled={!description.trim()}
            style={styles.finishButton}
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Já tem cadastro? </Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: CONTAINER.paddingHorizontal,
    paddingVertical: SPACING["2xl"],
  },
  header: {
    marginBottom: SPACING.xl,
  },
  title: {
    ...TYPOGRAPHY.h1,
    color: COLORS.primary,
    lineHeight: 44,
  },
  avatarWrapper: {
    alignItems: "center",
    marginBottom: SPACING['2xl'],
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.md,
  },
  addPhotoButton: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  addPhotoText: {
    ...TYPOGRAPHY.body,
    color: COLORS.primary,
    fontWeight: "600",
  },
  form: {
    marginBottom: SPACING['2xl'],
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  textAreaWrapper: {
    marginTop: SPACING.sm,
  },
  textArea: {
    minHeight: 120,
  },
  finishButton: {
    marginBottom: SPACING['2xl'],
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  loginText: {
    ...TYPOGRAPHY.body,
    color: COLORS.primary,
    fontWeight: "600",
  },
});
