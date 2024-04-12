import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import { FormContext } from "../../context/FormContext";
import type { FormStateContext } from "../../types";
import Button from "../Button";

export default function AccountInput() {
  const { formState, addAccount, removeAccount } = useContext(
    FormContext,
  ) as FormStateContext;
  const [currentAccount, setCurrentAccount] = useState<string>("");
  const [isValid, setIsValid] = useState(true);
  const [known, setKnown] = useState<{ address: string; alias: string }[]>();

  useEffect(() => {
    setIsValid(
      Boolean(
        currentAccount &&
          /^ban_[13]{1}[13456789abcdefghijkmnopqrstuwxyz]{59}$/.test(
            currentAccount,
          ),
      ),
    );
  }, [currentAccount]);

  useEffect(() => {
    fetch("https://api.spyglass.eule.wtf/banano/v1/known/accounts", {
      method: "POST",
    }).then((res) => res.json().then((res) => setKnown(res)));
  }, []);

  return (
    <div>
      <label
        htmlFor="accounts"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        "accounts"
      </label>
      <div className="relative mt-2 rounded-md shadow-sm flex gap-2">
        <input
          value={currentAccount}
          onChange={(e) => {
            setCurrentAccount(e.currentTarget.value);
          }}
          type="text"
          id="account"
          className={clsx(
            "block font-mono w-full rounded-md border-0 py-1.5 truncate ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
            !isValid &&
              currentAccount.length &&
              "text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500",
          )}
          placeholder="ban_1hootubxy68fhhrctjmaias148tz91tsse3pq1pgmfedsm3cubhobuihqnxd"
        />
        <Button
          disabled={!isValid}
          onClick={() => {
            addAccount(currentAccount);
            setCurrentAccount("");
          }}
        >
          Add
        </Button>
      </div>
      <p
        className={clsx(
          "text-red-600",
          (isValid || !currentAccount.length) && "invisible",
        )}
      >
        Not a valid banano account.
      </p>
      <ul role="list" className="divide-y divide-gray-100">
        {formState.accounts.map((account) => (
          <li
            title={account}
            key={account}
            className="flex justify-between gap-x-6 py-5"
          >
            <div className="flex min-w-0 gap-x-4">
              <img
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                src={`https://monkey.banano.cc/api/v1/monkey/${account}`}
                alt=""
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm truncate font-semibold leading-6 text-gray-900">
                  {account}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {known?.find((k) => k.address === account)?.alias ??
                    "unknown"}
                </p>
              </div>
            </div>
            <Button onClick={() => removeAccount(account)}>Remove</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
