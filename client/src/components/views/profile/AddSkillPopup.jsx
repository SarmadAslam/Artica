import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Button from "../../globalComponents/Button";

const AddSkillPopup = ({ isOpen, onClose, onAddSkill }) => {
  const [newSkill, setNewSkill] = useState("");

  const handleAdd = () => {
    if (newSkill.trim()) {
      onAddSkill(newSkill);
      setNewSkill(""); // Clear input field after adding
      onClose(); // Close popup
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 bg-opacity-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-[300px]">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">Add a New Skill</h3>
          <button onClick={onClose} className="text-red-500">
            <FaTimes />
          </button>
        </div>
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Enter skill"
          className="w-full p-2 border rounded-md"
        />
        <div className="flex justify-end gap-2 mt-3">
          <Button text="Add" variant="primary" onClick={handleAdd}/>
          <Button text="Cancel" variant="outline" onClick={onClose}/>
        </div>
      </div>
    </div>
  );
};

export default AddSkillPopup;
