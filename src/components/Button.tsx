export default function Button(
  props: Omit<
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    "className"
  >,
) {
  return (
    <button
      {...props}
      type="button"
      className="rounded-md bg-indigo-600 disabled:bg-gray-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:focus-visible:outline-gray-600"
    />
  );
}
