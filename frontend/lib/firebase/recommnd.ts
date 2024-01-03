import { httpsCallable } from "firebase/functions";
import { functions } from "./firebase";

export type Podcast = {
  id: string;
  title: string;
  description: string;
  url: string;
  image: string;
  source: string;
  author: string;
  tags: string[];
};

export type RecommendResponse = Podcast[];

export type RecommendRequest = {};

const _recommend = httpsCallable<RecommendRequest, RecommendResponse>(
  functions,
  "recommend",
);

/**
 * Given users needs, recommend podcasts. Firebase automatically handles
 * authentication.
 * @returns Recommended podcasts
 */
export const recommend = async (): Promise<RecommendResponse> => {
  const response = await _recommend({});
  return response.data;
};
