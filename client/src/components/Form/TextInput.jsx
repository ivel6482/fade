export const TextInput = ({ name, type = "text", required, register, min, max, minLength, maxLength, validate, pattern, errors }) => {
  const error = errors?.[name];

  return (
    <>
      <input
        {...register(name, { required, min, max, minLength, maxLength, validate, pattern })}
        type={type}
        className={`${error?.message && "border-red-500"} block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-700 focus:border-blue-700 sm:text-sm`}
      />
      {error?.message && <small className="text-red-500">{error?.message}</small>}
    </>
  );
}
