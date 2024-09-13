import React from 'react';

const ContactForm = () => {
  return (
    <div className="input-area">
      <form
        className="elementor-form"
        method="post"
        name="Contact Form"
      >
        <div className="elementor-form-fields-wrapper">
          <div className="elementor-field-group">
            <label
              htmlFor="form-field-name"
              className="elementor-field-label"
            >
              Name *
            </label>
            <input
              type="text"
              name="name"
              id="form-field-name"
              className="elementor-field elementor-field-textual"
              placeholder="Enter full name"
              required
            />
          </div>
          <div className="elementor-field-group">
            <label
              htmlFor="form-field-email"
              className="elementor-field-label"
            >
              Email *
            </label>
            <input
              type="email"
              name="email"
              id="form-field-email"
              className="elementor-field elementor-field-textual"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="elementor-field-group">
            <label
              htmlFor="form-field-message"
              className="elementor-field-label"
            >
              Message *
            </label>
            <textarea
              name="message"
              id="form-field-message"
              className="elementor-field elementor-field-textual"
              rows="4"
              placeholder="Type a message"
              required
            ></textarea>
          </div>
          <div className="elementor-field-group elementor-column elementor-field-type-submit">
            <button
              type="submit"
              className="elementor-button elementor-size-sm"
            >
              <span className="elementor-button-text">Submit</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
