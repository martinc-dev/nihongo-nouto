# Saga to React Query Conversion Analysis

## Summary
All sagas can be converted to React Query hooks. React Query is ideal for:
- Data fetching (GET requests) - automatic caching, refetching, background updates
- Mutations (POST/PATCH/DELETE) - with cache invalidation and optimistic updates
- Complex async flows - with better error handling and loading states

## Sagas Analysis

### ✅ Convertible to React Query

1. **fetchWordList** (`wordList.ts`)
   - **Type**: GET request
   - **Complexity**: Simple data fetch with transformation
   - **Conversion**: `useQuery` hook
   - **Benefits**: Automatic caching, refetching on content type change

2. **fetchWordDetail** (`wordDetail.ts`)
   - **Type**: GET request with transformation (verb conjugation)
   - **Complexity**: Medium - includes verb conjugation logic
   - **Conversion**: `useQuery` hook
   - **Benefits**: Caching per word ID, automatic refetching

3. **saveWordDetail** (`wordDetail.ts`)
   - **Type**: POST/PATCH mutation
   - **Complexity**: High - includes navigation, cache updates, word list updates
   - **Conversion**: `useMutation` hook with `onSuccess` callbacks
   - **Benefits**: Optimistic updates, cache invalidation, better error handling

4. **deleteWordDetail** (`wordDetail.ts`)
   - **Type**: DELETE mutation
   - **Complexity**: Medium - includes navigation and cache updates
   - **Conversion**: `useMutation` hook with `onSuccess` callbacks
   - **Benefits**: Cache cleanup, automatic list refresh

5. **fetchWordDupe** (`search.ts`)
   - **Type**: GET request
   - **Complexity**: Simple data fetch
   - **Conversion**: `useQuery` hook
   - **Benefits**: Caching per word, automatic deduplication

6. **fetchWordSearch** (`search.ts`)
   - **Type**: External API call (Jisho) with transformation
   - **Complexity**: Medium - includes data transformation
   - **Conversion**: `useMutation` hook (since it's triggered by user input)
   - **Benefits**: Better control over when to fetch, debouncing support

## Implementation Strategy

### Hooks Created:
1. `useWordList()` - Replaces `fetchWordList` saga
2. `useWordDetail(wordId)` - Replaces `fetchWordDetail` saga
3. `useSaveWordDetail()` - Replaces `saveWordDetail` saga
4. `useDeleteWordDetail()` - Replaces `deleteWordDetail` saga
5. `useWordDupe(word)` - Replaces `fetchWordDupe` saga
6. `useWordSearch()` - Replaces `fetchWordSearch` saga

### Migration Path:
1. ✅ Create React Query hooks (DONE)
2. ✅ Update components to use hooks instead of Redux actions (DONE)
3. ⏳ Remove saga watchers from saga index (OPTIONAL - can keep for backward compatibility)
4. ⏳ Remove unused Redux actions/reducers (OPTIONAL - can keep for backward compatibility)
5. ⏳ Update Redux store to remove saga middleware (OPTIONAL - can keep for backward compatibility)

### Components Updated:
- ✅ `WordList` - Now uses `useWordList()` hook
- ✅ `WordDashboard` - Removed `fetchWordListAction` dispatch (React Query handles automatically)
- ✅ `VerbDetail` - Now uses `useWordDetail()` hook
- ✅ `AdjDetail` - Now uses `useWordDetail()` hook
- ✅ `NounDetail` - Now uses `useWordDetail()` hook
- ✅ `OtherDetail` - Now uses `useWordDetail()` hook
- ✅ `VerbEditor` - Now uses `useWordDetail()` hook
- ✅ `WordActions` - Now uses `useDeleteWordDetail()` mutation
- ✅ `WordSearchInput` - Now uses `useWordSearch()` mutation

### Benefits:
- **Better Caching**: Automatic cache management with React Query
- **Less Boilerplate**: No need for action creators, reducers, sagas
- **Better UX**: Built-in loading states, error handling, retry logic
- **Optimistic Updates**: Easy to implement with mutations
- **Type Safety**: Better TypeScript support with React Query
- **DevTools**: React Query DevTools for debugging

### Considerations:
- Navigation logic moved to `onSuccess` callbacks in mutations
- Cache invalidation handled via `queryClient.invalidateQueries`
- Word list updates handled via cache invalidation (automatic refetch)
- Redux can still be used for navigation state (currentContentType)

