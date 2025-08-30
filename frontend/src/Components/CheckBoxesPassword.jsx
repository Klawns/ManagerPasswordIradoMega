export default function CheckBoxesPassword({ checked, set, text }) {
  return (
    <div className="flex items-center space-x-2 text-white">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => set(e.target.checked)}
      />
      <span>{text}</span>
    </div>
  );
}
