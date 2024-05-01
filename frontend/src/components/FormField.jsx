import React from "react";

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpireMe,
  handleSurpriseMe,
}) => {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900"
        >
          {labelName}
        </label>
        {isSurpireMe && (
          <button
            onClick={handleSurpriseMe}
            type="button"
            className="rounded-[5px] bg-[#ECECF1] px-2 py-1 text-xs font-semibold text-black"
          >
            Удиви меня
          </button>
        )}
      </div>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className="block w-full rounded-md border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      />
    </div>
  );
};

export default FormField;
