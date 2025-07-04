"use client";

import React, { useState, useEffect } from "react";
import { useSiteSettings } from "../context/SiteSettingsContext";

const BookingPage = () => {
  const { siteSettings } = useSiteSettings();
  const [formData, setFormData] = useState({
    appointmentType: "",
    name: "",
    email: "",
    mobile: "",
    comments: "",
    date: "",
    timeSlot: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [slotError, setSlotError] = useState(null);

  useEffect(() => {
    if (siteSettings) {
      setLoading(false);
    } else {
      setError('Error loading site settings');
    }
  }, [siteSettings]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // If date changes, fetch available slots
    if (name === 'date' && value) {
      fetchAvailableSlots(value);
    }
  };

  const fetchAvailableSlots = async (date) => {
    if (!date) return;
    
    setIsLoadingSlots(true);
    setSlotError(null);
    
    try {
      // Format date to YYYY-MM-DD if needed
      const formattedDate = new Date(date).toISOString().split('T')[0];
      const response = await fetch(
        `https://passport.nevadacloud.com/api/v1/public/appointments/available_slots?date=${formattedDate}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch available slots');
      }
      
      const data = await response.json();
      setAvailableSlots(data.available_slots || []);
    } catch (error) {
      console.error('Error fetching available slots:', error);
      setSlotError('Failed to load available time slots. Please try again.');
      setAvailableSlots([]);
    } finally {
      setIsLoadingSlots(false);
    }
  };

  const handleTimeSlotSelect = (timeSlot) => {
    setFormData({ ...formData, timeSlot });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.timeSlot) {
      alert('Please select an available time slot');
      return;
    }
    
    try {
      const response = await fetch('https://www.eyecareportal.com/api/book_appointment/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          appointment_date: formData.date,
          appointment_time: formData.timeSlot,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to book appointment');
      }
      
      const result = await response.json();
      alert('Appointment booked successfully!');
      // Reset form or redirect as needed
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment. Please try again.');
    }
  };

  return (
    <section id="booking" className="section cta pt-0 pb-0">
      <div className="book flex flex-col lg:flex-row" style={{ minHeight: "681px" }}>
        <div className="map lg:w-1/2 relative">
          <iframe
            src={`https://maps.google.com/maps?q=${siteSettings.address_1}&output=embed`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
          ></iframe>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="p-6 bg-white shadow-md rounded">
              <h5 className="secondary-color text-gray-800">Physical Address</h5>
              <ul className="list-unstyled">
                <li className="text-gray-500">{siteSettings.address_1}</li>
              </ul>
              <h5 className="secondary-color text-gray-800">Trading Hours</h5>
              {console.log('Working Hours:', siteSettings.working_hours)}
              <ul className="list-unstyled">
                {siteSettings.working_hours.map((schedule, index) => {
                  const days = schedule.days;
                  let displayDays = '';

                  if (days.includes(0) && days.includes(1) && days.includes(2) && days.includes(3) && days.includes(4)) {
                    displayDays = 'Monday - Friday';
                  } else if (days.includes(5)) {
                    displayDays = 'Saturday';
                  } else if (days.includes(6)) {
                    displayDays = 'Sunday';
                  }
                  else if (days.includes(7)) {
                    displayDays = 'Public Holidays';
                  }

                  return (
                    <li key={index} className="text-gray-500">
                      {schedule.open ? `${displayDays}: ${schedule.start} - ${schedule.end}` : `${displayDays}: Closed`}
                    </li>
                  );
                })}
              </ul>
              <h5 className="secondary-color text-gray-800">Contact Details</h5>
              <ul className="list-unstyled">
                <li className="text-gray-500"> {siteSettings.tel} </li>
                <li className="text-gray-500"> {siteSettings.email} </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container lg:w-1/2 p-8">
          <h3 id="book_appointment" className="text-2xl mb-4 font-bold text-center text-gray-800">
            <span className="text-primary">Book</span> Your Appointment
          </h3>
          <form 
            onSubmit={handleSubmit}
            className="form bg-white rounded-lg shadow-md px-8 pt-8 pb-6 mb-4 w-full max-w-2xl mx-auto"
            id="booking_form" 
            name="booking_form"
          >
            <div className="mb-6">
              <select
                id="appt_type"
                name="appointmentType"
                value={formData.appointmentType}
                onChange={handleInputChange}
                className="w-full p-3.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 bg-white transition duration-200"
              >
                <option disabled value="" className="text-gray-400">Select appointment type</option>
                <option value="consult" className="text-gray-800">Full examination</option>
                <option value="drivers" className="text-gray-800">Driver's screening</option>
              </select>
            </div>
            
            <div className="mb-5">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-400 transition duration-200"
              />
            </div>
            
            <div className="mb-5">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-400 transition duration-200"
              />
            </div>
            
            <div className="mb-5">
              <input
                type="text"
                name="mobile"
                placeholder="Contact Number"
                value={formData.mobile}
                onChange={handleInputChange}
                className="w-full p-3.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-400 transition duration-200"
              />
            </div>
            
            <div className="mb-5">
              <textarea
                name="comments"
                placeholder="Additional Comments"
                value={formData.comments}
                onChange={handleInputChange}
                className="w-full p-3.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-400 transition duration-200"
                rows="4"
              ></textarea>
            </div>

            <div className="mb-6">
              <select
                id="appt_type"
                name="appointmentType"
                value={formData.appointmentType}
                onChange={handleInputChange}
                className="w-full p-3.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 bg-white transition duration-200"
              >
                <option disabled value="" className="text-gray-400">Select practitioner</option>
                <option value="consult" className="text-gray-800">Dr. Matthew</option>
                <option value="drivers" className="text-gray-800">Dr. Paul Ketz</option>
              </select>
            </div>
            
            <div className="mb-6">
              <input
                type="date"
                name="date"
                placeholder="Select a date"
                value={formData.date}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full p-3.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-400 transition duration-200"
                required
              />
              
              {/* Time Slots */}
              {formData.date && (
                <div className="mt-5">
                  <h4 className="text-gray-700 font-medium mb-3 text-lg">Available Time Slots</h4>
                  {isLoadingSlots ? (
                    <p className="text-gray-600">Loading available slots...</p>
                  ) : slotError ? (
                    <p className="text-red-500">{slotError}</p>
                  ) : availableSlots.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {availableSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => handleTimeSlotSelect(slot)}
                          className={`p-3.5 border rounded-md text-center transition-colors duration-200 ${
                            formData.timeSlot === slot
                              ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                              : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:border-blue-300'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">No available slots for this date. Please select another date.</p>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8">
              <button
                id="booking_call_me"
                type="button"
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors duration-200 font-medium"
              >
                Request call
              </button>
              <button
                id="booking_button"
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
              >
                Book Appointment
              </button>
            </div>
          </form>
          <div className="box mt-8">
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingPage;