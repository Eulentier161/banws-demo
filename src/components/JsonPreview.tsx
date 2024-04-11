import { Fragment } from "react";
import type { FormState } from "../types";

type Blob = Omit<FormState, "blocktypes"> & {
  blocktypes: string[];
};

export default function JsonPreview({ blob }: { blob: Blob }) {
  return (
    <pre className="bg-[#1f1f1f] font-mono p-4 rounded-md shadow-xl">
      <span className="text-[#ffd700]">{"{"}</span>
      <br />
      <span className="text-[#9cdcfe]">&nbsp;&nbsp;"filter"</span>
      <span className="text-[#cccccc]">:</span>
      <span className="text-[#ce9178]">&nbsp;"{blob.filter}"</span>
      <span className="text-[#cccccc]">,</span>
      <br />
      <span className="text-[#9cdcfe]">&nbsp;&nbsp;"blocktypes"</span>
      <span className="text-[#cccccc]">:</span>
      <span className="text-[#da70d6]">&nbsp;{"["}</span>
      {blob.blocktypes.map((blocktype, idx) => (
        <Fragment key={blocktype}>
          <br />
          <span className="text-[#ce9178]">
            &nbsp;&nbsp;&nbsp;&nbsp;"{blocktype}"
            {idx !== blob.blocktypes.length - 1 && ","}
          </span>
        </Fragment>
      ))}
      <span className="text-[#da70d6]">
        {blob.blocktypes.length ? (
          <>
            <br />
            &nbsp;&nbsp;
          </>
        ) : null}
        {"]"}
      </span>
      <span className="text-[#cccccc]">,</span>
      <br />
      <span className="text-[#9cdcfe]">&nbsp;&nbsp;"accounts"</span>
      <span className="text-[#cccccc]">:</span>
      <span className="text-[#da70d6]">&nbsp;{"["}</span>
      {blob.accounts.map((account, idx) => (
        <Fragment key={account}>
          <br />
          <span className="text-[#ce9178]">
            &nbsp;&nbsp;&nbsp;&nbsp;"{account}"
            {idx !== blob.accounts.length - 1 && ","}
          </span>
        </Fragment>
      ))}
      <span className="text-[#da70d6]">
        {blob.accounts.length ? (
          <>
            <br />
            &nbsp;&nbsp;
          </>
        ) : null}
        {"]"}
      </span>
      <br />
      <span className="text-[#ffd700]">{"}"}</span>
    </pre>
  );
}
