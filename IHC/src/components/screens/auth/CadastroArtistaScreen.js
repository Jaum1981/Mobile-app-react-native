import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../common/Button";
import Input from "../../common/Input";
import { COLORS } from "../../../theme/colors";
import { TYPOGRAPHY } from "../../../theme/typography";
import { CONTAINER, SPACING } from "../../../theme/spacing";

export default function CadastroArtistaScreen({ navigation, route }) {
  const previousData = route?.params?.formData || {};

  const [artLanguage, setArtLanguage] = useState("");
  const [education, setEducation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate("PreferenciasArte", {
        formData: {
          ...previousData,
          artLanguage,
          education,
        },
      });
    }, 500);
  };

  const handleBack = () => navigation.goBack();
  const handleLogin = () => navigation.navigate("Login");

  const isValid = artLanguage.trim() && education.trim();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>

          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title}>Estamos{"\n"}quase{"\n"}terminando</Text>
            </View>

            <View style={styles.form}>
              <Input
                placeholder="Qual sua linguagem artística?"
                value={artLanguage}
                onChangeText={setArtLanguage}
                iconName="color-palette-outline"
              />

              <Input
                placeholder="Qual sua escolaridade?"
                value={education}
                onChangeText={setEducation}
                iconName="school-outline"
              />

              <Button
                title="Próximo"
                onPress={handleNext}
                loading={loading}
                disabled={!isValid}
                style={styles.nextButton}
              />
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Já tem cadastro? </Text>
              <TouchableOpacity onPress={handleLogin}>
                <Text style={styles.loginText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  flex: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
  },
  backButton: {
    padding: SPACING.lg,
    alignSelf: "flex-start",
  },
  content: {
    flex: 1,
    paddingHorizontal: CONTAINER.paddingHorizontal,
    paddingBottom: SPACING["2xl"],
  },
  header: {
    marginBottom: SPACING.xl,
  },
  title: {
    ...TYPOGRAPHY.h1,
    color: COLORS.primary,
    lineHeight: 44,
  },
  form: {
    marginBottom: SPACING["2xl"],
  },
  nextButton: {
    marginTop: SPACING.md,
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
