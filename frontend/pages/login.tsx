import Page from "@/components/page";
import Section from "@/components/section";
import { auth } from "@/lib/firebase";
import { Status, userState } from "@/lib/state";
import { Alert, Button, Input, Spinner } from "@material-tailwind/react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { HiExclamationCircle, HiInformationCircle } from "react-icons/hi2";
import { useRecoilValue } from "recoil";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useRecoilValue(userState);
  const router = useRouter();

  const [error, setError] = useState<String | null>(null);
  const [message, setMessage] = useState<String | null>(null);
  const [loginStatus, setLoginStatus] = useState<Status>(Status.IDLE);
  const [registerStatus, setRegisterStatus] = useState<Status>(Status.IDLE);

  const login = useCallback(
    async (username: string, password: string) => {
      try {
        setLoginStatus(Status.LOADING);
        await signInWithEmailAndPassword(auth, username, password);
        setLoginStatus(Status.SUCCESS);
        router.push("/");
      } catch {
        setError("Failed to login. Check your credentials and try again.");
        setLoginStatus(Status.FAIL);
      }
    },
    [setLoginStatus, setError],
  );

  const register = useCallback(
    async (username: string, password: string) => {
      try {
        setRegisterStatus(Status.LOADING);
        await createUserWithEmailAndPassword(auth, username, password);
        setRegisterStatus(Status.SUCCESS);
        router.push("/");
      } catch {
        setError("Failed to create account. Maybe you already have one?");
        setRegisterStatus(Status.FAIL);
      }
    },
    [setRegisterStatus, setError],
  );

  useEffect(() => {
    if (error) {
      const id = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(id);
    }
  }, [error]);

  if (user !== null) {
    setMessage("You are already logged in. Redirecting...");
    router.push("/");
  }

  return (
    <Page>
      <Section>
        <div className="flex flex-col items-center justify-center">
          <h1 className="mb-8 text-3xl font-bold">Create Account</h1>
          <div className="w-64">
            <Input
              type="email"
              placeholder="Email"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              crossOrigin={""} // NOTE: TS bug
            />
          </div>
          <div className="w-64 mt-4">
            <Input
              type="password"
              placeholder="Password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              crossOrigin={""} // NOTE: TS bug
            />
          </div>
          <Button
            color="blue"
            ripple={true}
            className="flex flex-row justify-center w-64 gap-2 mt-8 align-center"
            onClick={() => register(username, password)}
          >
            {registerStatus === Status.LOADING ? (
              <Spinner color="light-blue" className="w-4 h-4" />
            ) : null}
            <p>Create Account</p>
          </Button>
          <Button
            color="gray"
            ripple={true}
            className="flex flex-row justify-center w-64 gap-2 mt-4 align-center"
            variant="outlined"
            onClick={() => login(username, password)}
          >
            {loginStatus === Status.LOADING ? (
              <Spinner color="gray" className="w-4 h-4" />
            ) : null}
            <p>Have an account? Login</p>
          </Button>
        </div>
        <Alert
          color="red"
          className="mt-8"
          open={error !== null}
          onClose={() => setError(null)}
          animate={{
            mount: { y: 0 },
            unmount: { y: 100 },
          }}
        >
          <div className="flex flex-row items-center gap-2">
            <HiExclamationCircle />
            <p>{error}</p>
          </div>
        </Alert>
        <Alert
          color="green"
          className="mt-8"
          open={message !== null}
          onClose={() => setMessage(null)}
          animate={{
            mount: { y: 0 },
            unmount: { y: 100 },
          }}
        >
          <div className="flex flex-row items-center gap-2">
            <HiInformationCircle />
            <p>{message}</p>
          </div>
        </Alert>
      </Section>
    </Page>
  );
}
