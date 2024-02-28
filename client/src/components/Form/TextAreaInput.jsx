export const TextAreaInput = ({ name, row = 3, required, register, min, max, minLength, maxLength, validate, pattern, errors, ...rest }) => {
  const error = errors?.[name];

  return (
    <>
      <textarea
        row={3}
        {...register(name, { required, min, max, minLength, maxLength, validate, pattern })}
        className={`${error?.message && "border-red-500"} block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-700 focus:border-blue-700 sm:text-sm`}
        {...rest}
      />
      {error?.message && <small className="text-red-500">{error?.message}</small>}
    </>
  );
}
