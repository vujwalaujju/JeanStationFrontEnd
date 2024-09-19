import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure you have Bootstrap imported

const ShippingForm = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
      landmark: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      phone: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      address: Yup.string().required('Required'),
      landmark: Yup.string().required('Required'),
      city: Yup.string().required('Required'),
      state: Yup.string().required('Required'),
      postalCode: Yup.string().required('Required'),
      country: Yup.string().required('Required'),
      phone: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post('http://localhost:5128/api/ShippingDetails', values);
        navigate('/payment');
      } catch (error) {
        console.error('Error submitting shipping details:', error);
      }
    },
  });

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Shipping Form</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          {['name', 'address', 'landmark', 'city', 'state', 'postalCode', 'country', 'phone'].map((field, index) => (
            <div className="col-md-6 mb-3" key={index}>
              <label htmlFor={field} className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type="text"
                id={field}
                name={field}
                className={`form-control ${formik.touched[field] && formik.errors[field] ? 'is-invalid' : ''}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[field]}
              />
              {formik.touched[field] && formik.errors[field] ? (
                <div className="invalid-feedback">{formik.errors[field]}</div>
              ) : null}
            </div>
          ))}
        </div>
        <button type="submit" className="btn btn-primary w-100">Submit</button>
      </form>
    </div>
  );
};

export default ShippingForm;
