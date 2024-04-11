import { useContext, useEffect, useState } from "react";
import useWebsocket, { ReadyState } from "react-use-websocket";
import BanAccount from "./components/BanAccount";
import { FormContext } from "./context/FormContext";
import type { FormState, FormStateContext, WebsocketResponse } from "./types";
import Button from "./components/Button";
import { shortAccount } from "./utils";

function Index() {
  const { sendJsonMessage, lastMessage, lastJsonMessage, readyState } =
    useWebsocket<WebsocketResponse>("wss://ws.spyglass.eule.wtf");
  const { formState, toggleBlocktype, addAccount, removeAccount, setFilter } =
    useContext(FormContext) as FormStateContext;
  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];
  const [currentAccount, setCurrentAccount] = useState<string>("");
  const [messages, setMessages] = useState<WebsocketResponse[]>([]);

  useEffect(() => {
    lastJsonMessage !== null &&
      lastJsonMessage.block_account &&
      setMessages((prev) => [lastJsonMessage, ...prev.slice(undefined, 19)]);
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
    <main className="container mx-auto mt-8">
      <h1 className="font-bold text-2xl">Banws Demo Application</h1>
      <span>Websocket Connection Status: {connectionStatus}</span>
      <hr />

      <form className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-4">
        <label>
          filter
          <br />
          <select
            onChange={(e) => setFilter(e.target.value as "all" | "discord")}
            value={formState.filter}
          >
            <option>all</option>
            <option>discord</option>
          </select>
        </label>

        <div>
          blocktypes
          <br />
          <label>
            send
            <input
              checked={formState.blocktypes.send}
              onChange={() => toggleBlocktype("send")}
              type="checkbox"
            />
          </label>
          <br />
          <label>
            receive
            <input
              checked={formState.blocktypes.receive}
              onChange={() => toggleBlocktype("receive")}
              type="checkbox"
            />
          </label>
          <br />
          <label>
            change
            <input
              checked={formState.blocktypes.change}
              onChange={() => toggleBlocktype("change")}
              type="checkbox"
            />
          </label>
        </div>

        <div>
          <label>
            accounts
            <br />
            <input
              value={currentAccount}
              className="mr-2"
              onChange={(e) => {
                setCurrentAccount(e.currentTarget.value);
              }}
              type="text"
            />
            <Button
              onClick={() => {
                addAccount(currentAccount);
                setCurrentAccount("");
              }}
            >
              +
            </Button>
          </label>
          <ol>
            {formState.accounts.map((account) => (
              <li key={account}>
                <span className="mr-2">{shortAccount(account)}</span>
                <Button onClick={() => removeAccount(account)}>-</Button>
              </li>
            ))}
          </ol>
        </div>
      </form>

      <div>
        options:
        <pre>{JSON.stringify(getFormatedState(formState), undefined, 2)}</pre>
        <br />
        {lastMessage?.data.startsWith("{") ? null : lastMessage?.data}
        <br />
        live feed:
        <table>
          <thead hidden>
            <tr>
              <th>Block Account</th>
              <th>Action</th>
              <th>Link as Account</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((m) => (
              <tr>
                <td>
                  <BanAccount wsAccount={m.block_account} />
                </td>
                <td>
                  <code>
                    <a href={`https://creeper.banano.cc/hash/${m.hash}`}>
                      {m.block.subtype}{" "}
                      {parseFloat(m.amount_decimal).toLocaleString()} BAN
                    </a>
                  </code>
                </td>
                <td>
                  <BanAccount wsAccount={m.link_as_account} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
      </div>
    </main>
  );
}

export default Index;
