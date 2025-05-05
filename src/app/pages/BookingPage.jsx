"use client";

import React, { useState } from "react";
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
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <section id="booking" className="section cta pt-0 pb-0">
      <div className="book flex flex-col lg:flex-row" style={{ minHeight: "681px" }}>
        <div className="map lg:w-1/2">
          <iframe
            src="https://maps.google.com/maps?q=190+Circular+Drive,+Lorraine,+Port+Elizabeth&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
          ></iframe>
        </div>
        <div className="container lg:w-1/2 p-8">
          <h3 id="book_appointment" className="text-2xl mb-4">
            <span className="secondary-color">Book</span> Your Appointment
          </h3>
          <form className="form" id="booking_form" name="booking_form">
            <div className="mb-4">
              <select
                id="appt_type"
                name="appointmentType"
                value={formData.appointmentType}
                onChange={handleInputChange}
                className="form-control new_theme_select w-full p-2 border rounded"
              >
                <option disabled selected value="">
                  Select appointment type
                </option>
                <option value="consult">Full examination</option>
                <option value="drivers">Driver's screening</option>
              </select>
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-control w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-control w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="mobile"
                placeholder="Contact Number"
                value={formData.mobile}
                onChange={handleInputChange}
                className="form-control w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <textarea
                name="comments"
                placeholder="Additional Comments"
                value={formData.comments}
                onChange={handleInputChange}
                className="form-control w-full p-2 border rounded"
                rows="4"
              ></textarea>
            </div>
            <div className="mb-4">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="form-control w-full p-2 border rounded"
              />
            </div>
            <div className="text-right">
              <input
                id="booking_button"
                type="submit"
                className="btn btn--primary mr-2 p-2 bg-blue-500 text-white rounded"
                value="Book Appointment"
              />
              <input
                id="booking_call_me"
                type="button"
                className="btn btn--secondary p-2 bg-gray-500 text-white rounded"
                value="Request call"
              />
            </div>
          </form>
          <div className="box mt-8">
            <h5 className="secondary-color">Physical Address</h5>
            <ul className="list-unstyled">
              <li>{siteSettings.practice?.address_1}</li>
            </ul>
            <h5 className="secondary-color">Trading Hours</h5>
            <ul className="list-unstyled">
              <li>Week Days: 09:00 - 17:00</li>
              <li>Saturday: 09:00 - 13:00</li>
              <li>Sunday, Public Holidays: Closed</li>
            </ul>
            <h5 className="secondary-color">Contact Details</h5>
            <ul className="list-unstyled">
              <li>{siteSettings.practice?.email}</li>
              <li>{siteSettings.practice?.tel}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingPage;