import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { categories } from "../utils/blogs";

interface CustomDropdownProps {
  value: string;
  onChange: (category: string) => void;
}

const CustomDropdown = ({ value, onChange }: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (category: string) => {
    onChange(category);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="
          flex w-full items-center justify-between
          rounded-lg border border-gray-200
          bg-gray-100 p-3
          text-left
          transition
          hover:bg-gray-200
          focus:outline-none
        "
      >
        <span className={value ? "text-gray-900" : "text-gray-400"}>
          {value || "Select a category"}
        </span>

        <ChevronDown
          size={18}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          className="
            absolute z-50 mt-2
            max-h-64 w-full overflow-y-auto
            rounded-lg border border-gray-200
            bg-white p-1
            shadow-lg
          "
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => handleSelect(category)}
              className="
                w-full rounded-md px-3 py-2
                text-left text-sm
                hover:bg-gray-100
              "
            >
              {category}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
