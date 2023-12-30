import { ServerState } from "../model/state";
import { ping } from "./api";

export class Server {
  private __status: ServerState;
  private __url: string;

  constructor(url: string, status: ServerState) {
    this.__status = status;
    this.__url = url;
  }

  get url(): string {
    return this.__url;
  }

  set url(url: string) {
    this.__url = url;
  }

  get status(): ServerState {
    return this.__status;
  }

  async ping(): Promise<void> {
    try {
      await ping(this.__url);
      this.__status = ServerState.connected;
    } catch (e) {
      this.__status = ServerState.disconnected;
    }
  }
}
