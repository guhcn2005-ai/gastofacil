import * as Notifications from 'expo-notifications';
import { Platform, Alert } from 'react-native';

// Configurar como as notificações serão exibidas
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Solicitar permissão para notificações
export async function requestPermissions() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#0a7ea4',
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  
  if (finalStatus !== 'granted') {
    Alert.alert('Permissão negada', 'Você não receberá notificações do app');
    return false;
  }
  
  return true;
}

// Agendar notificação de orçamento estourado
export async function scheduleBudgetNotification(totalExpenses, budget) {
  const percentage = (totalExpenses / budget) * 100;
  
  if (percentage >= 90 && percentage < 100) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '⚠️ Atenção!',
        body: `Você já usou ${percentage.toFixed(0)}% do seu orçamento mensal!`,
        data: { type: 'budget_warning' },
      },
      trigger: null, // Mostrar imediatamente
    });
  } else if (percentage >= 100) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '🚨 Orçamento estourado!',
        body: `Você ultrapassou seu orçamento mensal em R$ ${(totalExpenses - budget).toFixed(2)}`,
        data: { type: 'budget_exceeded' },
      },
      trigger: null,
    });
  }
}

// Agendar notificação de lembrete diário
export async function scheduleDailyReminder() {
  const trigger = new Date();
  trigger.setHours(20, 0, 0); // 20:00 (8 da noite)
  
  if (trigger < new Date()) {
    trigger.setDate(trigger.getDate() + 1);
  }
  
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '📝 Lembrete',
      body: 'Não esqueça de registrar seus gastos de hoje!',
      data: { type: 'daily_reminder' },
    },
    trigger: {
      hour: 20,
      minute: 0,
      repeats: true,
    },
  });
}

// Cancelar todas as notificações
export async function cancelAllNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

// Enviar notificação imediata
export async function sendImmediateNotification(title, body) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data: { type: 'immediate' },
    },
    trigger: null,
  });
}

// Listener para quando o usuário interage com a notificação
export function addNotificationListener(callback) {
  return Notifications.addNotificationResponseReceivedListener(callback);
}

// Verificar se o app tem permissão
export async function hasPermissions() {
  const { status } = await Notifications.getPermissionsAsync();
  return status === 'granted';
}