import { LoginState } from "../model/state";
import { login, register, logout } from "./api";
import { User as RecoilUser } from "../model/state";

export class User {
  private __username: string;
  private __password: string;
  private __loginState: LoginState;
  private __bearerToken: string;

  constructor(
    username: string,
    password: string,
    loginState: LoginState = LoginState.loggedOut,
    bearerToken: string = ""
  ) {
    this.__username = username;
    this.__password = password;
    this.__loginState = loginState;
    this.__bearerToken = bearerToken;
  }

  get username(): string {
    return this.__username;
  }

  get password(): string {
    return this.__password;
  }

  get status(): LoginState {
    return this.__loginState;
  }

  get token(): string {
    return this.__bearerToken;
  }

  get recoilState(): RecoilUser {
    return {
      username: this.__username,
      password: this.__password,
      loginState: this.__loginState,
      bearerToken: this.__bearerToken,
    };
  }

  async login(endpoint: string): Promise<void> {
    this.__validate_username_and_password();
    const token = await login(endpoint, this.__username, this.__password);
    this.__loginState = LoginState.loggingIn;
    this.__bearerToken = token;
  }

  async logout(endpoint: string): Promise<void> {
    if (this.__loginState == LoginState.loggedOut) {
      throw new Error("Already logged out");
    }
    await logout(endpoint, this.__bearerToken);
    this.__loginState = LoginState.loggedOut;
    this.__bearerToken = "";
  }

  async register(endpoint: string): Promise<void> {
    this.__validate_username_and_password();
    const token = await register(endpoint, this.__username, this.__password);
    this.__loginState = LoginState.loggingIn;
    this.__bearerToken = token;
  }

  private __validate_username_and_password() {
    if (this.__loginState == LoginState.loggingIn) {
      throw new Error("Already logging in");
    }
    if (this.__username == "" || this.__password == "") {
      throw new Error("Username or password is empty");
    }
  }
}
