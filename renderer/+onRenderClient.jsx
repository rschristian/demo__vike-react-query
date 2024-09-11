// https://vike.dev/onRenderClient
export default onRenderClient;

import { hydrate, render } from 'preact';
import { Suspense } from 'preact/compat';
import { PageShell } from './PageShell';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

async function onRenderClient(pageContext) {
  const { Page, pageProps } = pageContext;
  const page = (
    <QueryClientProvider client={queryClient}>
      <PageShell pageContext={pageContext}>
        <Suspense fallback={'...loading'}>
          <Page {...pageProps} />
        </Suspense>
      </PageShell>
    </QueryClientProvider>
  );
  const container = document.querySelector('body');

  if (pageContext.isHydration) {
    hydrate(page, container);
  } else {
    render(page, container);
  }
  document.title = getPageTitle(pageContext);
}

function getPageTitle(pageContext) {
  const title =
    (pageContext.config.documentProps || {}).title ||
    (pageContext.documentProps || {}).title ||
    'Demo';
  return title;
}
