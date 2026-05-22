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
