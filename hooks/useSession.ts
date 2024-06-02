import * as React from 'react';
import {AuthContext} from '@/contexts/auth';

export function useSession() {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error('useSession must be wrapped in a <SessionProvider />');
  }

  return context;
}
