import React, { useState } from "react";

const Form = ({ onSubmit, options, handleModal }) => {
  const [categories, setCategories] = useState(
    options.map((option) => option[0])
  );

  const [isAddingCategory, setIsAddingCategory] = useState(false);

  const [newCategory, setNewCategory] = useState("");

  const [formData, setFormData] = useState({
    number: "",
    name: "",
    error: "",
    category: categories[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.number <= 0) {
      setFormData({ ...formData, error: "Time must be greater than 0" });
      return;
    }
    if (formData.name.trim() === "") {
      setFormData({ ...formData, error: "Activity name is required" });
      return;
    }
    if (formData.category.trim() === "") {
      setFormData({ ...formData, error: "Category is required" });
      return;
    }
    if (formData.number.trim() === "") {
      setFormData({ ...formData, error: "Time is required" });
      return;
    }

    const hours = Math.floor(formData.number / 3600);
    if (hours >= 24) {
      setFormData({ ...formData, error: "Time must be less than 24 hours" });
      return;
    }
    console.log(formData);
    onSubmit(formData);
    setFormData({ number: "", name: "", error: "", category: categories[0] });
  };

  const handleAddCategory = () => {
    if (
      newCategory.trim() !== "" &&
      !categories.includes(newCategory.trim().toLowerCase())
    ) {
      const formattedCategory = newCategory.trim().toLowerCase();
      console.log(formattedCategory, "formattedCategory");
      setCategories([...categories, formattedCategory]);
      setFormData({ ...formData, category: formattedCategory });
      setNewCategory("");
      setIsAddingCategory(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-medium text-gray-800 mb-6">Add New Entry</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label
            htmlFor="number"
            className="block text-sm font-medium text-gray-700"
          >
            Time (seconds)
          </label>
          <input
            className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 transition-colors"
            type="number"
            id="number"
            name="number"
            placeholder="Enter time in seconds"
            value={formData.number}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Activity Name
          </label>
          <input
            className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 transition-colors"
            type="text"
            id="name"
            name="name"
            placeholder="Enter activity name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            {!isAddingCategory && (
              <button
                type="button"
                onClick={() => setIsAddingCategory(true)}
                className="flex items-center text-sm text-indigo-600 hover:text-indigo-800"
              >
                + Add New
              </button>
            )}
          </div>

          <div className="w-full">
            {isAddingCategory ? (
              <div className="flex w-full space-x-2">
                <input
                  type="text"
                  placeholder="Enter new category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="flex-grow px-3 py-2 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-700 "
                  autoFocus
                />
                <button
                  onClick={handleAddCategory}
                  className="px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add
                </button>
                <button
                  onClick={() => setIsAddingCategory(false)}
                  className="px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="relative">
                <select
                  className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 cursor-pointer pr-10"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  {categories.map((option, index) => (
                    <option key={index} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
        {formData.error.length > 0 && (
          <p className="text-red-600"> {formData.error}</p>
        )}
        <div className="flex items-center justify-between space-x-2">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            Add Entry
          </button>
          <button
            onClick={handleModal}
            className="px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
