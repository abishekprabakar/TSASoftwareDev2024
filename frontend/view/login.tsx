import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import {
  Appbar,
  Button,
  IconButton,
  Snackbar,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { useRecoilState, useRecoilValue } from "recoil";
import { User } from "../controller";
import { ServerState, serverAtom, userAtom } from "../model/state";
import { createStackNavigator } from "@react-navigation/stack";

const stack = createStackNavigator();

export default function Login() {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <stack.Screen name="Login" component={_login} />
      <stack.Screen name="Register" component={_register} />
      <stack.Screen
        name="Server Not Connected"
        component={_server_not_connected}
      />
    </stack.Navigator>
  );
}

function _server_not_connected({}) {
  const server = useRecoilValue(serverAtom);
  const theme = useTheme();

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    if (server.status === ServerState.connected) {
      snackbar("Server connection restored!");
    }
  }, [server.status]);

  const snackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  return (
    <View
      style={{
        display: "flex",
        gap: 16,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          padding: 16,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconButton
          icon="alert"
          size={64}
          iconColor={theme.colors.error}
          style={{ alignSelf: "center" }}
        />
        <Text
          variant="titleLarge"
          style={{
            alignSelf: "center",
            textAlign: "center",
            fontSize: 18,
          }}
        >
          Oops! The server is not connected.
        </Text>
        <Text
          style={{
            alignSelf: "center",
            textAlign: "center",
            fontSize: 16,
          }}
        >
          Please check your internet connection and try again.
        </Text>
        <Button
          mode="contained"
          onPress={() => {
            snackbar("Server connection restored!");
          }}
          style={{
            marginTop: 16,
          }}
        >
          Retry
        </Button>
      </View>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
}

type loginProps = {
  navigation: any;
};

function _login({ navigation }: loginProps) {
  const [user, setUser] = useRecoilState(userAtom);
  const server = useRecoilValue(serverAtom);
  const theme = useTheme();

  if (server.status === ServerState.disconnected) {
    navigation.navigate("Server Not Connected");
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const snackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  return (
    <View
      style={{
        display: "flex",
        gap: 16,
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Appbar.Header>
        <Appbar.Content title="Login" />
      </Appbar.Header>

      <View
        style={{
          display: "flex",
          height: "80%",
          padding: 16,
          justifyContent: "center",
        }}
      >
        <IconButton
          icon="login"
          size={64}
          iconColor={theme.colors.primary}
          style={{ alignSelf: "center" }}
        />
        <Text
          variant="titleLarge"
          style={{
            alignSelf: "center",
            textAlign: "center",
            fontFamily: "serif",
            fontSize: 18,
          }}
        >
          Join us to chat with your personalized counselor.
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            padding: 16,
            paddingHorizontal: 32,
          }}
        >
          <TextInput
            label="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
          />
          <Button
            mode="contained"
            onPress={async () => {
              try {
                let user = new User(username, password);
                await user.login(server.url);
                setUser(user.recoilState);
                snackbar("Logged in successfully!");
              } catch (e) {
                snackbar(`Login failed: ${e}`);
              }
            }}
          >
            Login
          </Button>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            paddingLeft: 32,
          }}
        >
          <Text variant="bodyMedium">First time user?</Text>
          <TouchableOpacity
            onPress={async () => {
              try {
                let user = new User(username, password);
                await user.register(server.url);
                setUser(user.recoilState);
                snackbar("Registered successfully!");
              } catch (e) {
                snackbar(`Registration failed: ${e}`);
              }
            }}
          >
            <Text
              variant="bodyMedium"
              style={{
                color: theme.colors.primary,
              }}
            >
              Register here
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          flexGrow: 1,
          height: "100%",
        }}
      />
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
      >
        {snackbarMessage}
      </Snackbar>
      <StatusBar style="auto" />
    </View>
  );
}

type registerProps = {
  navigation: any;
};

function _register({ navigation }: registerProps) {
  const [user, setUser] = useRecoilState(userAtom);
  const server = useRecoilValue(serverAtom);
  const theme = useTheme();

  if (server.status === ServerState.disconnected) {
    navigation.navigate("Server Not Connected");
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const snackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  return (
    <View
      style={{
        display: "flex",
        gap: 16,
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Appbar.Header>
        <Appbar.Content title="Register" />
      </Appbar.Header>

      <View
        style={{
          display: "flex",
          height: "80%",
          padding: 16,
          justifyContent: "center",
        }}
      >
        <IconButton
          icon="login"
          size={64}
          iconColor={theme.colors.primary}
          style={{ alignSelf: "center" }}
        />
        <Text
          variant="titleLarge"
          style={{
            alignSelf: "center",
            textAlign: "center",
            fontFamily: "serif",
            fontSize: 18,
          }}
        >
          Join us to chat with your personalized counselor.
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            padding: 16,
            paddingHorizontal: 32,
          }}
        >
          <TextInput
            label="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
          />
          <Button
            mode="contained"
            onPress={async () => {
              try {
                let user = new User(username, password);
                await user.register(server.url);
                setUser(user.recoilState);
                snackbar("Registered successfully!");
              } catch (e) {
                snackbar(`Registration failed: ${e}`);
              }
            }}
          >
            Register
          </Button>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            paddingLeft: 32,
          }}
        >
          <Text variant="bodyMedium">Already have an account?</Text>
          <TouchableOpacity
            onPress={async () => {
              try {
                let user = new User(username, password);
                await user.login(server.url);
                setUser(user.recoilState);
                snackbar("Logged in successfully!");
              } catch (e) {
                snackbar(`Login failed: ${e}`);
              }
            }}
          >
            <Text
              variant="bodyMedium"
              style={{
                color: theme.colors.primary,
              }}
            >
              Login here
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          flexGrow: 1,
          height: "100%",
        }}
      />
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
      >
        {snackbarMessage}
      </Snackbar>
      <StatusBar style="auto" />
    </View>
  );
}
