# 💰 GastoFácil - App de Controle de Gastos para Aula de PM1

Aplicativo mobile para controle financeiro pessoal desenvolvido com **React Native** e **Expo**.

---

## 📱 Sobre o App

O GastoFácil ajuda o usuário a gerenciar seus gastos diários, acompanhar o orçamento mensal e ter controle total das finanças pessoais de forma simples e intuitiva.

---

## ✨ Funcionalidades

| Tela | Funcionalidade |
|------|----------------|
| **Dashboard** | Exibe saldo atual, barra de progresso do orçamento e últimos 5 gastos |
| **Adicionar Gasto** | Modal para registrar despesa com descrição, valor e categoria |
| **Histórico** | Lista completa de todos os gastos ordenados por data |
| **Configurações** | Define orçamento mensal e ativa/desativa notificações |
| **Excluir Gasto** | Remove gasto individual com feedback tátil |

### Categorias disponíveis:
- 🍔 Alimentação
- 🚗 Transporte  
- 🎬 Entretenimento
- 💡 Contas
- 🏥 Saúde
- 🛍️ Compras
- 📦 Outros

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Finalidade |
|------------|--------|------------|
| React Native | 0.75.0 | Framework mobile |
| Expo | 52.0.0 | Plataforma de desenvolvimento |
| Expo Router | 3.5.0 | Navegação baseada em arquivos |
| Context API | - | Gerenciamento de estado global |
| AsyncStorage | 1.23.0 | Persistência local de dados |
| Lucide Icons | 0.263.0 | Ícones do app |
| Expo Haptics | 13.0.0 | Feedback tátil |
| Expo Notifications | 0.27.0 | Notificações locais |

---

## 📁 Estrutura Completa do Projeto

```
GastoFácil/
│
├── app/                               # 📱 Navegação (Expo Router)
│   ├── _layout.js                     # Layout raiz com Provider e configuração de rotas
│   ├── add-expense.js                 # Modal para adicionar novos gastos
│   │
│   └── (tabs)/                        # Telas com navegação por abas
│       ├── _layout.js                 # Configuração das 3 abas (Home, Histórico, Config)
│       ├── index.js                   # Dashboard principal
│       ├── history.js                 # Lista de todos os gastos
│       └── settings.js                # Configurações do app
│
├── src/                               # 🧠 Código fonte
│   │
│   ├── context/                       # Estado global
│   │   └── ExpenseContext.js          # Provider com funções: add, delete, update, getSummary
│   │
│   ├── components/                    # Componentes reutilizáveis
│   │   ├── ExpenseCard.js             # Card individual (descrição, valor, categoria, data)
│   │   ├── SummaryCard.js             # Card resumo (saldo, progresso, gastos)
│   │   └── CategoryPicker.js          # Modal de seleção de categoria
│   │
│   ├── hooks/                         # Hooks customizados
│   │   └── useExpenses.js             # Hook para acessar o contexto facilmente
│   │
│   ├── services/                      # Serviços externos
│   │   └── NotificationService.js     # Configuração de notificações locais
│   │
│   └── utils/                         # Utilitários
│       ├── constants.js               # Categorias (label, emoji, cor)
│       └── formatters.js              # Funções de formatação (moeda, data)
│
├── assets/                            # 🖼️ Recursos estáticos
│   ├── icon.png                       # Ícone do app
│   ├── splash.png                     # Tela de abertura
│   └── adaptive-icon.png              # Ícone adaptativo Android
│
├── app.json                           # ⚙️ Configuração do Expo
├── package.json                       # 📦 Dependências e scripts
├── babel.config.js                    # 🔧 Configuração do Babel (necessário para Router)
└── README.md                          # 📚 Documentação
```

---

## 📝 Descrição Detalhada de Cada Arquivo

### 🔹 app/_layout.js
```javascript
// Função: Layout raiz do app
// - Define o ExpenseProvider para compartilhar dados globalmente
// - Configura as rotas (abas + modal)
// - Configura notificações
// - Gerencia a tela de splash
```

### 🔹 app/(tabs)/index.js (Dashboard)
```javascript
// Função: Tela inicial
// - Busca gastos e resumo do ExpenseContext
// - Exibe SummaryCard com saldo e progresso
// - Lista os 5 últimos gastos
// - Botão flutuante para adicionar gastos
```

### 🔹 app/(tabs)/history.js
```javascript
// Função: Histórico completo
// - Lista todos os gastos do mais recente para o mais antigo
// - Cada item é um ExpenseCard com opção de excluir
```

### 🔹 app/(tabs)/settings.js
```javascript
// Função: Configurações
// - Define orçamento mensal (salva no AsyncStorage)
// - Ativa/desativa notificações
// - Exibe informações do app
```

