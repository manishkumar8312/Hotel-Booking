import React, { useState,useEffect } from "react";
import { assets, cities } from "../assets/assets";
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const HotelReg = () => {
  const navigate = useNavigate();

  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    address: "",
    city: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    contact: "",
    address: "",
    city: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const validateField = (id, value) => {
    let error = "";
    switch (id) {
      case "name":
        if (!value.trim()) {
          error = "Hotel name cannot be empty.";
        } else if (!/^[A-Za-z0-9&\-',.() ]{2,100}$/.test(value.trim())) {
          error = "Please enter a valid hotel name.";
        }
        break;
      case "contact":
        if (!/^\d{10}$/.test(value)) {
          error = "Please enter a valid 10-digit phone number.";
        }
        break;
      case "address":
        if (!value.trim()) {
          error = "Address cannot be empty.";
        }
        break;
      case "city":
        if (!value) {
          error = "Please select a city.";
        }
        break;
      default:
        break;
    }
    setErrors((prev) => ({
      ...prev,
      [id]: error,
    }));
    return error;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleBlur = async(e) => {
    const { id, value } = e.target;
    validateField(id, value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    let isValid = true;
    let newErrors = {};

    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      newErrors[key] = error;
      if (error) isValid = false;
    });

    setErrors(newErrors);

    if (isValid) {
      console.log("Form submitted successfully!", formData);
      alert("Hotel registered successfully!");
      // // You can add actual submission logic here
      try {
      const token = await getToken();
      
      const response = await axios.post('/api/hotels/register', {
        name: formData.name,
        contact: formData.contact,
        address: formData.address,
        city: formData.city
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        toast.success('Hotel registered successfully! 🎉');
        
        // Reset form
        setFormData({
          name: '',
          location: '',
          pricePerNight: '',
          imageUrl: '',
          description: ''
        });
      }
    } catch (error) {
      console.error('Error registering hotel:', error);
      
      if (error.response?.status === 403) {
        toast.error('Access denied. Hotel owner role required.');
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.data?.errors) {
        toast.error(error.response.data.errors.join(', '));
      } else {
        toast.error('Failed to register hotel. Please try again.');
      }
    } finally {
      setLoading(false);
    }
    }
  };

  useEffect(() => {
    const hasErrors = Object.values(errors).some((err) => err !== "");
    const hasEmptyFields = Object.values(formData).some(
      (val) => val.trim() === ""
    );
    setIsFormValid(!hasErrors && !hasEmptyFields);
  }, [formData, errors]);

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center justify-center bg-black/70">
      <form
        onSubmit={handleSubmit}
        className="flex bg-white rounded-xl max-w-4xl max-md:mx-2"
      >
        <img
          src={assets.regImage}
          alt="reg-image"
          className="w-1/2 rounded-xl hidden md:block"
        />
        <div className="relative flex flex-col items-center md:w-1/2 p-8 md:p-10">
          <img
            src={assets.closeIcon}
            alt="close-icon"
            onClick={()=>navigate("/rooms")}
            className="absolute top-4 right-4 h-4 w-4 cursor-pointer"
          />
          <p className="text-2xl font-semibold mt-6">Register Your Hotel</p>

          {/* Hotel Name */}
          <div className="w-full mt-4">
            <label htmlFor="name" className="font-medium text-gray-500">
              Hotel Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Type here"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="rounded border border-gray-200 px-3 py-2.5 mt-1 outline-indigo-500 font-light w-full"
              required
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Phone */}
          <div className="w-full mt-4">
            <label htmlFor="contact" className="font-medium text-gray-500">
              Phone
            </label>
            <input
              id="contact"
              type="text"
              placeholder="Type here"
              value={formData.contact}
              onChange={handleChange}
              onBlur={handleBlur}
              className="rounded border border-gray-200 px-3 py-2.5 mt-1 outline-indigo-500 font-light w-full"
              required
            />
            {errors.contact && (
              <p className="text-red-500 text-sm mt-1">{errors.contact}</p>
            )}
          </div>

          {/* Address */}
          <div className="w-full mt-4">
            <label htmlFor="address" className="font-medium text-gray-500">
              Address
            </label>
            <input
              id="address"
              type="text"
              placeholder="Type here"
              value={formData.address}
              onChange={handleChange}
              onBlur={handleBlur}
              className="rounded border border-gray-200 px-3 py-2.5 mt-1 outline-indigo-500 font-light w-full"
              required
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>

          {/* City */}
          <div className="w-full mt-4 max-w-60 mr-auto">
            <label htmlFor="city" className="font-medium text-gray-500">
              City
            </label>
            <select
              id="city"
              value={formData.city}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border border-gray-200 px-3 py-2.5 mt-1 outline-indigo-500 font-light rounded w-full"
              required
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option value={city} key={city}>
                  {city}
                </option>
              ))}
            </select>
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            onClick={handleSubmit}
            className={`mr-auto px-6 py-2 rounded mt-6 transition-all cursor-pointer ${
              isFormValid
                ? "bg-indigo-500 text-white hover:bg-indigo-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default HotelReg;
