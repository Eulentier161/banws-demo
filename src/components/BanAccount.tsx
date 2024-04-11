import { shortAccount } from "../utils";

export default function BanAccount({
  account,
  alias,
  discord_name,
}: {
  account: string;
  alias?: string | null;
  discord_name?: string | null;
}) {
  return (
    <a title={account} href={`https://creeper.banano.cc/account/${account}`} target="_blank">
      {discord_name ?? alias ?? shortAccount(account)}
    </a>
  );
}
