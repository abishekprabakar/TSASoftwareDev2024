import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

interface User {
  uid: string;
  username: string;
  password: string;
}

const userState = atom<User>({
  key: "userState",
  default: {
    uid: "",
    username: "",
    password: "",
  },
  effects: [persistAtom],
});

export type { User };
export { userState };
