import { A } from "@solidjs/router";

const Home = () => {
  return (
    <div class="mt-4 flex flex-col gap-2 break-words">
      <div>
        <p>
          Browse the public data on{" "}
          <a class="text-lightblue-500 hover:underline" href="https://atproto.com" target="_blank">
            AT Protocol
          </a>
          .
        </p>
        <p>Login to manage records in your repository.</p>
        <p>
          <A href="/jetstream" class="text-lightblue-500 hover:underline">
            Jetstream
          </A>{" "}
          and{" "}
          <A href="/firehose" class="text-lightblue-500 hover:underline">
            firehose
          </A>{" "}
          support.
        </p>
        <p>
          <A
            href="https://constellation.microcosm.blue"
            class="text-lightblue-500 hover:underline"
            target="_blank"
          >
            Backlinks
          </A>{" "}
          can be enabled in the settings.
        </p>
      </div>
      <div>
        <span class="font-semibold">Examples</span>
        <div>
          <A href="/pds.kelinci.net" class="text-lightblue-500 hover:underline">
            https://pds.kelinci.net
          </A>
        </div>
        <div>
          <A
            href="/at://did:plc:vwzwgnygau7ed7b7wt5ux7y2"
            class="text-lightblue-500 hover:underline"
          >
            at://did:plc:vwzwgnygau7ed7b7wt5ux7y2
          </A>
        </div>
        <div>
          <A
            href="/at://did:plc:oisofpd7lj26yvgiivf3lxsi/app.bsky.feed.post/3l2zpbbhuvw2h"
            class="text-lightblue-500 hover:underline"
          >
            at://hailey.at/app.bsky.feed.post/3l2zpbbhuvw2h
          </A>
        </div>
      </div>
      <div>
        <p>
          <span class="font-semibold">GitHub</span>:{" "}
          <A
            href="https://github.com/notjuliet/pdsls"
            target="_blank"
            class="text-lightblue-500 hover:underline"
          >
            notjuliet/pdsls
          </A>
        </p>
        <p>
          <span class="font-semibold">Tangled</span>:{" "}
          <A
            href="https://tangled.sh/@juli.ee/pdsls"
            target="_blank"
            class="text-lightblue-500 hover:underline"
          >
            @juli.ee/pdsls
          </A>
        </p>
      </div>
      <div>
        <i>
          Proudly powered by{" "}
          <A href="https://github.com/mary-ext/atcute" target="_blank" class="hover:underline">
            atcute
          </A>
        </i>
      </div>
    </div>
  );
};

export { Home };
