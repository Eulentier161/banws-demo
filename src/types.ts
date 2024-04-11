export type WebsocketAccount = {
  account: string;
  discord_name: string | null;
  discord_id: string | null;
  alias: string | null;
};

type Block = {
  type: "state";
  account: string;
  previous: string;
  representative: string;
  balance: string;
  balance_decimal: string;
  link: string;
  link_as_account: string;
  signature: string;
  work: string;
  subtype: "send" | "receive" | "change";
};

export type WebsocketResponse = {
  block_account: WebsocketAccount;
  link_as_account: WebsocketAccount;
  amount_decimal: string;
  hash: string;
  block: Block;
};

export type FormState = {
  filter: "discord" | "all";
  blocktypes: {
    send: boolean;
    receive: boolean;
    change: boolean;
  };
  accounts: string[];
};

export type FormStateContext = {
  formState: FormState;
  toggleBlocktype: (blocktype: keyof FormState["blocktypes"]) => void;
  addAccount: (account: FormState["accounts"][number]) => void;
  removeAccount: (account: FormState["accounts"][number]) => void;
  setFilter: (filter: FormState["filter"]) => void;
};
