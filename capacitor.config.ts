import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.academia.health",
  appName: "HealthBalance",
  webDir: "build",
  bundledWebRuntime: false,
  ios: {
    contentInset: "always",
    backgroundColor: "#121212"
}
};

export default config;
