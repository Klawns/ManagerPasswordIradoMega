export default function InputPassword(props) {
  return (
    <>
      <input
        value={props.value}
        onChange={(e) => props.set(e.target.value)}
        type="text"
        placeholder={props.placeholder}
        className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500/20"
      />
    </>

  );
}
