import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Clock, Settings } from 'lucide-react-native';
import HomeScreen from './index';
import HistoryScreen from './history';
import SettingsScreen from './settings';
import { useEffect } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { requestPermissions } from '../../src/service/NotificationService';
const Tab = createBottomTabNavigator();

export default function TabsLayout() {
  useEffect(() => {
    requestPermissions();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#0a7ea4',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#e5e5e5',
          borderTopWidth: 1,
          paddingBottom: 5,
          paddingTop: 5,
        }
      }}
    >
      <Tab.Screen 
        name="index" 
        component={HomeScreen} 
        options={{ 
          title: 'Home',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
          headerTitle: 'GastoFácil',
        }} 
      />
      <Tab.Screen 
        name="history" 
        component={HistoryScreen} 
        options={{ 
          title: 'Histórico',
          tabBarLabel: 'Histórico',
          tabBarIcon: ({ color }) => <Clock size={24} color={color} />,
          headerTitle: 'Histórico de Gastos',
        }} 
      />
      <Tab.Screen 
        name="settings" 
        component={SettingsScreen} 
        options={{ 
          title: 'Configurações',
          tabBarLabel: 'Configurações',
          tabBarIcon: ({ color }) => <Settings size={24} color={color} />,
          headerTitle: 'Configurações',
        }} 
      />
    </Tab.Navigator>
  );
}