import { useCreateMerchant } from "@/apis/merchants";

export function useInitMerchantStore(options?: {
  mutation?: {
    onSuccess?: () => void;
    onError?: () => void;
  };
}) {
  const mutation = useCreateMerchant({
    mutation: {
      onSuccess: () => {
        options?.mutation?.onSuccess?.();
      },
      onError: () => {
        options?.mutation?.onError?.();
      },
    },
  });

  return { mutate: mutation.mutate, isPending: mutation.isPending };
}
