import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../common/Button';
import Input from '../../common/Input';
import { COLORS } from '../../../theme/colors';
import { TYPOGRAPHY } from '../../../theme/typography';
import { SPACING, CONTAINER } from '../../../theme/spacing';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Preencha e-mail e senha.');
      return;
    }
    setError('');
    setLoading(true);
    // Simulate login
    setTimeout(() => {
      setLoading(false);
      navigation.replace('Main');
    }, 1500);
  };

  const handleForgotPassword = () => {
    // Navigate to forgot password screen
  };

  const handleSignUp = () => {
    navigation.navigate('CadastroGeral');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>
                Vamos{'\n'}imergir no{'\n'}mundo da{'\n'}arte?
              </Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              <Input
                placeholder="Digite aqui o seu e-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                iconName="mail-outline"
              />

              <Input
                placeholder="Digite aqui a sua senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                iconName="lock-closed-outline"
              />

              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <Button
                title="Entrar"
                onPress={handleLogin}
                loading={loading}
                disabled={!email.trim() || !password.trim()}
                style={styles.loginButton}
              />

              <TouchableOpacity
                onPress={handleForgotPassword}
                style={styles.forgotPassword}
              >
                <Text style={styles.forgotPasswordText}>
                  Esqueci minha senha
                </Text>
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Não tem conta ainda? </Text>
              <TouchableOpacity onPress={handleSignUp}>
                <Text style={styles.signUpText}>Cadastre-se</Text>
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
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: CONTAINER.paddingHorizontal,
    paddingVertical: SPACING['3xl'],
    justifyContent: 'space-between',
  },
  header: {
    marginBottom: SPACING['2xl'],
  },
  title: {
    ...TYPOGRAPHY.h1,
    color: COLORS.primary,
    lineHeight: 44,
  },
  form: {
    marginBottom: SPACING['2xl'],
  },
  loginButton: {
    marginTop: SPACING.md,
  },
  forgotPassword: {
    alignSelf: 'center',
    marginTop: SPACING.base,
  },
  forgotPasswordText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  signUpText: {
    ...TYPOGRAPHY.body,
    color: COLORS.primary,
    fontWeight: '600',
  },
  errorText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.error,
    marginTop: SPACING.xs,
  },
});
