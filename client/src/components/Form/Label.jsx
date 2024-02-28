export const Label = ({ value, htmlFor, className }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`${className ?? "block text-sm font-medium text-gray-700"}`}
    >
      {value}
    </label>
  );
}
