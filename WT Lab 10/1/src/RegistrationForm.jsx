import React, { useState } from 'react';

const RegistrationForm = () => {
  // 1. Manage form input fields using useState
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 2. Capture user input changes using onChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // 3. Validate input fields using conditional logic
  const validate = () => {
    let tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) tempErrors.name = "Name is required";
    
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = "Email format is invalid";
    }

    if (!formData.password) {
      tempErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
    }

    setErrors(tempErrors);
    // Returns true if there are no error keys
    return Object.keys(tempErrors).length === 0;
  };

  // 4. Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    if (validate()) {
      console.log("Form Submitted Successfully:", formData);
      setIsSubmitted(true);
      
      // 5. Reset form fields after successful submission
      setFormData({ name: '', email: '', password: '' });
      setErrors({});
    } else {
      setIsSubmitted(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Create Account</h2>
      
      {isSubmitted && <p style={{ color: 'green' }}>Form submitted successfully!</p>}

      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div style={{ marginBottom: '1rem' }}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name} // Controlled Component binding
            onChange={handleChange}
            style={{ width: '100%', display: 'block' }}
          />
          {/* Dynamic Error Rendering */}
          {errors.name && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.name}</span>}
        </div>

        {/* Email Field */}
        <div style={{ marginBottom: '1rem' }}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: '100%', display: 'block' }}
          />
          {errors.email && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.email}</span>}
        </div>

        {/* Password Field */}
        <div style={{ marginBottom: '1rem' }}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{ width: '100%', display: 'block' }}
          />
          {errors.password && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.password}</span>}
        </div>

        <button type="submit" style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;