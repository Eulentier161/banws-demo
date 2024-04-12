import {
  ArrowDownTrayIcon,
  ArrowPathIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useEffect, useState } from "react";
import type { WebsocketResponse } from "../types";
import BanAccount from "./BanAccount";

function Action({
  block,
  hash,
  block_account,
  link_as_account,
  amount_decimal,
}: WebsocketResponse) {
  const [known, setKnown] = useState<{ address: string; alias: string }[]>();
  useEffect(() => {
    fetch("https://api.spyglass.eule.wtf/banano/v1/known/accounts", {
      method: "POST",
    }).then((res) => res.json().then((res) => setKnown(res)));
  }, []);

  if (block.subtype === "send") {
    return (
      <span>
        <BanAccount {...block_account} />
        &nbsp;
        <a href={`https://creeper.banano.cc/hash/${hash}`} target="_blank">
          sent {amount_decimal} BAN to
        </a>
        &nbsp;
        <BanAccount {...link_as_account} />
      </span>
    );
  }
  if (block.subtype === "receive") {
    return (
      <span>
        <BanAccount {...block_account} />
        &nbsp;
        <a href={`https://creeper.banano.cc/hash/${hash}`} target="_blank">
          received {amount_decimal} BAN
        </a>
        &nbsp; from{" "}
        <a
          href={`https://creeper.banano.cc/hash/${block.link}`}
          target="_blank"
        >
          this send block
        </a>
      </span>
    );
  }
  if (block.subtype === "change") {
    return (
      <span>
        <BanAccount {...block_account} />
        &nbsp;
        <a href={`https://creeper.banano.cc/hash/${hash}`} target="_blank">
          changed their Representative to
        </a>
        &nbsp;
        <BanAccount
          account={block.representative}
          alias={known?.find((k) => k.address === block.representative)?.alias}
        />
      </span>
    );
  }

  return null;
}

export default function Feed({ messages }: { messages: WebsocketResponse[] }) {
  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {messages.length ? (
          messages.map((message, idx) => (
            <li key={message.hash}>
              <div className="relative pb-8">
                {idx !== messages.length - 1 ? (
                  <span
                    className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex space-x-3">
                  <div>
                    <span
                      className={clsx(
                        message.block.subtype === "send" && "bg-green-500",
                        message.block.subtype === "receive" && "bg-blue-500",
                        message.block.subtype === "change" && "bg-yellow-500",
                        "h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"
                      )}
                    >
                      {message.block.subtype === "send" ? (
                        <ArrowUpTrayIcon
                          className="h-5 w-5 text-white"
                          aria-hidden="true"
                        />
                      ) : message.block.subtype === "receive" ? (
                        <ArrowDownTrayIcon
                          className="h-5 w-5 text-white"
                          aria-hidden="true"
                        />
                      ) : (
                        <ArrowPathIcon
                          className="h-5 w-5 text-white"
                          aria-hidden="true"
                        />
                      )}
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                    <div>
                      <p className="text-gray-900">
                        <Action {...message} />
                      </p>
                    </div>
                    <div className="whitespace-nowrap text-right text-sm text-gray-500">
                      <time
                        dateTime={new Date(
                          parseInt(message.time)
                        ).toTimeString()}
                      >
                        {new Date(parseInt(message.time)).toLocaleString()}
                      </time>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))
        ) : (
          <span>
            A live feed based on your filter settings will appear here after
            atleast one transactions happened on the blockchain! Check the
            {" "}<a
              href="https://github.com/Eulentier161/banws/blob/main/README.md"
              target="_blank"
            >
              projects README on github
            </a>{" "}
            which is being demonstrated here if you have questions about the
            filter.
          </span>
        )}
      </ul>
    </div>
  );
}
