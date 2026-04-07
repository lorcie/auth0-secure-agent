import { LogIn, UserPlus } from "lucide-react";
import GuideInfoBox from "@/components/guide/guide-info-box";
import { ChatWindow } from "@/components/chat-window";
import { Button } from "@/components/ui/button";
import useAuth, { getLoginUrl, getSignupUrl } from "@/lib/use-auth";
import { useEffect, useState } from "react";


type Auth0User = {
  sub: string;                         // subject / user ID
  name?: string | null;                // full name
  nickname?: string | null;            // nickname
  given_name?: string | null;          // first name
  family_name?: string | null;         // last name
  picture?: string | null;             // avatar URL
  email?: string | null;               // email
  email_verified?: boolean;            // whether email is verified
  org_id?: string | null;              // organization ID (if any)
  updated_at?: string;                 // ISO‑8601 datetime string
  iss?: string;                        // issuer (Auth0 domain)
  aud?: string;                        // audience (client ID)
  iat?: number;                        // issued at (timestamp)
  exp?: number;                        // expires at (timestamp)
  sid?: string;                        // session ID
};

type Me = {
  authenticated: boolean;
  user: Auth0User | null;
} | null;

export default function ChatPage() {
 const [me, setMe] = useState<Me>(null);

  useEffect(() => {
    // Try reading cookie directly (works only if httponly=False)
    const cookieString = document.cookie || "";
    const cookies = Object.fromEntries(
      cookieString.split(";").map(s => {
        const [k = "", v = ""] = s.trim().split("=");
        return [k, decodeURIComponent(v || "")];
      }).filter(([k]) => k)
    );
    if (cookies.user) {
      setMe({authenticated: true, user: cookies.user});
      return;
    }

    const baseUrl = import.meta.env.VITE_API_HOST ?? "http://localhost:8000";
    // Or call server-side endpoint to verify (works for HttpOnly cookies too)
    fetch(baseUrl+"/auth/me", { credentials: "include" })
      .then(r => r.json())
      .then(data => setMe({ source: "/auth/me", ...data }))
      .catch(err => console.error(err));
  }, []);
  <div>
      <h2>Session check</h2>
      <pre>{JSON.stringify(me, null, 2)}</pre>
  </div>
  const { isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (me?.authenticated == false) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] my-auto gap-4">
        <h2 className="text-xl">You are not logged in</h2>
        <div className="flex gap-4">
          <Button asChild variant="default" size="default">
            <a href={getLoginUrl()} className="flex items-center gap-2">
              <LogIn />
              <span>Login</span>
            </a>
          </Button>
          <Button asChild variant="default" size="default">
            <a href={getSignupUrl()} className="flex items-center gap-2">
              <UserPlus />
              <span>Sign up</span>
            </a>
          </Button>
        </div>
      </div>
    );
  }

  const user1 = me?.user
  //console.log('user:'+user1)
  var name1
  if (user1) {
    const userStr = String(user1);
    //console.log('userStr:'+userStr)
    name1 = JSON.parse(userStr.replaceAll("None","''").replaceAll("True", "'true'").replaceAll("'","\"")).name
  }
  else
    name1 = ""
  console.log('user:'+name1)
  const InfoCard = (
    <GuideInfoBox>
      <ul>
        <li className="text-l">
          🤝
          <span className="ml-2">
            This template showcases a simple chatbot after Login/Password or TokenVault experience{" "}
          </span>
        </li>
        <li className="text-l">
          👇
          <span className="ml-2">
            Try asking e.g. <code>What can you help me with?</code> below!
          </span>
        </li>
      </ul>
    </GuideInfoBox>
  );

  return (
    <ChatWindow
      endpoint="/agent/"
      emoji="🤖"
      placeholder={`Hello ${name1}, I'm your personal assistant. How can I help you today?`}
      emptyStateComponent={InfoCard}
    />
  );
}
