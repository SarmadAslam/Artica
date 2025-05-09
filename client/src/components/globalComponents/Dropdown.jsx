
const Dropdown = ({defaultOption, options, selectedValue, onChange, label, className }) => {
  return (
    <div className={`w-full md:w-64 ${className}`}>
      {label && <label className="block text-lg font-semibold mb-2">{label}</label>}
      <select
        value={selectedValue}
        onChange={(e) => onChange(e.target.value)}
        className="p-2 w-full bg-white text-black rounded-lg"
      >
        <option value="">{defaultOption}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
