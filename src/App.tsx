import React, { useState, useEffect } from "react";
// import fetch from "fetch";

const resendSrvc =
  "https://service-lb-ebe7c81d6c09a70d.elb.us-east-1.amazonaws.com/email/resend";
const ResendEmailForm = () => {
  const [email, setEmail] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [candidateType, setCandidateType] = useState("");
  const [cancellationType, setCancellationType] = useState("");

  const [submitButtonIsDisabled, setSubmitButtonIsDisabled] = useState(true);

  useEffect(() => {
    // Check if all form fields are completed with no issues
    const isAllFieldsCompleted = !!(email && orderNumber && candidateType);

    // Enable or disable the submit button based on the validation result
    setSubmitButtonIsDisabled(!isAllFieldsCompleted);
  }, [email, orderNumber, candidateType]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      // Make an async call to the API endpoint or service here
      const response = await fetch(resendSrvc, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          orderNumber,
          candidateType,
          cancellationType
        })
      });

      console.log("response is: ", response);

      if (response.ok) {
        // If the call is successful, reset the form
        setEmail("");
        setOrderNumber("");
        setCandidateType("");
        setCancellationType("");
        setSubmitButtonIsDisabled(true); // Disable the submit button after successful submission
        alert("Email resent successfully!");
      } else {
        alert("Failed to resend email. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    console.log("input onChange: ", value);
    if (name === "email") {
      setEmail(value);
    } else if (name === "orderNumber") {
      setOrderNumber(value);
    } else if (name === "candidateType") {
      setCandidateType(value);
    } else if (name === "cancellationType") {
      setCancellationType(value);
    }
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
            onInput={handleInputChange}
          />

          <input
            className="input"
            type="number"
            name="orderNumber"
            placeholder="Order Number"
            value={orderNumber}
            onInput={handleInputChange}
          />

          <select
            name="candidateType"
            value={candidateType}
            onChange={handleInputChange}
            className="candidateType"
          >
            <option value="">Select event type</option>
            <option value="bopis_ready_for_pickup">
              BOPIS ready for pickup
            </option>
          </select>

          <select
            name="cancellationType"
            value={cancellationType}
            onChange={handleInputChange}
            className="candidateType"
          >
            <option value="">Select event type</option>
            <option value="orderConfirmation">Order confirmation</option>
          </select>

          <button
            type="submit"
            disabled={submitButtonIsDisabled}
            className={`resend-disabled-${submitButtonIsDisabled}`}
          >
            Resend
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResendEmailForm;
