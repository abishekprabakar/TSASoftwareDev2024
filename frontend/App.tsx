import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Appbar, BottomNavigation, PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoginScreen from "./view/login";
import { RecoilRoot } from "recoil";

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Home" />
      </Appbar.Header>
      <Text>Home Page</Text>
      <StatusBar style="auto" />
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Settings" />
      </Appbar.Header>
      <Text>Settings Page</Text>
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "home", title: "Home", focusedIcon: "home" },
    { key: "login", title: "Login", focusedIcon: "login" },
    { key: "settings", title: "Settings", focusedIcon: "cog" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    login: LoginScreen,
    settings: SettingsScreen,
  });

  return (
    <RecoilRoot>
      <SafeAreaProvider>
        <PaperProvider>
          <NavigationContainer>
            <BottomNavigation
              navigationState={{ index, routes }}
              onIndexChange={setIndex}
              renderScene={renderScene}
            />
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
