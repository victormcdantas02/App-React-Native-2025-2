const Parse: any = require('parse/react-native');
import AsyncStorage from '@react-native-async-storage/async-storage';

const PARSE_APPLICATION_ID = process.env.EXPO_PUBLIC_PARSE_APP_ID!;
const PARSE_JAVASCRIPT_KEY = process.env.EXPO_PUBLIC_PARSE_JS_KEY!;
const PARSE_HOST_URL = process.env.EXPO_PUBLIC_PARSE_HOST_URL!;

export const initializeParse = () => {
  Parse.setAsyncStorage(AsyncStorage);
  Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
  Parse.serverURL = PARSE_HOST_URL;
};