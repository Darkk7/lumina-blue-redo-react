"use client"

import { useState } from 'react';

const BookingPage = () => {
  const [address] = useState('190 Circular Drive, Lorraine');
  
  return (
    <section id="booking" className="w-full py-16 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 px-4">
        <div className="w-full lg:w-1/2">
          <div className="relative">
            <iframe
              src="https://maps.google.com/maps?q=190+Circular+Drive,+Lorraine,+Port+Elizabeth&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
            ></iframe>
            <div className="absolute bottom-4 left-4 bg-white p-4 shadow-lg rounded-lg">
              <h3 className="text-lg font-semibold text-black">Our Location</h3>
              <p className="text-sm text-gray-600">{address}</p>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col items-center text-black">
          <h2 className="text-2xl font-semibold mb-6 text-center">Book An Appointment</h2>
          <form className="w-full max-w-md space-y-6">
            <select
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select Appointment Type</option>
              <option value="eye-exam">Full Examination</option>
              <option value="contact-lenses">Driver's Screening</option>
            </select>
            <input
              type="text"
              placeholder="Name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="tel"
              placeholder="Contact Number"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <textarea
              placeholder="Additional Comments"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            ></textarea>
            <input
              type="date"
              placeholder="Select Appointment Date"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <h2 className="mt-4 text-lg font-semibold">Select Available Time</h2>

            <div className="mt-2">
              <label htmlFor="appointment-time" className="sr-only">Select Time</label>
              <select
                id="appointment-time"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">--Select Time--</option>
                <option value="09:00 AM">09:00</option>
                <option value="09:30 AM">09:30</option>
                <option value="10:00 AM">10:00</option>
                <option value="10:30 AM">10:30</option>
                <option value="11:00 AM">11:00</option>
                <option value="11:30 AM">11:30</option>
                <option value="12:00 PM">12:00</option>
                <option value="12:30 PM">12:30</option>
                <option value="01:00 PM">13:00</option>
                <option value="01:30 PM">13:30</option>
                <option value="02:00 PM">14:00</option>
                <option value="02:30 PM">14:30</option>
                <option value="03:00 PM">15:00</option>
                <option value="03:30 PM">15:30</option>
                <option value="04:00 PM">16:00</option>
                <option value="04:30 PM">16:30</option>                  
              </select>
            </div>

            <div className="flex gap-4 flex-col lg:flex-row">
              <button
                type="submit"
                className="w-full py-3 bg-primary text-white rounded-lg hover:bg-gray-600 transition"
              >
                Book Appointment
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
