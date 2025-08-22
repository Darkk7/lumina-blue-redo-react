"use client";

import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useSiteSettings } from "../context/SiteSettingsContext";
import { useParams } from 'next/navigation';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const BookingPage = () => {
  const { siteSettings } = useSiteSettings();
  const [practitioners, setPractitioners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const practiceId = siteSettings?.practiceId;

  // Success Modal Component
  const SuccessModal = ({ onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Thank You!</h3>
          <p className="text-gray-600 mb-6">
            Thank you for reaching out to us.<br />
            Our practice staff will contact you to arrange a booking.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    if (!practiceId) {
      throw new Error('No practiceId available'); 
    }

    const fetchPractitioners = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://passport.nevadacloud.com/api/v1/public/practices/${practiceId}`);
        
        if (!response.data || !Array.isArray(response.data.optometrists)) {
          setError('No practitioners found for this practice');
          return;
        }
        
        const optometrists = response.data.optometrists || [];
        
        const mappedPractitioners = optometrists.map(opt => {
          // Process calendar_time_slots_unavailable
          const availability = {
            closedDays: [],
            unavailableSlots: []
          };

          if (opt.calendar_time_slots_unavailable) {
            // Split by semicolon to handle multiple rules
            const rules = opt.calendar_time_slots_unavailable.split(';');
            
            rules.forEach(rule => {
              // Handle closed days (e.g., "2-Closed" means Wednesday is closed)
              if (rule.endsWith('-Closed')) {
                const day = parseInt(rule.split('-')[0]);
                if (!isNaN(day)) {
                  availability.closedDays.push(day);
                }
              }
              // Handle time slots (e.g., "0|1|2|3|4-13:00-14:00" means Mon-Fri 13:00-14:00 is unavailable)
              else if (rule.includes('-') && rule.includes('|')) {
                const [days, times] = rule.split('-');
                const [startTime, endTime] = times.split('-');
                const dayList = days.split('|').map(Number);
                
                dayList.forEach(day => {
                  availability.unavailableSlots.push({
                    day,
                    startTime,
                    endTime 
                  });
                });
              }
            });
          }

          return {
            value: opt.id,
            label: `${opt.name} ${opt.surname}`,
            qualification: opt.qualification,
            availability,
            calendar_time_slots_unavailable: opt.calendar_time_slots_unavailable // Keep original for reference
          };
        });
        
        setPractitioners(mappedPractitioners);
        setError(null);
      } catch (error) {
        console.error('Error fetching practitioners:', error);
        setError('Failed to load practitioners. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPractitioners();
  }, [practiceId]);


  const [formData, setFormData] = useState({
    appointmentType: "",
    name: "",
    email: "",
    mobile: "",
    comments: "",
    date: "",
    timeSlot: "",
    practitioner: "",
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [slotError, setSlotError] = useState(null);
  const [selectedPractitioner, setSelectedPractitioner] = useState(null);

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
    
    // If date changes and practitioner is selected, fetch available slots
    if (name === 'date' && value && formData.practitioner) {
      fetchAvailableSlots(value, formData.practitioner);
    }
  };

  const handlePractitionerChange = (e) => {
    const practitionerId = e.target.value;
    const selected = practitioners.find(p => p.value.toString() === practitionerId);
    setSelectedPractitioner(selected);
    setFormData({ ...formData, practitioner: practitionerId });
    
    // If date is already selected, fetch available slots
    if (formData.date) {
      fetchAvailableSlots(formData.date, practitionerId);
    }
  };

  // Helper function to parse unavailable time slots
  const parseUnavailableSlots = (unavailableString, selectedDate) => {
    if (!unavailableString) return [];
    
    const dayOfWeek = new Date(selectedDate).getDay(); // 0 = Sunday, 1 = Monday, etc.
    const unavailableSlots = [];
    
    // Split by semicolon to handle multiple rules
    const rules = unavailableString.split(';');
    
    rules.forEach(rule => {
      // Handle closed days (e.g., "2-Closed" means Wednesday is closed)
      if (rule.endsWith('-Closed')) {
        const day = parseInt(rule.split('-')[0]);
        if (day === dayOfWeek) {
          // If the whole day is closed, mark all slots as unavailable
          unavailableSlots.push({ allDay: true });
        }
      }
      // Handle time slots (e.g., "0|1|2|3|4-13:00-14:00" means Mon-Fri 13:00-14:00 is unavailable)
      else if (rule.includes('-') && rule.includes('|')) {
        const [days, times] = rule.split('-');
        const [startTime, endTime] = times.split('-');
        const dayList = days.split('|').map(Number);
        
        if (dayList.includes(dayOfWeek)) {
          unavailableSlots.push({
            startTime,
            endTimeW
          });
        }
      }
    });
    
    return unavailableSlots;
  };

  const fetchAvailableSlots = async (date, practitionerId) => {
    if (!date || !practitionerId || !practiceId) {
      setAvailableSlots([]);
      return;
    }
    
    setIsLoadingSlots(true);
    setSlotError(null);
    
    try {
      // Format date to YYYY-MM-DD
      const selectedDate = new Date(date);
      const dayOfWeek = selectedDate.getDay() - 1; // Convert to 0-6 (Mon-Sun) format
      const formattedDate = selectedDate.toISOString().split('T')[0];
      const today = new Date();
      const isToday = formattedDate === today.toISOString().split('T')[0];
      
      // Get current time in HH:MM format for comparison
      const currentHours = String(today.getHours()).padStart(2, '0');
      const currentMinutes = String(today.getMinutes()).padStart(2, '0');
      const currentTime = `${currentHours}:${currentMinutes}`;
      
      // Get the selected practitioner's data
      const selectedPractitioner = practitioners.find(p => p.value === practitionerId);
      
      if (selectedPractitioner?.availability?.closedDays?.includes(dayOfWeek)) {
        setAvailableSlots([]);
        setSlotError('No availability on this day');
        return;
      }
      
      // Get available slots from API
      const response = await axios.post(
        'https://passport.nevadacloud.com/api/v1/public/appointments/available_slots',
        {
          practice_id: practiceId,
          practitioner_id: practitionerId,
          appointment_date: formattedDate
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.data && Array.isArray(response.data)) {
        // Filter out unavailable slots based on calendar_time_slots_unavailable
        const unavailableSlots = [];
        
        // Add unavailable time slots for this day
        if (selectedPractitioner?.availability?.unavailableSlots) {
          const todayUnavailable = selectedPractitioner.availability.unavailableSlots
            .filter(slot => slot.day === dayOfWeek)
            .map(({ startTime, endTime }) => ({
              startTime,
              endTime,
              allDay: false
            }));
          
          unavailableSlots.push(...todayUnavailable);
        }
        
        const filteredSlots = response.data.filter(slot => {
          // If it's today, filter out past time slots
          if (isToday) {
            const [slotHours, slotMinutes] = slot.time.split(':');
            const slotTime = `${slotHours}:${slotMinutes}`;
            
            // Compare times as strings in HH:MM format
            if (slotTime < currentTime) {
              return false;
            }
          }
          
          // Check if the slot falls within any unavailable time range
          return !unavailableSlots.some(unavailable => {
            if (unavailable.allDay) return true;
            
            const slotTime = slot.time;
            return (
              slotTime >= unavailable.startTime && 
              slotTime < unavailable.endTime
            );
          });
        });
        
        setAvailableSlots(filteredSlots);
      } else {
        setAvailableSlots([]);
        setSlotError('No availability data received');
      }
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

  const handleRequestCall = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.mobile) {
      alert('Please provide both name and contact number');
      return;
    }

    const formDataToRequest = new FormData();
    formDataToRequest.append('appointment[action]', 'call');
    formDataToRequest.append('appointment[appt_type]', '');
    formDataToRequest.append('appointment[name]', formData.name);
    formDataToRequest.append('appointment[email]', '');
    formDataToRequest.append('appointment[cell]', formData.mobile);
    formDataToRequest.append('appointment[notes]', '');
    formDataToRequest.append('appointment[date]', '');
    formDataToRequest.append('appointment[request_timezone]', '');
    formDataToRequest.append('appointment[start_time]', '');
    formDataToRequest.append('appointment[end_time]', '');
    formDataToRequest.append('appointment[practitioner_id]', '');
    formDataToRequest.append('appointment[status]', 'requested');
    formDataToRequest.append('appointment[practice_id]', practiceId);
    formDataToRequest.append('appointment[source]', 'lumina');
    formDataToRequest.append('practice[id]', practiceId);
    formDataToRequest.append('practice[name]', siteSettings?.practiceName || 'Image Eye Care');
    formDataToRequest.append('practice[email]', siteSettings?.contactEmail || 'support@nevadacloud.com');

    try {
      const requestResponse = await axios.post(
        'https://www.eyecareportal.com/api/request_call_appointment/',
        formDataToRequest,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (requestResponse.data.status === 'created') {
        setShowSuccessModal(true);
        setFormData(prev => ({
          ...prev,
          name: "",
          mobile: ""
        }));
      } else {
        throw new Error('Failed to create request');
      }
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      alert('Failed to submit request. Please try again.');
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.timeSlot || !formData.date || !formData.practitioner) {
      alert('Please fill in all required fields and select a time slot');
      return;
    }
    
    try {
      let phoneNumber = formData.mobile;

      if (phoneNumber && !phoneNumber.startsWith('+')) {
        const digits = phoneNumber.replace(/\D/g, '');
        if (digits.startsWith('0')) {
          phoneNumber = `+27${digits.substring(1)}`;
        } else if (digits.length > 0) {
          phoneNumber = `+27${digits}`;
        }
      }

      // Format dates for the API
      const appointmentDate = new Date(formData.date);
      const [hours, minutes] = formData.timeSlot.split(':');
      
      // Set the time for start and end (assuming 30-minute slots)
      const startTime = new Date(appointmentDate);
      startTime.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
      
      const endTime = new Date(startTime);
      endTime.setMinutes(endTime.getMinutes() + 30);
      
      const timezoneOffset = -startTime.getTimezoneOffset() / 60;
      const timezoneString = `${timezoneOffset >= 0 ? '+' : ''}${timezoneOffset.toString().padStart(2, '0')}:00`;
      
      const selectedPractitioner = practitioners.find(p => p.value.toString() === formData.practitioner);
      
      const formDataToSend = new FormData();
      
      // Appointment details
      formDataToSend.append('appointment[action]', 'book');
      formDataToSend.append('appointment[appt_type]', 'consult');
      formDataToSend.append('appointment[name]', formData.name);
      formDataToSend.append('appointment[email]', formData.email);
      formDataToSend.append('appointment[cell]', phoneNumber); // Use the formatted phone number
      formDataToSend.append('appointment[notes]', formData.comments || '');
      formDataToSend.append('appointment[date]', formData.date);
      formDataToSend.append('appointment[request_timezone]', timezoneString);
      formDataToSend.append('appointment[start_time]', startTime.toISOString());
      formDataToSend.append('appointment[end_time]', endTime.toISOString());
      formDataToSend.append('appointment[practitioner_id]', formData.practitioner);
      formDataToSend.append('appointment[status]', 'requested');
      formDataToSend.append('appointment[source]', 'lumina');

      formDataToSend.append('practice[id]', practiceId);
      formDataToSend.append('practice[name]', siteSettings?.practiceName || 'Image Eye Care');
      formDataToSend.append('practice[email]', siteSettings?.contactEmail || 'support@nevadacloud.com');

      const response = await axios.post(
        'https://www.eyecareportal.com/api/book_appointment/',
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      if (response.data.status === 'created') {
        setShowSuccessModal(true);
        // Reset form
        setFormData({
          appointmentType: "",
          name: "",
          email: "",
          mobile: "",
          comments: "",
          date: "",
          timeSlot: "",
          practitioner: "",
        });
        setAvailableSlots([]);
      } else {
        throw new Error('Failed to book appointment');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('There was an error booking your appointment. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8" id="booking">
        {/* Success Modal */}
        {showSuccessModal && (
          <SuccessModal onClose={() => setShowSuccessModal(false)} />
        )}
        
        <section id="booking" className="section cta pt-0 pb-0">
          <div className="book flex flex-col lg:flex-row bg-white rounded-lg shadow-md overflow-hidden" style={{ minHeight: "681px" }}>
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
                
                {formData.appointmentType === 'drivers' ? (
                  <div className="text-center py-8">
                    <p className="text-orange-500 text-xl font-medium">
                      Please call us directly to make a driver's screening appointment.
                    </p>
                  </div>
                ) : (
                  <>
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
                    
                    <div className="mb-4">              
                      <div className="relative">
                        <PhoneInput
                          international
                          defaultCountry="ZA"
                          value={formData.mobile}
                          onChange={(value) => setFormData({ ...formData, mobile: value })}
                          className="w-full p-3.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 bg-white transition duration-200"
                          placeholder="Contact Number"
                          required
                        />
                      </div>
                    </div>
                    
                    <textarea
                        name="comments"
                        placeholder="Additional Comments"
                        value={formData.comments}
                        onChange={handleInputChange}
                        className="w-full p-3.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-400 transition duration-200"
                        rows="4"
                      />

                    <div className="mb-5">
                      <div className="mb-5">
                        <select
                          id="practitioner"
                          name="practitioner"
                          value={formData.practitioner || ''}
                          onChange={handlePractitionerChange}
                          className="w-full p-3.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 bg-white transition duration-200"
                          required
                          disabled={loading || practitioners.length === 0}
                        >
                          <option value="" disabled>Select practitioner</option>
                          {practitioners.length > 0 ? (
                            practitioners.map(practitioner => (
                              <option key={practitioner.value} value={practitioner.value}>
                                {practitioner.label}
                              </option>
                            ))
                          ) : (
                            <option value="" disabled>No practitioners available</option>
                          )}
                        </select>
                        {loading && <p className="mt-1 text-sm text-gray-500">Loading practitioners...</p>}
                        {!loading && practitioners.length === 0 && !error && (
                          <p className="mt-1 text-sm text-yellow-600">No practitioners found for this practice</p>
                        )}
                        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
                      </div>

                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full mb-5 p-3.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-400 transition duration-200"
                        required
                      />
                      
                      {/* Time Slots */}
                      {formData.date && formData.practitioner && (
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
                                  key={slot.time}
                                  type="button"
                                  onClick={() => handleTimeSlotSelect(slot.time)}
                                  className={`p-3.5 border rounded-md text-center transition-colors duration-200 ${
                                    formData.timeSlot === slot.time
                                      ? 'bg-primary text-white border-primary hover:bg-primary'
                                      : 'border-gray-300 text-gray-700 bg-white hover:bg-primary-50 hover:border-primary'
                                  }`}
                                >
                                  {slot.time} - {slot.time_end}
                                </button>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-600">No available slots for this date. Please select another date.</p>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {/* Success Message */}
                    <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded hidden" id="booking-success-message">
                      Your appointment has been booked successfully!
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8">
                      <button
                        id="booking_call_me"
                        type="button"
                        className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors duration-200 font-medium"
                        onClick={handleRequestCall}
                      >
                        Request Call
                      </button>
                      <button
                        id="booking_button"
                        type="submit"
                        className="px-6 py-3 bg-black text-white rounded-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-200 font-medium"                     >
                        Book Appointment
                      </button>
                    </div>
                  </>
                )}
              </form>
              <div className="box mt-8">
                
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BookingPage;