import { createSignal } from "solid-js";
import {
  configureOAuth,
  createAuthorizationUrl,
  deleteStoredSession,
  finalizeAuthorization,
  getSession,
  OAuthUserAgent,
  resolveFromIdentity,
  type Session,
} from "@atcute/oauth-browser-client";
import { Did } from "@atcute/lexicons";
import { isHandle } from "@atcute/lexicons/syntax";
import { TextInput } from "./text-input";

configureOAuth({
  metadata: {
    client_id: import.meta.env.VITE_OAUTH_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_OAUTH_REDIRECT_URL,
  },
});

export const [loginState, setLoginState] = createSignal(false);
let agent: OAuthUserAgent;

const Login = () => {
  const [notice, setNotice] = createSignal("");
  const [loginInput, setLoginInput] = createSignal("");

  const login = async (handle: string) => {
    try {
      if (!handle || !isHandle(handle)) throw new Error("Invalid handle");
      setNotice(`Resolving your identity...`);
      const resolved = await resolveFromIdentity(handle);

      setNotice(`Contacting your data server...`);
      const authUrl = await createAuthorizationUrl({
        scope: import.meta.env.VITE_OAUTH_SCOPE,
        ...resolved,
      });

      setNotice(`Redirecting...`);
      await new Promise((resolve) => setTimeout(resolve, 250));

      location.assign(authUrl);
    } catch (e) {
      console.error(e);
      setNotice(`${e}`);
    }
  };

  return (
    <form class="flex flex-col gap-y-1" onsubmit={(e) => e.preventDefault()}>
      <label for="handle">Add new account</label>
      <div class="flex gap-x-2">
        <TextInput
          id="handle"
          placeholder="user.bsky.social"
          onInput={(e) => setLoginInput(e.currentTarget.value)}
        />
        <button
          onclick={() => login(loginInput())}
          class="dark:hover:bg-dark-300 rounded-lg border border-gray-400 bg-transparent px-2.5 py-1.5 text-sm font-bold hover:bg-zinc-50 focus:outline-none focus:ring-1 focus:ring-gray-300"
        >
          Login
        </button>
      </div>
      <div class="break-anywhere max-w-20rem mt-1">{notice()}</div>
    </form>
  );
};

const retrieveSession = async () => {
  const init = async (): Promise<Session | undefined> => {
    const params = new URLSearchParams(location.hash.slice(1));

    if (params.has("state") && (params.has("code") || params.has("error"))) {
      history.replaceState(null, "", location.pathname + location.search);

      const session = await finalizeAuthorization(params);
      const did = session.info.sub;

      localStorage.setItem("lastSignedIn", did);
      return session;
    } else {
      const lastSignedIn = localStorage.getItem("lastSignedIn");

      if (lastSignedIn) {
        try {
          return await getSession(lastSignedIn as Did);
        } catch (err) {
          deleteStoredSession(lastSignedIn as Did);
          localStorage.removeItem("lastSignedIn");
          throw err;
        }
      }
    }
  };

  const session = await init().catch(() => {});

  if (session) {
    agent = new OAuthUserAgent(session);
    setLoginState(true);
  }
};

export { Login, retrieveSession, agent };
