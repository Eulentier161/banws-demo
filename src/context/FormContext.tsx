import { createContext, useState } from "react";
import type { FormState, FormStateContext } from "../types";

export const FormContext = createContext<FormStateContext | null>(null);

function FormProvider({ children }: { children: React.ReactNode }) {
  const [formState, setFormState] = useState<FormState>({
    filter: "discord",
    blocktypes: { send: true, receive: false, change: false },
    accounts: [],
  });

  function toggleBlocktype(blocktype: keyof FormState["blocktypes"]) {
    setFormState((formState) => ({
      ...formState,
      blocktypes: {
        ...formState.blocktypes,
        [blocktype]: !formState.blocktypes[blocktype],
      },
    }));
  }

  function addAccount(account: FormState["accounts"][number]) {
    if (/^ban_[13]{1}[13456789abcdefghijkmnopqrstuwxyz]{59}$/.test(account))
      setFormState({
        ...formState,
        accounts: Array.from(new Set([account, ...formState.accounts])),
      });
  }

  function removeAccount(account: FormState["accounts"][number]) {
    setFormState({
      ...formState,
      accounts: formState.accounts.filter((a) => a !== account),
    });
  }

  function setFilter(val: FormState["filter"]) {
    setFormState({
      ...formState,
      filter: val,
    });
  }

  return (
    <FormContext.Provider
      value={{
        formState,
        toggleBlocktype,
        addAccount,
        removeAccount,
        setFilter,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export default FormProvider;
