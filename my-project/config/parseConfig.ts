export const PARSE_CONFIG = {
  applicationId: process.env.EXPO_PUBLIC_PARSE_APP_ID || '',
  javascriptKey: process.env.EXPO_PUBLIC_PARSE_JS_KEY || '',
  serverURL: process.env.EXPO_PUBLIC_PARSE_HOST_URL || 'https://parseapi.back4app.com',
};

export const initializeParse = () => {
  if (!PARSE_CONFIG.applicationId || !PARSE_CONFIG.javascriptKey) {
    console.error('⚠️ Configuração do Parse incompleta!');
  } else {
    console.log('✅ Parse configurado');
  }
};