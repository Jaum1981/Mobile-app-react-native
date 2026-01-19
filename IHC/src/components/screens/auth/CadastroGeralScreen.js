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
import Button from '../../common/Button';
import Input from '../../common/Input';
import Select from '../../common/Select';
import { COLORS } from '../../../theme/colors';
import { TYPOGRAPHY } from '../../../theme/typography';
import { SPACING, CONTAINER } from '../../../theme/spacing';

const ROLE_OPTIONS = [
  { label: 'Sou apreciador', value: 'apreciador' },
  { label: 'Sou artista', value: 'artista' },
  { label: 'Sou museu', value: 'museu' },
];

export default function CadastroGeralScreen({ navigation }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cpfCnpj: '',
    password: '',
    role: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (!isFormValid()) {
      setError('Preencha todos os campos para continuar.');
      return;
    }
    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      // Navigate based on role
      switch (formData.role) {
        case 'apreciador':
          navigation.navigate('CadastroUsuario', { formData });
          break;
        case 'artista':
          navigation.navigate('CadastroArtista', { formData });
          break;
        case 'museu':
          navigation.navigate('CadastroMuseu', { formData });
          break;
        default:
          // Handle error
          break;
      }
    }, 500);
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const isFormValid = () => {
    return (
      formData.name &&
      formData.email &&
      formData.cpfCnpj &&
      formData.password &&
      formData.role
    );
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
                Precisamos{'\n'}de alguns{'\n'}dados
              </Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              <Input
                placeholder="Digite aqui o seu nome completo"
                value={formData.name}
                onChangeText={(value) => updateField('name', value)}
                iconName="person-outline"
                autoCapitalize="words"
              />

              <Input
                placeholder="Digite aqui o seu e-mail"
                value={formData.email}
                onChangeText={(value) => updateField('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
                iconName="mail-outline"
              />

              <Input
                placeholder="Digite aqui o seu CPF/CNPJ"
                value={formData.cpfCnpj}
                onChangeText={(value) => updateField('cpfCnpj', value)}
                keyboardType="numeric"
                iconName="card-outline"
              />

              <Input
                placeholder="Digite aqui a sua senha"
                value={formData.password}
                onChangeText={(value) => updateField('password', value)}
                secureTextEntry
                iconName="lock-closed-outline"
              />

              <Text style={styles.roleLabel}>
                Quem você é no mundo das artes?
              </Text>

              <Select
                placeholder="Escolha uma opção"
                value={formData.role}
                options={ROLE_OPTIONS}
                onSelect={(value) => updateField('role', value)}
              />

              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <Button
                title="Próximo"
                onPress={handleNext}
                loading={loading}
                disabled={!isFormValid()}
                style={styles.nextButton}
              />
            </View>

            {/* Footer */}
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
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: CONTAINER.paddingHorizontal,
    paddingVertical: SPACING['2xl'],
    justifyContent: 'space-between',
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
    marginBottom: SPACING['2xl'],
  },
  roleLabel: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
    marginTop: SPACING.sm,
  },
  nextButton: {
    marginTop: SPACING.md,
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
  loginText: {
    ...TYPOGRAPHY.body,
    color: COLORS.primary,
    fontWeight: '600',
  },
  errorText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.error,
    marginTop: SPACING.sm,
  },
});
