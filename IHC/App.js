import React, { useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  StatusBar,
  View,
  Platform,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Auth Screens
import LoginScreen from './src/components/screens/auth/LoginScreen';
import CadastroGeralScreen from './src/components/screens/auth/CadastroGeralScreen';
import PreferenciasArteScreen from './src/components/screens/auth/PreferenciasArteScreen';
import CadastroUsuarioScreen from './src/components/screens/auth/CadastroUsuarioScreen';
import CadastroArtistaScreen from './src/components/screens/auth/CadastroArtistaScreen';
import CadastroMuseuScreen from './src/components/screens/auth/CadastroMuseuScreen';
import CompletarPerfilScreen from './src/components/screens/auth/CompletarPerfilScreen';

// Main Screens
import TimelineScreen from './src/components/screens/main/TimelineScreen';
import ExposicoesScreen from './src/components/screens/main/ExposicoesScreen';
import BlogScreen from './src/components/screens/main/BlogScreen';
import PesquisarScreen from './src/components/screens/main/PesquisarScreen';
import MessagesScreen from './src/components/screens/main/MessagesScreen';
import ChatScreen from './src/components/screens/main/ChatScreen';
import ProfileScreen from './src/components/screens/main/ProfileScreen';
import ArtworkDetailScreen from './src/components/screens/main/ArtworkDetailScreen';
import PublicarArtigoScreen from './src/components/screens/main/PublicarArtigoScreen';
import PublicarObraScreen from './src/components/screens/main/PublicarObraScreen';

import { COLORS, SHADOWS } from './src/theme/colors';
import { SPACING, BORDER_RADIUS } from './src/theme/spacing';
import { TYPOGRAPHY } from './src/theme/typography';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const MessagesStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

const CREATE_OPTIONS = [
  { key: 'article', label: 'Publicar artigo', route: 'PublicarArtigo' },
  { key: 'artwork', label: 'Publicar obra', route: 'PublicarObra' },
  { key: 'portfolio', label: 'Editar portfólio', route: 'PublicarArtigo' },
];

function MessagesStackScreen() {
  return (
    <MessagesStack.Navigator screenOptions={{ headerShown: false }}>
      <MessagesStack.Screen name="MensagensLista" component={MessagesScreen} />
      <MessagesStack.Screen name="Chat" component={ChatScreen} />
    </MessagesStack.Navigator>
  );
}

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Timeline" component={TimelineScreen} />
      <HomeStack.Screen name="Exposições" component={ExposicoesScreen} />
      <HomeStack.Screen name="Blog" component={BlogScreen} />
      <HomeStack.Screen name="ArtworkDetail" component={ArtworkDetailScreen} />
    </HomeStack.Navigator>
  );
}

function MainTabs() {
  const [createMenuVisible, setCreateMenuVisible] = useState(false);
  const navigation = useNavigation();

  const toggleCreateMenu = () => setCreateMenuVisible((prev) => !prev);
  const closeCreateMenu = () => setCreateMenuVisible(false);

  const handleCreateOption = (route) => {
    closeCreateMenu();
    if (route) navigation.navigate(route);
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Timeline') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Pesquisar') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === 'Mensagens') {
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
            } else if (route.name === 'Perfil') {
              iconName = focused ? 'person' : 'person-outline';
            }
            if (!iconName) return null;
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.gray,
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 68,
            paddingBottom: 10,
            paddingTop: 10,
            paddingHorizontal: 24,
            backgroundColor: COLORS.white,
            borderTopWidth: 1,
            borderTopColor: COLORS.lightGray,
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Timeline" component={HomeStackScreen} />
        <Tab.Screen name="Pesquisar" component={PesquisarScreen} />
        <Tab.Screen
          name="Criar"
          component={TimelineScreen}
          options={{
            tabBarIcon: () => null,
            tabBarButton: (props) => {
              const isFocused = props.accessibilityState?.selected;
              return (
                <TouchableOpacity
                  {...props}
                  onPress={toggleCreateMenu}
                  activeOpacity={0.9}
                  style={[props.style, styles.createButtonWrapper]}
                >
                  <View style={[styles.createButton, isFocused ? styles.createButtonFocused : null]}>
                    <Ionicons name="add" size={30} color={COLORS.white} />
                  </View>
                </TouchableOpacity>
              );
            },
          }}
        />
        <Tab.Screen name="Mensagens" component={MessagesStackScreen} />
        <Tab.Screen name="Perfil" component={ProfileScreen} />
      </Tab.Navigator>

      <Modal
        visible={createMenuVisible}
        transparent
        animationType="fade"
        onRequestClose={closeCreateMenu}
      >
        <TouchableWithoutFeedback onPress={closeCreateMenu}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.menuWrapper}>
                <View style={styles.menuCardContainer}>
                  <View style={styles.menuCard}>
                    {CREATE_OPTIONS.map((option, index) => (
                      <TouchableOpacity
                        key={option.key}
                        style={styles.menuItem}
                        activeOpacity={0.75}
                        onPress={() => handleCreateOption(option.route)}
                      >
                        <Text style={styles.menuItemText}>{option.label}</Text>
                        {index < CREATE_OPTIONS.length - 1 && <View style={styles.menuDivider} />}
                      </TouchableOpacity>
                    ))}
                  </View>
                  <View style={styles.menuPointer} />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

export default function App() {
  return (
    <View style={{ flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0, backgroundColor: COLORS.white }}>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}
        >
          {/* Auth Flow */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="CadastroGeral" component={CadastroGeralScreen} />
          <Stack.Screen name="CadastroUsuario" component={CadastroUsuarioScreen} />
          <Stack.Screen name="CadastroArtista" component={CadastroArtistaScreen} />
          <Stack.Screen name="CadastroMuseu" component={CadastroMuseuScreen} />
          <Stack.Screen name="PreferenciasArte" component={PreferenciasArteScreen} />
          <Stack.Screen name="CompletarPerfil" component={CompletarPerfilScreen} />

          {/* Main App */}
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="PublicarArtigo" component={PublicarArtigoScreen} />
          <Stack.Screen name="PublicarObra" component={PublicarObraScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  createButtonWrapper: {
    top: -16,
  },
  createButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 4,
    borderColor: COLORS.white,
    ...SHADOWS.large,
  },
  createButtonFocused: {
    transform: [{ scale: 1.02 }],
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
  menuWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 108,
    alignItems: 'center',
  },
  menuCardContainer: {
    alignItems: 'center',
  },
  menuCard: {
    width: 210,
    backgroundColor: COLORS.white,
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 22,
    ...SHADOWS.medium,
  },
  menuItem: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  menuDivider: {
    width: '84%',
    height: 1,
    backgroundColor: COLORS.primary,
    opacity: 0.35,
    marginVertical: 12,
  },
  menuItemText: {
    ...TYPOGRAPHY.buttonSmall,
    color: COLORS.primary,
  },
  menuPointer: {
    width: 16,
    height: 16,
    backgroundColor: COLORS.white,
    transform: [{ rotate: '45deg' }],
    marginTop: -8,
    ...SHADOWS.small,
  },
});
