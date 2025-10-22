import {
  useMutation,
  useQuery,
  UseQueryOptions,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import axiosApi from "@/lib/axios";

type RecordType = Record<string, string | number | boolean | undefined>;

interface UseReadParameters<TData, TError> {
  queryKey?: (string | number)[];
  url: string;
  params?: RecordType;
  options?: UseQueryOptions<TData, TError>;
  isAdminApi?: boolean;
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
    const config = { params, headers };
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
      options?.onSuccess?.(data, variables, context);
      if (queryKey) {
        onInvalidateSuccess();
      }
    },
  });
};