### 🔹 app/add-expense.js
```javascript
// Função: Modal de adição
// - Campos: descrição, valor, categoria
// - Modal interno para selecionar categoria
// - Valida campos obrigatórios
// - Feedback haptic ao salvar
```

### 🔹 src/context/ExpenseContext.js
```javascript
// Função: Coração do app (estado global)
// Estado: expenses (array de gastos)
// Funções:
//   - addExpense: adiciona novo gasto com ID único
//   - deleteExpense: remove gasto por ID
//   - updateExpense: atualiza gasto existente
//   - getSummary: calcula total, percentual, categorias
// Persistência: AsyncStorage (salva automaticamente)
```

### 🔹 src/components/ExpenseCard.js
```javascript
// Função: Exibir um gasto individual
// Props: expense (objeto com id, description, amount, category, date)
// - Mostra emoji e cor da categoria
// - Exclui gasto com confirmação tátil
```

### 🔹 src/components/SummaryCard.js
```javascript
// Função: Card de resumo financeiro
// Props: summary (totalExpenses, totalBudget, percentageUsed)
// - Exibe saldo atual (orçamento - gastos)
// - Barra de progresso colorida (vermelha se >80%)
// - Mostra total de gastos e orçamento
```

### 🔹 src/utils/constants.js
```javascript
// Função: Dados estáticos das categorias
// Cada categoria tem: label (nome), emoji (ícone), color (cor)
// Usado em: CategoryPicker, ExpenseCard
```

### 🔹 src/services/NotificationService.js
```javascript
// Função: Gerenciar notificações
// - requestPermissions: pede permissão ao usuário
// - scheduleBudgetNotification: alerta quando orçamento atinge 90% ou 100%
// - scheduleDailyReminder: lembrete diário às 20h
// - cancelAllNotifications: cancela todas as notificações
```

---

## 🚀 Passo a Passo de Criação do Projeto

### Pré-requisitos
- Node.js 14+ instalado
- npm ou yarn
- Conta no GitHub (opcional)
- Expo Go instalado no celular

### Passo 1: Criar o projeto base
```bash
# Criar projeto com template blank (JavaScript puro)
npx create-expo-app GastoFácil --template blank

# Entrar na pasta do projeto
cd GastoFácil
```

### Passo 2: Instalar dependências necessárias
```bash
# Instalar Expo Router e dependências de navegação
npx expo install expo-router react-native-screens react-native-safe-area-context

# Instalar outras dependências do projeto
npm install @react-native-async-storage/async-storage expo-notifications expo-haptics lucide-react-native react-native-paper
```

### Passo 3: Configurar o Babel
Criar arquivo `babel.config.js`:
```javascript
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['expo-router/babel'],
  };
};
```

### Passo 4: Configurar o package.json
Adicionar a linha `"main": "expo-router/entry"` no `package.json`:
```json
{
  "name": "gastofacil",
  "version": "1.0.0",
  "main": "expo-router/entry",  // ← LINHA ESSENCIAL
  "scripts": {
    "start": "expo start",
    ...
  }
}
```

### Passo 5: Criar estrutura de pastas
```bash
# Criar pastas do app
mkdir app
mkdir app/(tabs)

# Criar pastas do src
mkdir src
mkdir src/context
mkdir src/components
mkdir src/hooks
mkdir src/services
mkdir src/utils

# Criar pasta de assets
mkdir assets
```

### Passo 6: Criar os arquivos do app

#### app/_layout.js
```javascript
import { ExpenseProvider } from '../src/context/ExpenseContext';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <ExpenseProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="add-expense" options={{ presentation: 'modal', title: 'Novo Gasto' }} />
      </Stack>
    </ExpenseProvider>
  );
}
```

#### app/(tabs)/_layout.js
```javascript
import { Tabs } from 'expo-router';
import { Home, Clock, Settings } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#0a7ea4' }}>
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({ color }) => <Home size={24} color={color} /> }} />
      <Tabs.Screen name="history" options={{ title: 'Histórico', tabBarIcon: ({ color }) => <Clock size={24} color={color} /> }} />
      <Tabs.Screen name="settings" options={{ title: 'Configurações', tabBarIcon: ({ color }) => <Settings size={24} color={color} /> }} />
    </Tabs>
  );
}
```

