import { type AppType } from "next/app";
import { type Session } from "next-auth";
import Script from "next/script";
import { SessionProvider } from "next-auth/react";
import Header from "~/components/Header";
import { api } from "~/utils/api";

import "~/styles/globals.css";
/**
 * 
 * @param param0 
 * 
</script>
 * @returns 
 */

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <Script
        id="affiliates"
        async
        src="//cdn.trackdesk.com/tracking.js"
        dangerouslySetInnerHTML={{
          __html: `(function(t,d,k){(t[k]=t[k]||[]).push(d);t[d]=t[d]||t[k].f||function(){(t[d].q=t[d].q||[]).push(arguments)}})(window,"trackdesk","TrackdeskObject");trackdesk('javascriptprosapp', 'click');`,
        }}
      />
      <SessionProvider session={session}>
        <Header />
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
