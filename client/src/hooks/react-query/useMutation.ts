import {
  useMutation as useMutationBase,
  type UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

export type useMutationProps<T = unknown, V = unknown> = {
  url: string;
  invalidateQueries?: string[] | string;
  onError?: (error: Error, variables: V, context: unknown) => void;
  onSuccess?: (data: T, variables: V, context: unknown) => void;
} & Omit<
  UseMutationOptions<T, Error, V, unknown>,
  "mutationFn" | "onError" | "onSuccess"
>;

export const useMutation = <T = unknown, V = unknown>(options: useMutationProps<T, V>) => {
  const { url, invalidateQueries, onError, onSuccess, ...restOptions } = options;
  const queryClient = useQueryClient();
  return useMutationBase<T, Error, V, unknown>({
    mutationFn: async (variables: V) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/${url}`, {
        method: "POST",
        body: JSON.stringify(variables),
      });
      return response.json();
    },
    onError: (error: Error, variables: V, context: unknown) => {
      console.error(error);
      onError?.(error, variables, context);
    },
    onSuccess: (data: T, variables: V, context: unknown) => {
      if (invalidateQueries) {
        queryClient.invalidateQueries({
          queryKey: invalidateQueries as readonly string[],
        });
      }
      onSuccess?.(data, variables, context);
    },
    ...restOptions,
  });
};
