/* global process */
import React, { useState } from "react";

// Use the environment variable for backend URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function App() {
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    gender: "",
    skills: "",
  });

  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BACKEND_URL}/api/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      alert(data.message || "Submitted successfully!");
      setSubmittedData(formData);
      setFormData({ name: "", rollNo: "", gender: "", skills: "" });
    } catch (err) {
      console.error(err);
      alert("Error submitting data");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg font-sans">
      <h2 className="text-2xl font-bold mb-6 text-center">Basic Details Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Roll No:</label>
          <input
            type="text"
            name="rollNo"
            value={formData.rollNo}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Gender:</label>
          <div className="flex gap-4">
            {["Male", "Female", "Other"].map((g) => (
              <label key={g} className="flex items-center gap-1">
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={formData.gender === g}
                  onChange={handleChange}
                  required
                  className="form-radio"
                />
                {g}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Skills:</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="e.g. HTML, CSS, JS"
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>
      </form>

      {submittedData && (
        <div className="mt-6 bg-gray-100 p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Submitted Data:</h3>
          <p><strong>Name:</strong> {submittedData.name}</p>
          <p><strong>Roll No:</strong> {submittedData.rollNo}</p>
          <p><strong>Gender:</strong> {submittedData.gender}</p>
          <p><strong>Skills:</strong> {submittedData.skills}</p>
        </div>
      )}
    </div>
  );
}

export default App;
