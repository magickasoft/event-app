import {createSyncStoragePersister} from '@tanstack/query-sync-storage-persister';
import {QueryClient} from '@tanstack/react-query';
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import React from 'react';

const persister = createSyncStoragePersister({
  storage: typeof localStorage !== 'undefined' ? localStorage : null,
});

export const QueryClientProvider: React.FC<{
  children: JSX.Element | JSX.Element[];
}> = ({children}) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        // cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      },
    },
  });
  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{persister}}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </PersistQueryClientProvider>
  );
};
