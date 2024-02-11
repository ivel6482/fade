export const Button = ({ type = "button", label, loading, loadingText = "Loading..", variant }) => {
  return (
    <button
      type={type}
      disabled={loading}
      className={`flex justify-center ${variant === "wide" && "w-full"} px-4 py-2 text-sm font-medium text-white bg-blue-900 border border-transparent rounded-md shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900`}
    >
      {loading ? loadingText : label}
    </button>
  );
}
