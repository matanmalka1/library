import { useState } from "react";
import Input from "../common/Input/Input.jsx";
import Button from "../common/Button/Button.jsx";

const RegisterForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    age: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      password: formData.password,
    };

    if (formData.address.trim()) {
      payload.address = formData.address.trim();
    }

    if (formData.age !== "") {
      const parsedAge = Number(formData.age);
      if (!Number.isNaN(parsedAge)) {
        payload.age = parsedAge;
      }
    }

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="First name"
        required
      />
      <Input
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Last name"
        required
      />
      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="your@email.com"
        required
      />
      <Input
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Address (optional)"
      />
      <Input
        label="Age"
        type="number"
        name="age"
        value={formData.age}
        onChange={handleChange}
        placeholder="Age (optional)"
      />
      <Input
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Create a password"
        required
      />
      <Button type="submit" disabled={loading} fullWidth>
        {loading ? "Creating account..." : "Create Account"}
      </Button>
    </form>
  );
};

export default RegisterForm;
