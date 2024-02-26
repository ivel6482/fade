export const SelectInput = ({ id, name, register, errors, defaultOptionValue = "", defaultOptionText = "Default option", options }) => {
  const error = errors?.[name];

  return (
    <>
      <select
        id={id}
        name={name}
        className='block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-blue-700 focus:border-blue-700 sm:max-w-xs sm:text-sm'
        {...register(name)}
      >
        <option value=''>Select open time</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
      {error?.message && <small className="text-red-500">{error?.message}</small>}
    </>
  );
}
