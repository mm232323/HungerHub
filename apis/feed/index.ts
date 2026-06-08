import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  QueryKey,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

import type {
  FeedPost,
  GetFeedParams,
  LikeStatus,
  MerchantStory,
  SaveStatus,
} from "@/types";
import type { ErrorType } from "@/types/api-fetch";
import { buildQueryParams } from "@/utils/buildQueryParams";
import { customFetch } from "@/utils/customFetch";
import type { SecondParameter } from "@/utils/ts-helpers";

export const getFeed = async (
  params?: GetFeedParams,
  options?: RequestInit,
): Promise<FeedPost[]> => {
  return customFetch<FeedPost[]>(
    `/feed${buildQueryParams(params)}`,
    { ...options, method: "GET" },
  );
};

export function useGetFeed<
  TData = Awaited<ReturnType<typeof getFeed>>,
  TError = ErrorType<unknown>,
>(
  params?: GetFeedParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getFeed>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof customFetch>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryKey = options?.query?.queryKey ?? [
    "/feed",
    ...(params ? [params] : []),
  ];
  const queryFn = () => getFeed(params, options?.request);
  const query = useQuery({ queryKey, queryFn, ...options?.query }) as any;
  return { ...query, queryKey };
}

export const getFeedStories = async (
  options?: RequestInit,
): Promise<MerchantStory[]> => {
  return customFetch<MerchantStory[]>("/feed/stories", {
    ...options,
    method: "GET",
  });
};

export function useGetFeedStories<
  TData = Awaited<ReturnType<typeof getFeedStories>>,
  TError = ErrorType<unknown>,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof getFeedStories>>,
    TError,
    TData
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryKey = options?.query?.queryKey ?? ["/feed/stories"];
  const queryFn = () => getFeedStories(options?.request);
  const query = useQuery({ queryKey, queryFn, ...options?.query }) as any;
  return { ...query, queryKey };
}

export const likeFeedPost = async (
  id: number,
  options?: RequestInit,
): Promise<LikeStatus> => {
  return customFetch<LikeStatus>(`/feed/posts/${id}/like`, {
    ...options,
    method: "POST",
  });
};

export function useLikeFeedPost<
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof likeFeedPost>>,
    TError,
    { id: number },
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationResult<
  Awaited<ReturnType<typeof likeFeedPost>>,
  TError,
  { id: number },
  TContext
> {
  const mutationFn = ({ id }: { id: number }) =>
    likeFeedPost(id, options?.request);
  return useMutation({ mutationFn, ...options?.mutation });
}

export const saveFeedPost = async (
  id: number,
  options?: RequestInit,
): Promise<SaveStatus> => {
  return customFetch<SaveStatus>(`/feed/posts/${id}/save`, {
    ...options,
    method: "POST",
  });
};

export function useSaveFeedPost<
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof saveFeedPost>>,
    TError,
    { id: number },
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationResult<
  Awaited<ReturnType<typeof saveFeedPost>>,
  TError,
  { id: number },
  TContext
> {
  const mutationFn = ({ id }: { id: number }) =>
    saveFeedPost(id, options?.request);
  return useMutation({ mutationFn, ...options?.mutation });
}

export interface FeedCommentResponse {
  id: number;
  feedPostId?: number;
  adId?: string;
  sessionId: string;
  content: string;
  createdAt: string;
}

export const getFeedPostComments = async (
  id: number,
  options?: RequestInit,
): Promise<FeedCommentResponse[]> => {
  return customFetch<FeedCommentResponse[]>(`/feed/posts/${id}/comments`, {
    ...options,
    method: "GET",
  });
};

export function useGetFeedPostComments(
  id: number,
  options?: any
) {
  const queryKey = options?.query?.queryKey ?? ["/feed/posts/comments", id];
  const queryFn = () => getFeedPostComments(id, options?.request);
  const query = useQuery({ queryKey, queryFn, ...options?.query }) as any;
  return { ...query, queryKey };
}

export const commentFeedPost = async (
  id: number,
  data: { content: string },
  options?: RequestInit,
): Promise<FeedCommentResponse> => {
  return customFetch<FeedCommentResponse>(`/feed/posts/${id}/comment`, {
    ...options,
    method: "POST",
    headers: { "Content-Type": "application/json", ...(options?.headers || {}) },
    body: JSON.stringify(data),
  });
};

export function useCommentFeedPost(options?: any) {
  const mutationFn = ({ id, data }: { id: number, data: { content: string } }) =>
    commentFeedPost(id, data, options?.request);
  return useMutation({ mutationFn, ...options?.mutation }) as any;
}

export const getFeedAdComments = async (
  id: string,
  options?: RequestInit,
): Promise<FeedCommentResponse[]> => {
  return customFetch<FeedCommentResponse[]>(`/feed/ads/${id}/comments`, {
    ...options,
    method: "GET",
  });
};

export function useGetFeedAdComments(
  id: string,
  options?: any
) {
  const queryKey = options?.query?.queryKey ?? ["/feed/ads/comments", id];
  const queryFn = () => getFeedAdComments(id, options?.request);
  const query = useQuery({ queryKey, queryFn, ...options?.query }) as any;
  return { ...query, queryKey };
}

export const commentFeedAd = async (
  id: string,
  data: { content: string },
  options?: RequestInit,
): Promise<FeedCommentResponse> => {
  return customFetch<FeedCommentResponse>(`/feed/ads/${id}/comment`, {
    ...options,
    method: "POST",
    headers: { "Content-Type": "application/json", ...(options?.headers || {}) },
    body: JSON.stringify(data),
  });
};

export function useCommentFeedAd(options?: any) {
  const mutationFn = ({ id, data }: { id: string, data: { content: string } }) =>
    commentFeedAd(id, data, options?.request);
  return useMutation({ mutationFn, ...options?.mutation }) as any;
}

export const likeFeedAd = async (
  id: string,
  options?: RequestInit,
): Promise<any> => {
  return customFetch<any>(`/feed/ads/${id}/like`, {
    ...options,
    method: "POST",
  });
};

export function useLikeFeedAd(options?: any) {
  const mutationFn = ({ id }: { id: string }) =>
    likeFeedAd(id, options?.request);
  return useMutation({ mutationFn, ...options?.mutation }) as any;
}

export const getFeedAdLikes = async (
  id: string,
  options?: RequestInit,
): Promise<{isLiked: boolean, likes: number}> => {
  return customFetch<{isLiked: boolean, likes: number}>(`/feed/ads/${id}/likes`, {
    ...options,
    method: "GET",
  });
};

export function useGetFeedAdLikes(
  id: string,
  options?: any
) {
  const queryKey = options?.query?.queryKey ?? ["/feed/ads/likes", id];
  const queryFn = () => getFeedAdLikes(id, options?.request);
  const query = useQuery({ queryKey, queryFn, ...options?.query }) as any;
  return { ...query, queryKey };
}
