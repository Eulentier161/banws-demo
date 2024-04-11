import { useContext } from "react";
import { FormContext } from "../../context/FormContext";
import type { FormStateContext } from "../../types";

export default function BlocktypesInput() {
  const { formState, toggleBlocktype } = useContext(
    FormContext,
  ) as FormStateContext;

  return (
    <div>
      <span className="block text-sm font-medium leading-6 text-gray-900">
        "blocktypes"
      </span>
      <fieldset>
        <div className="justify-between flex mt-2">
          {(["send", "receive", "change"] as const).map((blocktype) => (
            <div key={blocktype}>
              <input
                onChange={() => toggleBlocktype(blocktype)}
                checked={formState.blocktypes[blocktype]}
                id={blocktype}
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label
                htmlFor={blocktype}
                className="font-medium text-gray-900 ml-1 text-sm leading-6"
              >
                {blocktype}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
