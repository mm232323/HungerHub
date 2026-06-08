import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { customFetch } from "@/utils/api";
import { useUser } from "@clerk/nextjs";

export interface CreateAdPayload {
  title: string;
  description: string;
  img: string;
  providedProduct?: number | null;
}

export function useCreateAd() {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: async (payload: CreateAdPayload) => {
      const ownerUserName = user?.username || user?.primaryEmailAddress?.emailAddress?.split("@")[0] || "";
      try {
        const response = await customFetch("/ads", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-owner-user-name": ownerUserName,
          },
          body: JSON.stringify(payload),
        });
        return response;
      } catch (err: any) {
        throw new Error(err?.data?.error || err.message || "Failed to create ad");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ads"] });
    },
  });
}

export interface Ad {
  id: string;
  merchantId: number;
  title: string;
  description: string;
  img: string;
  providedProduct?: number | null;
  impressions?: number | null;
  clicks?: number | null;
  isActive?: boolean | null;
  startDate?: string | null;
  endDate?: string | null;
  dailyBudget?: number | null;
  createdAt?: string | null;
}

export function useGetAds() {
  const { user } = useUser();
  const ownerUserName = user?.username || user?.primaryEmailAddress?.emailAddress?.split('@')[0] || '';
  return useQuery({
    queryKey: ['ads', ownerUserName],
    queryFn: async (): Promise<Ad[]> => {
      const response = await customFetch('/ads', {
        headers: {
          'x-owner-user-name': ownerUserName,
        },
      });
      return response as Ad[];
    },
    enabled: !!ownerUserName,
  });
}

export interface UpdateAdPayload extends Partial<CreateAdPayload> {
  isActive?: boolean;
}

export function useUpdateAd() {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: UpdateAdPayload }) => {
      const ownerUserName = user?.username || user?.primaryEmailAddress?.emailAddress?.split('@')[0] || '';
      try {
        const response = await customFetch(`/ads/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-owner-user-name': ownerUserName,
          },
          body: JSON.stringify(payload),
        });
        return response;
      } catch (err: any) {
        throw new Error(err?.data?.error || err.message || 'Failed to update ad');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ads'] });
    },
  });
}

export function useDeleteAd() {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: async (id: string) => {
      const ownerUserName = user?.username || user?.primaryEmailAddress?.emailAddress?.split('@')[0] || '';
      try {
        await customFetch(`/ads/${id}`, {
          method: 'DELETE',
          headers: {
            'x-owner-user-name': ownerUserName,
          },
        });
      } catch (err: any) {
        throw new Error(err?.data?.error || err.message || 'Failed to delete ad');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ads'] });
    },
  });
}

