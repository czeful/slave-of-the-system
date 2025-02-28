import React, { useState } from "react";
import SendOTP from "./SendOTP";
import VerifyOTP from "./VerifyOTP";

const OTPForm = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  return (
    <div>
      {step === 1 && <SendOTP setStep={setStep} setEmail={setEmail} />}
      {step === 2 && <VerifyOTP email={email} setStep={setStep} />}
      {step === 3 && <h2>✅ OTP успешно подтвержден!</h2>}
    </div>
  );
};

export default OTPForm;
