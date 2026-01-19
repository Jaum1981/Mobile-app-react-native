# Arte App - React Native

Aplicativo mobile para explorar e interagir com o mundo da arte. Desenvolvido em React Native com Expo.

## 📱 Telas

### Autenticação
- **Login** - Tela de entrada com e-mail e senha
- **Cadastro Geral** - Informações básicas e seleção de perfil (apreciador, artista ou museu)
- **Cadastro Usuário** - Dados adicionais para apreciadores
- **Cadastro Artista** - Dados específicos para artistas
- **Cadastro Museu** - Dados específicos para museus
- **Preferências de Arte** - Seleção de linguagens artísticas preferidas
- **Completar Perfil** - Upload de foto e descrição

### Principal
- **Timeline** - Feed de notícias sobre arte
- **Exposições** - Exposições em destaque e artistas
- **Blog** - Publicações e artigos
- **Pesquisar** - Busca por artistas, obras e museus

## 🚀 Instalação

```bash
# Instalar dependências
npm install

# Iniciar o projeto
npx expo start
```

## 📁 Estrutura do Projeto

```
arte-app/
├── App.js                    # Entrada principal e navegação
├── src/
│   ├── components/
│   │   └── common/           # Componentes reutilizáveis
│   │       ├── Avatar.js
│   │       ├── Button.js
│   │       ├── Card.js
│   │       ├── Header.js
│   │       ├── Input.js
│   │       ├── Select.js
│   │       └── Tag.js
│   ├── screens/
│   │   ├── auth/             # Telas de autenticação
│   │   │   ├── LoginScreen.js
│   │   │   ├── CadastroGeralScreen.js
│   │   │   ├── CadastroUsuarioScreen.js
│   │   │   ├── CadastroArtistaScreen.js
│   │   │   ├── CadastroMuseuScreen.js
│   │   │   ├── PreferenciasArteScreen.js
│   │   │   └── CompletarPerfilScreen.js
│   │   └── main/             # Telas principais
│   │       ├── TimelineScreen.js
│   │       ├── ExposicoesScreen.js
│   │       ├── BlogScreen.js
│   │       └── PesquisarScreen.js
│   └── theme/                # Tema e estilos globais
│       ├── colors.js
│       ├── typography.js
│       └── spacing.js
├── package.json
└── app.json
```

## 🎨 Design System

### Cores
- **Primary**: `#6B4EAA` (Roxo)
- **Accent**: `#E8E0F5` (Roxo claro)
- **Background**: `#FFFFFF`

### Componentes
- `Button` - Botões com variantes (primary, secondary, outline, ghost)
- `Input` - Campos de texto com ícones
- `Select` - Dropdown com modal
- `Tag` - Tags selecionáveis para categorias
- `Card` - Cards para conteúdo (news, blog, exhibition)
- `Avatar` - Avatares com upload
- `Header` - Headers reutilizáveis

## 📦 Dependências

- **React Navigation** - Navegação
- **Expo** - Framework de desenvolvimento
- **@expo/vector-icons** - Ícones

## 🔧 Configuração

O app usa React Navigation para gerenciar a navegação entre telas. A estrutura inclui:

1. **Stack Navigator** - Fluxo de autenticação
2. **Bottom Tab Navigator** - Navegação principal do app

## 📝 Notas

- As imagens usam placeholders do Picsum e Pravatar
- O fluxo de cadastro é baseado no tipo de usuário selecionado
- O tema segue o design system definido nos mockups
