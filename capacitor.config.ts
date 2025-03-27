import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
   appId: 'com.yournew.appid',
   appName: 'JustGo',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;