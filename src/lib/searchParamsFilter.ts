import { useQueryStates, parseAsString } from 'nuqs';

export function useWorkspaceFilters() {
  return useQueryStates({
    search: parseAsString.withDefault(''),
    type: parseAsString.withDefault('ALL'),
  });
}
