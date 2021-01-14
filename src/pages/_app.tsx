import fetch from 'node-fetch';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { AppProvider } from '@shopify/polaris';
import { Provider } from '@shopify/app-bridge-react';
import '@shopify/polaris/dist/styles.css';
import translations from '@shopify/polaris/locales/en.json';
import Head from 'next/head';
import React from 'react';
import type {
  AppProps,
  AppContext,
} from 'next/app'
import {
  NextPage,
  NextPageContext
} from 'next';
import ClientRouter from 'src/components/ClientRouter';

const client = new ApolloClient({
  fetch: fetch,
  fetchOptions: {
    credentials: 'include',
  },
});

interface Props extends AppProps {
  shopOrigin: string;
}

const MyApp: React.FC<Props> & { getInitialProps: NextPage['getInitialProps'] } = (props) => {

  const {
    Component,
    pageProps,
    shopOrigin
  } = props;

  return (
    <>
      <Head>
        <title>Sample App</title>
        <meta charSet="utf-8" />
      </Head>
      <AppProvider i18n={translations}>
        <Provider
          config={{
            apiKey: API_KEY,
            shopOrigin: shopOrigin,
            forceRedirect: true,
          }}
        >
          <ClientRouter />
          <ApolloProvider client={client}>
            <Component {...pageProps} />
          </ApolloProvider>
        </Provider>
      </AppProvider>
    </>
  );
}

interface Context extends NextPageContext {
  ctx: AppContext['ctx'] & {
    query: {
      shop: string;
    }
  }
}

MyApp.getInitialProps = async ({ ctx }: Context) => {
  return {
    shopOrigin: ctx.query.shop,
  };
};

export default MyApp;
