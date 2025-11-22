import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen 
        name="signup" 
        options={{ 
          title: 'Cadastro',
          headerStyle: { backgroundColor: '#3b82f6' },
          headerTintColor: '#fff',
        }} 
      />
    </Stack>
  );
}