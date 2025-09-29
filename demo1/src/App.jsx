import React, { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Form Data:", formData);
  //   setSuccess(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data.message);
      setSuccess(true);
    } catch (err) {
      console.error("Error:", err);
    }

    // Reset form
    setFormData({ name: "", email: "", mobile: "" });

    // Hide message after 3 seconds
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="container">
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-box">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-box">
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            pattern="[0-9]{10}"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
        {success && <div className="success-message">Form Submitted Successfully!</div>}
      </form>
    </div>
  );
}

export default App;
