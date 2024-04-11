import { useContext } from "react";
import { FormContext } from "../../context/FormContext";
import type { FormStateContext } from "../../types";

export default function FilterInput() {
  const { formState, setFilter } = useContext(FormContext) as FormStateContext;
  return (
    <div>
      <label
        htmlFor="filter"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        "filter"
      </label>
      <select
        id="filter"
        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        onChange={(e) => setFilter(e.target.value as "all" | "discord")}
        value={formState.filter}
      >
        <option>all</option>
        <option>discord</option>
      </select>
    </div>
  );
}
