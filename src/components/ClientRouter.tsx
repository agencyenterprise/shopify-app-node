import React from 'react';
import { ClientRouter as AppBridgeClientRouter } from '@shopify/app-bridge-react';
import { useRouter } from 'next/router';

const ClientRouter: React.FC = () => {
  const router = useRouter();
  return <AppBridgeClientRouter history={router} />;
}

export default ClientRouter
