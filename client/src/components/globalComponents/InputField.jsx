const InputField = ({ label, value, onChange, ...props }) => {
  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-medium text-[#4B5563]">{label}</label>}
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-[#D1D5DB] rounded-lg outline-none focus:ring-2 focus:ring-[#421983]"
        {...props}
      />
    </div>
  );
};

export default InputField;