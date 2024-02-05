export const Input = ({ label, name, required, register, type = "text", min, max, minLength, maxLength, validate, pattern, errors }) => {
  const error = errors?.[name];

  return (
    <div className='space-y-1'>
      <label
        className='block text-sm font-medium text-gray-700'
      >
        {label}
      </label>
      <div className='mt-1'>
        <input
          {...register(name, { required, min, max, minLength, maxLength, validate, pattern })}
          type={type}
          className={`${error?.message && "border-red-500"}block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-700 focus:border-blue-700 sm:text-sm`}
        />
        {error?.message && <small className="text-red-500">{error?.message}</small>}
      </div>
    </div>
  );
}
