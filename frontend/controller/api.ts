import { Podcast } from "./podcast";

/**
 * @param endpoint Endpoint of the API
 * @param username Username
 * @param password Password
 * @returns Token of the user
 */
async function login(
  endpoint: string,
  username: string,
  password: string
): Promise<string> {
  const response = await fetch(endpoint + "/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (response.status != 200) {
    const data = await response.json();
    throw new Error(data.message);
  } else {
    const data = await response.json();
    return (
      data as {
        token: string;
      }
    )["token"];
  }
}

/**
 * @param endpoint Endpoint of the API
 * @param token Token of the user
 * @returns Message of the logout
 * @description Logout the user
 */
async function logout(endpoint: string, token: string): Promise<string> {
  const response = await fetch(endpoint + "/user/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  if (response.status != 200) {
    throw new Error("Error logging out");
  } else {
    return (
      (await response.json()) as {
        message: string;
      }
    )["message"];
  }
}

/**
 * @param endpoint Endpoint of the API
 * @param username Username
 * @param password Password
 * @returns Token of the user
 */
async function register(
  endpoint: string,
  username: string,
  password: string
): Promise<string> {
  const response = await fetch(endpoint + "/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (response.status != 200) {
    const data = await response.json();
    throw new Error(data.message);
  } else {
    const data = await response.json();
    return (
      data as {
        token: string;
      }
    )["token"];
  }
}

/**
 *
 * @param endpoint The endpoint of the API
 * @param token The token of the user
 * @returns The preferences of the user
 */
async function getPreferences(
  endpoint: string,
  token: string
): Promise<String[]> {
  const response = await fetch(endpoint + "/user/preferences", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  if (response.status != 200) {
    throw new Error("Error getting preferences");
  } else {
    return (
      (await response.json()) as {
        preferences: String[];
      }
    )["preferences"];
  }
}

/**
 *
 * @param endpoint The endpoint of the API
 * @param token The token of the user
 * @param preferences The preferences of the user
 */
async function setPreferences(
  endpoint: string,
  token: string,
  preferences: String[]
): Promise<void> {
  const response = await fetch(endpoint + "/user/preferences", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ preferences }),
  });
  if (response.status != 200) {
    throw new Error("Error setting preferences");
  }
}

/**
 *
 * @param endpoint The endpoint of the API
 * @param token The token of the user
 * @param message The message to send
 * @returns The response of the bot
 */
async function chat(
  endpoint: string,
  token: string,
  message: string
): Promise<string> {
  const response = await fetch(endpoint + "/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: message,
  });
  if (response.status != 200) {
    throw new Error("Error sending message");
  } else {
    return await response.text();
  }
}

/**
 *
 * @param endpoint The endpoint of the API
 * @param token The token of the user
 * @returns A list of recommended podcasts
 */
async function getRecommendedPodcasts(
  endpoint: string,
  token: string
): Promise<Podcast[]> {
  const response = await fetch(endpoint + "/podcast/recommend", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  if (response.status != 200) {
    throw new Error("Error getting recommended podcasts");
  } else {
    return await response.json();
  }
}

/**
 * @param endpoint The endpoint of the API
 * @returns A void promise
 */
async function ping(endpoint: string): Promise<void> {
  const response = await fetch(endpoint + "/ping", {
    method: "GET",
  });
  if (response.status != 200) {
    throw new Error("Error pinging server");
  }
}

export {
  login,
  logout,
  register,
  getPreferences,
  setPreferences,
  chat,
  getRecommendedPodcasts,
  ping
};
