import { atom } from "recoil";

enum LoginState {
  loggedOut,
  loggingIn,
  loggedIn,
}

interface User {
  username: string;
  password: string;
  loginState: LoginState;
  bearerToken?: string;
}

const userAtom = atom<User>({
  key: "userAtom",
  default: {
    username: "",
    password: "",
    bearerToken: "",
    loginState: LoginState.loggedOut,
  },
});

enum ServerState {
  connected,
  disconnected,
  connecting,
}

interface Server {
  url: string;
  status: ServerState;
}

const serverAtom = atom<Server>({
  key: "serverAtom",
  default: {
    url: "",
    status: ServerState.disconnected,
  },
});

export { User, userAtom, serverAtom, ServerState, LoginState };
