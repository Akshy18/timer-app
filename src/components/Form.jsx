import React, { useState } from "react";

const Form = ({ onSubmit, options, handleModal }) => {
  // Extract category names from options array passed as props
  const [categories, setCategories] = useState(
    options.map((option) => option[0])
  );

  // State to track if user is adding a new category
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  // State for new category name input
  const [newCategory, setNewCategory] = useState("");

  // Main form state with validation error handling
  const [formData, setFormData] = useState({
    number: "",         // Time in seconds
    name: "",           // Activity name
    error: "",          // Validation error message
    category: categories[0], // Default to first category
  });

  // Handle changes to form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form submission with validation
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate time is positive
    if (formData.number <= 0) {
      setFormData({ ...formData, error: "Time must be greater than 0" });
      return;
    }
    
    // Validate activity name is not empty
    if (formData.name.trim() === "") {
      setFormData({ ...formData, error: "Activity name is required" });
      return;
    }
    
    // Validate category is selected
    if (formData.category.trim() === "") {
      setFormData({ ...formData, error: "Category is required" });
      return;
    }
    
    // Validate time is provided
    if (formData.number.trim() === "") {
      setFormData({ ...formData, error: "Time is required" });
      return;
    }

    // Check if time is less than 24 hours (for usability)
    const hours = Math.floor(formData.number / 3600);
    if (hours >= 24) {
      setFormData({ ...formData, error: "Time must be less than 24 hours" });
      return;
    }
    
    console.log(formData);
    
    // If validation passes, submit the form data
    onSubmit(formData);
    
    // Reset form after submission
    setFormData({ number: "", name: "", error: "", category: categories[0] });
  };

  // Handle adding a new category
  const handleAddCategory = () => {
    // Only add if category name is not empty and not already in list
    if (
      newCategory.trim() !== "" &&
      !categories.includes(newCategory.trim().toLowerCase())
    ) {
      // Format category name (lowercase for consistency)
      const formattedCategory = newCategory.trim().toLowerCase();
      console.log(formattedCategory, "formattedCategory");
      
      // Add new category to list
      setCategories([...categories, formattedCategory]);
      
      // Select the new category in the form
      setFormData({ ...formData, category: formattedCategory });
      
      // Reset new category input and hide the add category form
      setNewCategory("");
      setIsAddingCategory(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-medium text-gray-800 mb-6">Add New Entry</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Time input field */}
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

        {/* Activity name input field */}
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

        {/* Category selection with option to add new */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            {/* Only show "Add New" button when not already adding */}
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
            {/* Toggle between adding new category UI and dropdown */}
            {isAddingCategory ? (
              <div className="flex w-full space-x-2">
                {/* New category input field */}
                <input
                  type="text"
                  placeholder="Enter new category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="flex-grow px-3 py-2 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-700 "
                  autoFocus
                />
                {/* Add button */}
                <button
                  onClick={handleAddCategory}
                  className="px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add
                </button>
                {/* Cancel button */}
                <button
                  onClick={() => setIsAddingCategory(false)}
                  className="px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="relative">
                {/* Category dropdown */}
                <select
                  className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 cursor-pointer pr-10"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  {/* Map all available categories to options */}
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
        
        {/* Display validation errors */}
        {formData.error.length > 0 && (
          <p className="text-red-600"> {formData.error}</p>
        )}
        
        {/* Form action buttons */}
        <div className="flex items-center justify-between space-x-2">
          {/* Submit button */}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            Add Entry
          </button>
          {/* Cancel button - closes the modal */}
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