import { useContext, useEffect, useState } from "react";
import useWebsocket, { ReadyState } from "react-use-websocket";
import Feed from "./components/Feed";
import AccountInput from "./components/inputs/AccountInput";
import BlocktypesInput from "./components/inputs/BlocktypesInput";
import FilterInput from "./components/inputs/FilterInput";
import JsonPreview from "./components/JsonPreview";
import { FormContext } from "./context/FormContext";
import type { FormState, FormStateContext, WebsocketResponse } from "./types";

function Index() {
  const { sendJsonMessage, lastMessage, lastJsonMessage, readyState } =
    useWebsocket<WebsocketResponse>("wss://ws.spyglass.eule.wtf");
  const { formState } = useContext(FormContext) as FormStateContext;
  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];
  const [messages, setMessages] = useState<WebsocketResponse[]>([]);

  useEffect(() => {
    lastJsonMessage !== null &&
      lastJsonMessage.block_account &&
      setMessages((prev) => [lastJsonMessage, ...prev.slice(undefined, 999)]);
  }, [lastJsonMessage]);

  const getFormatedState = (state: FormState) => ({
    ...state,
    blocktypes: Object.entries(state.blocktypes)
      .map(([blocktype, bool]) => (bool ? blocktype : undefined))
      .filter((blocktype) => typeof blocktype !== "undefined") as string[],
  });

  useEffect(
    () => {
      readyState === ReadyState.OPEN &&
        sendJsonMessage(getFormatedState(formState));
    },
    [JSON.stringify(formState)] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <div className="container mx-auto mt-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            <a href="https://github.com/eulentier161/banws" target="_blank">
              Banws
            </a>{" "}
            Demo Application
          </h1>
          <span className="font-light">
            Websocket Status: {connectionStatus}
          </span>
        </div>
      </div>
      <hr />
      <main>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-32 xl:gap-64 my-4">
          <FilterInput />
          <BlocktypesInput />
          <AccountInput />
        </div>

        <div>
          <span className="block text-sm font-medium leading-6 text-gray-900">
            Websocket Filter:
          </span>
          <JsonPreview blob={getFormatedState(formState)} />
          <br />
          {lastMessage?.data.startsWith("{") ? null : lastMessage?.data}
          <br />
          <Feed messages={messages} />
        </div>
      </main>
    </div>
  );
}

export default Index;
