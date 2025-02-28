// import React, {useState} from "react";
// import axios from "axios";

// const SendOTP = ({setStep, setEmail}) =>{
//     const [email, setLocalEmail] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState("");


//     const handleSendOTP = async () =>{
//         if(!email){
//             setMessage("Введите email!");
//             return;
//         }

//         try{
//             setLoading(true);
//             const response = await axios.post("http://localhost:5000/api/send-otp", {email});
//             setMessage(response.data.message);
//             setEmail(email); // Передаем email в родительский компонент
//             setStep(2); // Переход на ввод OTP
//         }catch (error){
//             setMessage(error.response?.data?.message || "Ошибка отправки OTP");
//         }finally{
//             setLoading(false);
//         }
//     };

//     return (
//         <div>
//         <h2>Введите ваш email</h2>
//         <input
//             type="email"
//             value={localEmail}
//             onChange={(e) => setLocalEmail(e.target.value)}
//             placeholder="Ваш email"
//         />
//         <button onClick={handleSendOTP} disabled={loading}>
//             {loading ? "Отправка..." : "Получить OTP"}
//         </button>
//         {message && <p>{message}</p>}
//     </div>
//     );
// }

// export default SendOTP;

import React, { useState } from "react";
import axios from "axios";

const SendOTP = ({ setStep, setEmail }) => {
    const [email, setEmailLocal] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSendOTP = async () => {
        if (!email) {
            setMessage("Введите email!");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post("http://localhost:5000/api/send-otp", { email });
            setMessage(response.data.message);
            setEmail(email); // Передаем email в родительский компонент
            setStep(2); // Переход на ввод OTP
        } catch (error) {
            setMessage(error.response?.data?.message || "Ошибка отправки OTP");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Введите ваш email</h2>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmailLocal(e.target.value)}
                placeholder="Ваш email"
            />
            <button onClick={handleSendOTP} disabled={loading}>
                {loading ? "Отправка..." : "Получить OTP"}
            </button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default SendOTP;




