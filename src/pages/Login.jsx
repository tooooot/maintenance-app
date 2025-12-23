import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

function Login() {
    const [userType, setUserType] = useState('customer') // customer or worker
    const [phone, setPhone] = useState('')
    const [code, setCode] = useState('')
    const [step, setStep] = useState(1) // 1: phone, 2: code
    const navigate = useNavigate()

    const handleSendCode = (e) => {
        e.preventDefault()
        // TODO: إرسال كود التحقق عبر SMS
        console.log('Sending code to:', phone)
        setStep(2)
    }

    const handleVerifyCode = (e) => {
        e.preventDefault()
        // TODO: التحقق من الكود
        console.log('Verifying code:', code)

        // التوجيه حسب نوع المستخدم
        if (userType === 'customer') {
            navigate('/customer/home')
        } else {
            navigate('/worker/home')
        }
    }

    return (
        <div className="login-page">
            <div className="login-container">
                <h1>تسجيل الدخول</h1>

                <div className="user-type-selector">
                    <button
                        className={userType === 'customer' ? 'active' : ''}
                        onClick={() => setUserType('customer')}
                    >
                        عميل
                    </button>
                    <button
                        className={userType === 'worker' ? 'active' : ''}
                        onClick={() => setUserType('worker')}
                    >
                        عامل
                    </button>
                </div>

                {step === 1 ? (
                    <form onSubmit={handleSendCode}>
                        <div className="form-group">
                            <label>رقم الجوال</label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="05xxxxxxxx"
                                required
                                dir="ltr"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            إرسال كود التحقق
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyCode}>
                        <div className="form-group">
                            <label>كود التحقق</label>
                            <input
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder="xxxx"
                                required
                                maxLength="4"
                                dir="ltr"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            تحقق
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setStep(1)}
                        >
                            رجوع
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}

export default Login
