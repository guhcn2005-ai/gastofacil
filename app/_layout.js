import { ExpenseProvider } from './src/context/ExpenseContext';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';

// Manter a splash screen visivel enquanto carregamos
SplashScreen.preventAutoHideAsync();

// Configurar como as notificacoes sao exibidas
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function RootLayout() {
  useEffect(() => {
    // Esconder splash screen após 2 segundos
    const timer = setTimeout(() => {
      SplashScreen.hideAsync();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ExpenseProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="add-expense" 
          options={{ 
            presentation: 'modal', 
            title: 'Novo Gasto', 
            headerBackTitle: 'Voltar',
          }} 
        />
      </Stack>
    </ExpenseProvider>
  );
}