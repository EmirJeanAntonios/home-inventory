import {
  useQuery as useQueryBase,
  type UseQueryOptions,
} from "@tanstack/react-query";

export type useQueryProps<T = unknown> = {
  queryKey: string;
  url: string;
} & Omit<
  UseQueryOptions<T, Error, T, readonly unknown[]>,
  "queryKey" | "queryFn"
>;

export const useQuery = <T = unknown>(options: useQueryProps<T>) => {
  const { queryKey, url, ...restOptions } = options;
  return useQueryBase<T>({
    queryKey: [queryKey] as readonly unknown[],
    queryFn: async (): Promise<T> => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/${url}`);
      return response.json();
    },
    ...restOptions,
  });
};
