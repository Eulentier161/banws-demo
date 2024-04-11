import { WebsocketAccount } from "../types";
import { shortAccount } from "../utils";

export default function BanAccount({
  wsAccount,
}: {
  wsAccount: WebsocketAccount;
}) {
  return (
    <a
      title={wsAccount.account}
      href={`https://creeper.banano.cc/account/${wsAccount.account}`}
    >
      {wsAccount.discord_name ??
        wsAccount.alias ??
        shortAccount(wsAccount.account)}
    </a>
  );
}
