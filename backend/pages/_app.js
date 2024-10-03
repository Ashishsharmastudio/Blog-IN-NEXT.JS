import "@/styles/globals.css";
import Header from "@/components/Header";
import Aside from "@/components/Aside";
import { SessionProvider, useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";
import Aos from "@/components/Aos";

function checkAuthorization(email) {
  // Replace this with your actual list of authorized emails
  const authorizedEmails = JSON.parse(process.env.NEXT_PUBLIC_AUTHORIZED_EMAILS || '[]');
  return authorizedEmails.includes(email);
}

function AuthWrapper({ children }) {
  const { data: sessionData, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      const isAuthorized = checkAuthorization(sessionData.user.email || '[]');
      if (!isAuthorized) {
        signOut({ callbackUrl: "/login" });
      }
    }
    setLoading(false);
  }, [status, sessionData, router]);

  if (loading) {
    return (
      <div className="flex flex-col flex-center wh_100">
        <Loading />
        <h1>Loading....</h1>
      </div>
    );
  }

  return children;
}

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <AuthWrapper>
        <Header />
        <Aside />
        <main>
          <Aos>
            <Component {...pageProps} />
          </Aos>
        </main>
      </AuthWrapper>
    </SessionProvider>
  );
}
