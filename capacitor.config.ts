import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
   appId: 'com.yournew.appid',
  appName: 'RedBus',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;