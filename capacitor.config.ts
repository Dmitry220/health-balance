import { WEB_CLIENT_ID } from "./src/utils/globalConstants";
import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.academia.health",
  appName: "HealthBalance",
  webDir: "build",
  bundledWebRuntime: false,
  ios: {
    backgroundColor: "#121212",
  },
  plugins: {
    GoogleAuth: {
      scopes: ["profile", "email"],
      forceCodeForRefreshToken: true,
      serverClientId: WEB_CLIENT_ID,
    },
  },
};

export default config;
