import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      phoneNumber: '',
      role: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      phoneNumber: Yup.string()
        .matches(/^[0-9]{10}$/, 'Must be a valid mobile number')
        .required('Required'),
      role: Yup.string()
        .oneOf(['Admin', 'User'], 'Invalid Role')
        .required('Required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Required'),
    }),
    onSubmit: (values, { resetForm }) => {
      const userId = generateRandomId();
      const userData = { ...values, id: userId };

      axios.post('http://localhost:5055/api/SignUp', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        if (response.status === 201) {
          alert('Registration Done');
          resetForm();
        } else {
          alert('Error in submission');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error connecting to server');
      });
    },
  });

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Signup</h1>
      <form onSubmit={formik.handleSubmit} className="bg-light p-4 rounded shadow">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="invalid-feedback">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="text"
            className={`form-control ${formik.touched.phoneNumber && formik.errors.phoneNumber ? 'is-invalid' : ''}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phoneNumber}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
            <div className="invalid-feedback">{formik.errors.phoneNumber}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            className={`form-control ${formik.touched.role && formik.errors.role ? 'is-invalid' : ''}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.role}
          >
            <option value="" label="Select role" />
            <option value="Admin" label="Admin" />
            <option value="User" label="User" />
          </select>
          {formik.touched.role && formik.errors.role ? (
            <div className="invalid-feedback">{formik.errors.role}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="invalid-feedback">{formik.errors.password}</div>
          ) : null}
        </div>

        <button type="submit" className="btn btn-primary btn-block mt-3">Submit</button>
      </form>
    </div>
  );
};

const generateRandomId = () => {
  return Math.floor(Math.random() * 1000000);
};

export default SignUp;
