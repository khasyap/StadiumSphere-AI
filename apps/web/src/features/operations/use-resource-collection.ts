import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { resourceApi } from '@/services/api-client';

interface IdentifiedRecord {
  id: string;
}

export function useResourceCollection<TRecord extends IdentifiedRecord, TCreate extends object, TUpdate extends object>(resource: string) {
  const queryClient = useQueryClient();
  const queryKey = ['operations', resource] as const;
  const query = useQuery({ queryKey, queryFn: () => resourceApi.list<TRecord>(`/${resource}`) });

  const invalidate = async () => queryClient.invalidateQueries({ queryKey });
  const create = useMutation({ mutationFn: (input: TCreate) => resourceApi.create<TRecord, TCreate>(`/${resource}`, input), onSettled: invalidate });
  const update = useMutation({
    mutationFn: ({ id, input }: { id: string; input: TUpdate }) => resourceApi.update<TRecord, TUpdate>(`/${resource}/${id}`, input),
    onMutate: async ({ id, input }) => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<readonly TRecord[]>(queryKey);
      queryClient.setQueryData<readonly TRecord[]>(queryKey, (current) => current?.map((record) => record.id === id ? { ...record, ...input } : record));
      return { previous };
    },
    onError: (_error, _variables, context) => queryClient.setQueryData(queryKey, context?.previous),
    onSettled: invalidate,
  });
  const remove = useMutation({
    mutationFn: (id: string) => resourceApi.delete(`/${resource}/${id}`),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<readonly TRecord[]>(queryKey);
      queryClient.setQueryData<readonly TRecord[]>(queryKey, (current) => current?.filter((record) => record.id !== id));
      return { previous };
    },
    onError: (_error, _variables, context) => queryClient.setQueryData(queryKey, context?.previous),
    onSettled: invalidate,
  });

  const workflow = useMutation({ mutationFn: ({ id, action, input }: { action: string; id: string; input?: object }) => resourceApi.workflow<TRecord>(`/${resource}/${id}/${action}`, input), onSettled: invalidate });

  return { ...query, create, remove, update, workflow };
}
