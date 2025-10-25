import {
  useMutation,
  useQuery,
  UseQueryOptions,
  UseMutationOptions,
  useQueryClient,
  QueryClient,
} from "@tanstack/react-query";
import axiosApi from "./axios";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: true,
      staleTime: 30000,
      gcTime: 60000,
      refetchOnWindowFocus: true,
      retry: false,
    },
  },
});

type RecordType = Record<string, string | number | boolean | undefined>;

interface UseReadParameters<TData, TError> {
  queryKey?: (string | number)[];
  url: string;
  params?: RecordType;
  options?: UseQueryOptions<TData, TError>;
}

export const useRead = <TData = unknown, TError = unknown>({
  queryKey,
  url,
  params,
  options,
}: UseReadParameters<TData, TError>) => {
  const queryFn = async (): Promise<TData> => {
    const response = await axiosApi.get(url, { params });
    return response.data;
  };

  queryKey = queryKey || [url];

  return useQuery<TData, TError>({
    queryKey,
    queryFn,
    ...options,
  });
};

type Methods = "POST" | "PUT" | "PATCH" | "DELETE";

interface UseWriteParameters<TData, TError> {
  queryKey?: (string | number)[] | (string | number)[][];
  url: string;
  method?: Methods;
  data?: RecordType;
  params?: RecordType;
  options?: UseMutationOptions<TData, TError, unknown>;
  headers?: Record<string, string>;
  isAdminApi?: boolean;
}

export const useWrite = <TData = unknown, TError = unknown>({
  queryKey,
  url,
  method = "POST",
  data,
  params,
  options,
  headers,
}: UseWriteParameters<TData, TError>) => {
  const queryClient = useQueryClient();

  const mutationFn = async (variables: unknown) => {
    const config = {
      params,
      headers,
    };
    let response;

    switch (method) {
      case "POST":
        response = await axiosApi.post(url, variables || data, config);
        break;
      case "PUT":
        response = await axiosApi.put(url, variables || data, config);
        break;
      case "PATCH":
        response = await axiosApi.patch(url, variables || data, config);
        break;
      case "DELETE":
        response = await axiosApi.delete(url, {
          data: variables || data,
          ...config,
        });
        break;
      default:
        throw new Error("Invalid HTTP method");
    }
    return response.data;
  };

  const onInvalidateSuccess = () => {
    if (Array.isArray(queryKey?.[0])) {
      (queryKey as (string | number)[][]).forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });
    } else {
      queryClient.invalidateQueries({ queryKey });
    }
  };

  return useMutation({
    mutationFn,
    ...options,
    onSuccess: (data, variables, context) => {
      // call user-provided onSuccess handler safely (avoid TS/linter complaints
      // about calling possibly-undefined values and preserve original behavior)
      const userOnSuccess = options?.onSuccess as
        | UseMutationOptions<TData, TError, unknown>["onSuccess"]
        | undefined;
      if (userOnSuccess) {
        try {
          // call as a generic function to avoid strict signature mismatches
          (userOnSuccess as unknown as (...args: unknown[]) => unknown)(
            data,
            variables,
            context
          );
        } catch (err) {
          // don't block the mutation lifecycle if user handler throws
          console.error("Error in user onSuccess handler:", err);
        }
      }

      if (queryKey) {
        onInvalidateSuccess();
      }
    },
  });
};
