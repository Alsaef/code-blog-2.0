'use client'
import React from 'react';
import AuthProvider from './AuthProvider';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const queryClient = new QueryClient()
const Provider = ({ children }) => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </QueryClientProvider>

    </div>
  );
};

export default Provider;