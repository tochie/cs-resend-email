import React, { useState, useEffect } from "react";
// import fetch from "fetch";

const resendSrvc =
  "https://service-lb-ebe7c81d6c09a70d.elb.us-east-1.amazonaws.com/api/email/resend";

const ResendEmailForm = () => {
  const [email, setEmail] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [candidateType, setCandidateType] = useState("");
  const [cancellationType, setCancellationType] = useState("");
  const [cancellationTypeDisabled, setCancellationTypeDisabled] = useState(
    true
  );

  const [submitButtonIsDisabled, setSubmitButtonIsDisabled] = useState(true);

  useEffect(() => {
    // Check if all form fields are completed with no issues
    if (email && orderNumber && candidateType) {
      if (cancellationTypeDisabled) {
        // CancellationType is disabled here
        if (candidateType !== "order_cancellation") {
          setSubmitButtonIsDisabled(false);
          setCancellationTypeDisabled(true);
        } else {
          setCancellationTypeDisabled(false);
          if (cancellationType) {
            setSubmitButtonIsDisabled(false);
          } else {
            setSubmitButtonIsDisabled(true);
          }
        }
      } else {
        // CancellationType is enabled here
        if (candidateType !== "order_cancellation") {
          setCancellationTypeDisabled(true);
        } else {
          if (cancellationType) {
            setSubmitButtonIsDisabled(false);
          } else {
            setSubmitButtonIsDisabled(true);
          }
        }
      }
    } else {
      setSubmitButtonIsDisabled(true);
      setCancellationTypeDisabled(true);
    }
  }, [email, orderNumber, candidateType, cancellationType]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      // Validate email format using regular expression
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i;
      if (!emailRegex.test(email)) {
        alert("Invalid email format. Please enter a valid email address.");
        setEmail("");
        return; // Abort form submission if email is invalid
      }

      // Make an async call to the API endpoint or service here
      const response = await fetch(resendSrvc, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "<value>"
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
        setCancellationTypeDisabled(true);
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
        <form className="form">
          <h1>Email Resend Form</h1>
          <p class="description">
            This form should only be used by a CSR to resend an email to a
            customer
          </p>
          <p class="p-instruction">Instructions on how to use this form</p>
          <div class="wrapper">
            <ul class="instructions">
              <li>
                Use Engage+ to confirm email was not sent to customer before
                resending
              </li>
              <li>Enter customer's email address</li>
              <li>Enter the order number</li>
              <li>Select the message type</li>
              <li>
                If the Order Cancel is selected, please select the cancellation
                type
              </li>
              <li>Click button to resend</li>
            </ul>
            <div class="input-box">
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
                {/* BOPIS */}
                <option value="bopis_ready_for_pickup">
                  BOPIS ready for pickup
                </option>
                <option value="bopis_picked_up_in_store">
                  BOPIS picked up
                </option>
                <option value="bopis_pickup_in_store_window_expired">
                  BOPIS pickup - window expired
                </option>
                <option value="bopis_pickup_reminder_last">
                  BOPIS pickup - last reminder
                </option>
                {/* Non-BOPIS orders */}
                <option value="order_acknowledgement">
                  Order acknowledgement
                </option>
                <option value="order_returned">Order returned</option>
                <option value="order_cancellation">Order canceled</option>
              </select>

              <select
                name="cancellationType"
                value={cancellationType}
                onChange={handleInputChange}
                className="candidateType"
                hidden={cancellationTypeDisabled}
              >
                <option value="">Select cancellation type</option>
                <option value="generic_cancel">Generic cancel</option>
                <option value="no_inventory_cancel">No inventory cancel</option>
                <option value="credit_cancel">Credit cancel</option>
                <option value="customer_cancel">Customer cancel</option>
                <option value="credit_hold">Credit hold</option>
                <option value="fraud_cancel">Fraud cancel</option>
                <option value="gift_card_refund">Gift card refund</option>
              </select>

              <button
                onClick={handleSubmit}
                className={`resend-disabled-${submitButtonIsDisabled}`}
                disabled={submitButtonIsDisabled}
              >
                Resend
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResendEmailForm;
