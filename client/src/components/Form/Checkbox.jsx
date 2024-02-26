export const Checkbox = ({ id, name, register, errors, ...rest }) => {
  return (
    <input
      id={id}
      type='checkbox'
      className='w-4 h-4 text-blue-700 border-gray-300 rounded focus:ring-blue-700'
      {...register(name)}
      {...rest}
    />
  );
};
