"use client"

import { useState, useEffect } from 'react';
import { useSiteSettings } from '../context/SiteSettingsContext';
import { useRouter } from 'next/navigation';

const BookingPage = () => {
  const router = useRouter();
  const { siteSettings } = useSiteSettings();
  const [formData, setFormData] = useState({
    appointmentType: '',
    name: '',
    email: '',
    contactNumber: '',
    comments: '',
    date: '',
    time: ''
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [practiceAddress, setPracticeAddress] = useState('');

  useEffect(() => {
    // Get practice ID from site settings
    const practiceId = siteSettings.practiceId;
    console.log('Practice ID:', practiceId);
    
    if (practiceId) {
      // Make API call through our proxy endpoint
      fetch(`/api/practice?id=${practiceId}`)
        .then(response => {
          console.log('API Response Status:', response.status);
          return response.json();
        })
        .then(data => {
          console.log('Practice Data:', data);
          
          if (data.success && data.data && data.data.address_1) {
            setPracticeAddress(data.data.address_1);
          } else {
            console.log('No valid address found in response:', data);
            setPracticeAddress('190 Circular Drive, Lorraine, Port Elizabeth');
          }
        })
        .catch(error => {
          console.error('Error fetching practice data:', error);
          setPracticeAddress('190 Circular Drive, Lorraine, Port Elizabeth');
        });
    } else {
      console.log('No practice ID available');
      setPracticeAddress('190 Circular Drive, Lorraine, Port Elizabeth');
    }
  }, [siteSettings.practiceId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const fetchAvailableSlots = async (date) => {
    try {
      setIsLoading(true);
      setError('');
      
      const response = await fetch('/api/appointments/available-slots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date,
          appointment_type: formData.appointmentType
        })
      });

      const data = await response.json();
      
      if (response.status === 400) {
        setError(data.error);
        setAvailableSlots([]);
        return;
      }

      if (!response.ok) {
        setError('Failed to fetch available slots. Please try again later.');
        setAvailableSlots([]);
        return;
      }

      if (data.error) {
        setError(data.error);
        setAvailableSlots([]);
        return;
      }

      if (data.success) {
        setAvailableSlots(data.data || []);
      } else {
        setError('No available slots found for this date');
        setAvailableSlots([]);
      }
    } catch (err) {
      console.error('Network Error:', err);
      setError('Failed to connect to server. Please check your internet connection and try again.');
      setAvailableSlots([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setFormData(prev => ({ ...prev, date }));
    if (date) {
      fetchAvailableSlots(date);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    
    if (!formData.date || !formData.time) {
      setError('Please select both date and time');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      
      const appointmentDate = new Date(`${formData.date}T${formData.time}:00`).toISOString();
      
      const response = await fetch(`${API_PROXY}/book_appointment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          appointment_type: formData.appointmentType,
          patient_name: formData.name,
          email: formData.email,
          phone: formData.contactNumber,
          comments: formData.comments,
          appointment_date: appointmentDate,
        })
      });

      if (!response.ok) {
        throw new Error('Failed to book appointment');
      }

      const data = await response.json();
      
      if (data.success) {
        alert('Appointment booked successfully!');
        setFormData({
          appointmentType: '',
          name: '',
          email: '',
          contactNumber: '',
          comments: '',
          date: '',
          time: ''
        });
        setAvailableSlots([]);
      } else {
        setError(data.message || 'Failed to book appointment');
      }
    } catch (err) {
      console.error('Error booking appointment:', err);
      setError('Failed to book appointment. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="booking" className="w-full py-16 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 px-4">
        <div className="w-full lg:w-1/2">
          <div className="relative">
            <iframe
              src={`https://maps.google.com/maps?q=${practiceAddress || '190 Circular Drive, Lorraine, Port Elizabeth'}&output=embed`}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
            ></iframe>
            <div className="absolute bottom-4 left-4 bg-white p-4 shadow-lg rounded-lg">
              <h3 className="text-lg font-semibold text-black">Our Location</h3>
              <p className="text-sm text-gray-600">
                {practiceAddress || '190 Circular Drive, Lorraine, Port Elizabeth'}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col items-center text-black">
          <h2 className="text-2xl font-semibold mb-6 text-center">Book An Appointment</h2>
          <form onSubmit={handleBooking} className="w-full max-w-md space-y-6">
            <select
              name="appointmentType"
              value={formData.appointmentType}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select Appointment Type</option>
              <option value="eye-exam">Full Examination</option>
              <option value="contact-lenses">Driver's Screening</option>
            </select>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleInputChange}
              placeholder="Contact Number"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleInputChange}
              placeholder="Additional Comments"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            ></textarea>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleDateChange}
              placeholder="Select Appointment Date"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />

            {formData.date && (
              <>
                <h2 className="mt-4 text-lg font-semibold">Select Available Time</h2>

                <div className="mt-2">
                  <label htmlFor="appointment-time" className="sr-only">Select Time</label>
                  <select
                    id="appointment-time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    disabled={isLoading}
                  >
                    <option value="">--Select Time--</option>
                    {isLoading ? (
                      <option value="">Loading available times...</option>
                    ) : error ? (
                      <option value="">{error}</option>
                    ) : availableSlots.length === 0 ? (
                      <option value="">No available times for this date</option>
                    ) : (
                      availableSlots.map((slot, index) => (
                        <option key={index} value={slot.time}>{slot.time}</option>
                      ))
                    )}
                  </select>
                </div>
              </>
            )}

            <div className="flex gap-4 flex-col lg:flex-row">
              <button
                type="submit"
                disabled={isLoading || !formData.date || !formData.time}
                className="w-full py-3 bg-primary text-white rounded-lg hover:bg-gray-500 transition"
              >
                {isLoading ? 'Booking...' : 'Book Appointment'}
              </button>
              <button
                type="submit"
                className="w-full py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
              >
                Request a Call
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookingPage;
