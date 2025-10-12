'use client';
import React, { ReactNode } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

export const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
  return <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>;
};
