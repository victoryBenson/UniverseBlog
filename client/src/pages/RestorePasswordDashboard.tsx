import { useState } from 'react'
import ForgotPassword from './ForgotPassword';
import VerifyOTP from './VerifyOTP';
import NewPassword from './NewPassword';


const RestorePasswordDashboard = () => {
    const [step, setStep] = useState<number>(1);
    const [email, setEmail] = useState<string>('');
    const [otp, setOtp] = useState<string>('');


    const handleNextStep = (currentStep: number) => {
        setStep(currentStep + 1);
    };

    const handlePreviousStep = (currentStep: number) => {
      setStep(currentStep - 1);
  };

  return (
    <div>
        <div className='fixed top-12 px-10 z-50'>
            <p className='lg:text-2xl text-lg text-darkGray lg:text-white font-light'>Step <span className=' rounded-full font-bold text-2xl lg:text-3xl'>{step}</span> of 3</p>
        </div>
        {step === 1 && <ForgotPassword onNext={()=> handleNextStep(1)} setEmail={setEmail}/>}
        {step === 2 && <VerifyOTP onNext={() => {setOtp(otp); handleNextStep(2)}} handlePreviousStep={() => handlePreviousStep(2)} email={email}/>}
        {step ===3 && <NewPassword email={email} otp={otp}/>}
    </div>
  )
}

export default RestorePasswordDashboard;