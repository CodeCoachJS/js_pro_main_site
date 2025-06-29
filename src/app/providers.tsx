"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Script from "next/script";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import { api, getApiConfig } from "~/utils/api";

export function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session?: Session | null;
}) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    api.createClient({
      links: getApiConfig().links,
    }),
  );

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <Script
            id="affiliates"
            async
            src="//cdn.trackdesk.com/tracking.js"
            dangerouslySetInnerHTML={{
              __html: `(function(t,d,k){(t[k]=t[k]||[]).push(d);t[d]=t[d]||t[k].f||function(){(t[d].q=t[d].q||[]).push(arguments)}})(window,"trackdesk","TrackdeskObject");trackdesk('javascriptprosapp', 'click');`,
            }}
          />
          {children}
          <Script
            id="stripe_affiliate"
            dangerouslySetInnerHTML={{
              __html: `(function () {
              var cookie = document.cookie.match('(^|;)\\s*trakdesk_cid\\s*=\\s*([^;]+)');
              if (Array.isArray(cookie)) {
                  try {
                      var trakdeskCid = JSON.parse(cookie.pop());
                      var cid = trakdeskCid['cid'];
                      document.querySelectorAll('a[href^="https://buy.stripe.com/"]').forEach(function (a) {
                          var url = new URL(a.href);
                          url.searchParams.set('client_reference_id', cid);
                          a.href = url.href;
                      });
                  } catch (e) {
                      console.log(e);
                  }
              }
          })();`,
            }}
          />
        </SessionProvider>
      </QueryClientProvider>
    </api.Provider>
  );
}
