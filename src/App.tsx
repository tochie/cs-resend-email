import React, { useState } from "react";

const ResendEmailForm = () => {
  const [email, setEmail] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [eventType, setEventType] = useState("");

  const [submitButtonIsDisabled, setSubmitButtonIsDisabled] = useState(true);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Make an async call to the API endpoint or service here
    // ...

    // If the call is successful, reset the form
    setEmail("");
    setOrderNumber("");
    setEventType("");
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "orderNumber") {
      setOrderNumber(value);
    } else if (name === "eventType") {
      setEventType(value);
    }

    // Check if all form fields are completed with no issues
    const isAllFieldsCompleted = email && orderNumber && eventType;

    // Enable or disable the submit button based on the validation result
    setSubmitButtonIsDisabled(!isAllFieldsCompleted);
  };

  return (
    <div className="App">
      <div className="contentArea">
        <form onSubmit={handleSubmit} className="form">
          <h1>Email Resend Form</h1>
          <p>
            This form is used by a Customer Service Agent to resend an email to
            a customer
          </p>

          <input
            className="input"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleInputChange}
          />

          <input
            className="input"
            type="number"
            name="orderNumber"
            placeholder="Order Number"
            value={orderNumber}
            onChange={handleInputChange}
          />

          <select
            name="eventType"
            value={eventType}
            onChange={handleInputChange}
            className="eventType"
          >
            <option value="">Select event type</option>
            <option value="orderConfirmation">Order confirmation</option>
            <option value="shippingNotification">Shipping notification</option>
            <option value="returnConfirmation">Return confirmation</option>
          </select>

          <button
            type="submit"
            disabled={submitButtonIsDisabled}
            className="resend"
          >
            Resend
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResendEmailForm;