#### app/(tabs)/index.js (Dashboard)
```javascript
import { View, Text, ScrollView, Pressable, StyleSheet, FlatList } from 'react-native';
import { useExpenses } from '../../src/context/ExpenseContext';
import { ExpenseCard } from '../../src/components/ExpenseCard';
import { SummaryCard } from '../../src/components/SummaryCard';
import { Plus } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';

export default function HomeScreen() {
  const { expenses, getSummary } = useExpenses();
  const router = useRouter();
  const summary = getSummary();
  const recentExpenses = [...expenses].reverse().slice(0, 5);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <SummaryCard summary={summary} />
        <Text style={styles.sectionTitle}>Últimos Gastos</Text>
        {recentExpenses.map(expense => (
          <ExpenseCard key={expense.id} expense={expense} />
        ))}
      </ScrollView>
      <Pressable style={styles.fab} onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        router.push('/add-expense');
      }}>
        <Plus size={28} color="#fff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  scrollView: { flex: 1, padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12, color: '#11181C' },
  fab: { position: 'absolute', bottom: 30, right: 20, width: 56, height: 56, borderRadius: 28, backgroundColor: '#0a7ea4', justifyContent: 'center', alignItems: 'center' }
});
```

### Passo 7: Criar o Context (Estado Global)

#### src/context/ExpenseContext.js
```javascript
import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExpenseContext = createContext();

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const STORAGE_KEY = '@gastofacil_expenses';
  const DEFAULT_BUDGET = 2000;

  useEffect(() => { loadExpenses(); }, []);

  const loadExpenses = async () => {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (stored) setExpenses(JSON.parse(stored));
  };

  const saveExpenses = async (newExpenses) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newExpenses));
    setExpenses(newExpenses);
  };

  const addExpense = async (expense) => {
    const newExpense = { ...expense, id: Date.now().toString() };
    await saveExpenses([...expenses, newExpense]);
  };

  const deleteExpense = async (id) => {
    await saveExpenses(expenses.filter(e => e.id !== id));
  };

  const getSummary = () => {
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    return {
      totalExpenses: total,
      totalBudget: DEFAULT_BUDGET,
      percentageUsed: (total / DEFAULT_BUDGET) * 100,
    };
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, deleteExpense, getSummary }}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  return useContext(ExpenseContext);
}
```

### Passo 8: Configurar o app.json
```json
{
  "expo": {
    "name": "GastoFácil",
    "slug": "gastofacil",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#0a7ea4"
    }
  }
}
```

### Passo 9: Executar o app
```bash
# Limpar cache e iniciar
npx expo start -c

# Escanear QR Code com Expo Go
```

---

## 🧪 Como Testar

| Método | Comando |
|--------|---------|
| **Celular físico** | Escanear QR Code no Expo Go |
| **Emulador Android** | `npm run android` |
| **Emulador iOS** | `npm run ios` (apenas Mac) |
| **Navegador web** | `npm run web` |

---

## 📊 Fluxo de Dados Explicado

```
1. Usuário abre o app
   ↓
2. ExpenseProvider carrega dados do AsyncStorage
   ↓
3. Dashboard exibe SummaryCard e lista de gastos
   ↓
4. Usuário clica no botão +
   ↓
5. Abre modal add-expense
   ↓
6. Usuário preenche descrição, valor e categoria
   ↓
7. addExpense() é chamado
   ↓
8. Novo gasto é salvo no AsyncStorage
   ↓
9. Estado global é atualizado
   ↓
10. Dashboard e Histórico re-renderizam automaticamente
```

---

## 🐛 Comandos Úteis para Debug

| Comando | Quando usar |
|---------|-------------|
| `npx expo start -c` | Limpar cache (tela em branco) |
| `npx expo start --tunnel` | Rede Wi-Fi problemática |
| `npx expo-doctor` | Verificar problemas no projeto |
| `npm install --legacy-peer-deps` | Conflito de dependências |

---

## 📦 Dependências Completas (package.json)

```json
{
  "name": "gastofacil",
  "version": "1.0.0",
  "main": "expo-router/entry",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "expo": "^52.0.0",
    "expo-router": "^3.5.0",
    "expo-notifications": "^0.27.0",
    "expo-haptics": "^13.0.0",
    "expo-splash-screen": "^0.27.0",
    "react": "^18.3.0",
    "react-native": "^0.75.0",
    "@react-native-async-storage/async-storage": "^1.23.0",
    "react-native-safe-area-context": "^4.10.0",
    "react-native-screens": "^3.31.0",
    "lucide-react-native": "^0.263.0",
    "react-native-paper": "^5.12.0"
  }
}
```

---

## 👨‍💻 Autor

**Gustavo** - [guhcn2005-ai](https://github.com/guhcn2005-ai)

---

## 📄 Licença

MIT

---

*Desenvolvido com React Native e Expo - Projeto de conclusão*
```

## Agora salve e suba:

```powershell
# Criar o arquivo
echo "# GastoFácil" > README.md
# Depois abra o arquivo e cole o conteúdo acima

# Ou usar comando direto
git add README.md
git commit -m "Add README completo com passo a passo"
git push
```


