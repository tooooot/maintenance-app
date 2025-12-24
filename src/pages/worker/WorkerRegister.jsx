import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { professions, getServicesByProfession, priceTiers } from '../../data/services'
import './WorkerRegister.css'

function WorkerRegister() {
    const navigate = useNavigate()
    const [step, setStep] = useState(1) // 1-4 steps

    // Form data
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [photo, setPhoto] = useState(null)
    const [selectedProfessions, setSelectedProfessions] = useState([])
    const [experience, setExperience] = useState('')
    const [workArea, setWorkArea] = useState(null)
    const [servicePricing, setServicePricing] = useState({}) // {serviceId: 'economy'|'standard'|'premium'}
    const [disclaimerAccepted, setDisclaimerAccepted] = useState(false)
    const [commitmentAccepted, setCommitmentAccepted] = useState(false)

    const handleProfessionToggle = (professionId) => {
        if (selectedProfessions.includes(professionId)) {
            setSelectedProfessions(selectedProfessions.filter(p => p !== professionId))
            // Remove pricing for this profession's services
            const services = getServicesByProfession(professionId)
            const newPricing = { ...servicePricing }
            services.forEach(s => delete newPricing[s.id])
            setServicePricing(newPricing)
        } else {
            setSelectedProfessions([...selectedProfessions, professionId])
        }
    }

    const handleServicePricing = (serviceId, tier) => {
        setServicePricing({
            ...servicePricing,
            [serviceId]: tier
        })
    }

    const allServicesHavePrices = () => {
        const allServices = selectedProfessions.flatMap(p => getServicesByProfession(p))
        return allServices.every(s => servicePricing[s.id])
    }

    const handleSubmit = () => {
        // TODO: Submit to backend
        console.log({
            name,
            phone,
            photo,
            professions: selectedProfessions,
            experience,
            workArea,
            servicePricing
        })

        alert('تم إرسال طلب التسجيل! سيتم مراجعته خلال ساعات.')
        navigate('/worker/home')
    }

    return (
        <div className="worker-register-page">
            <div className="progress-bar">
                <div className="progress" style={{ width: `${(step / 4) * 100}%` }}></div>
            </div>

            <div className="register-container">
                {/* Step 1: Basic Info */}
                {step === 1 && (
                    <div className="step">
                        <h2>المعلومات الأساسية</h2>

                        <div className="disclaimer-box">
                            <h3>⚠️ إخلاء المسؤولية</h3>
                            <p>
                                هذه المنصة وسيط فقط لربط العملاء بالعمال.
                                المنصة غير مسؤولة عن جودة العمل أو أي أضرار.
                                التعامل بين الطرفين على مسؤوليتهم الخاصة.
                            </p>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={disclaimerAccepted}
                                    onChange={(e) => setDisclaimerAccepted(e.target.checked)}
                                    required
                                />
                                أوافق وأتحمل المسؤولية
                            </label>
                        </div>

                        <div className="form-group">
                            <label>الاسم الأول *</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="اسمك أو اسم مستعار"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>رقم الجوال *</label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="05xxxxxxxx"
                                required
                                dir="ltr"
                            />
                        </div>

                        <div className="form-group">
                            <label>الصورة الشخصية (اختياري)</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setPhoto(e.target.files[0])}
                            />
                        </div>

                        <div className="form-group">
                            <label>سنوات الخبرة (تقديري) *</label>
                            <select
                                value={experience}
                                onChange={(e) => {
                                    console.log('Experience selected:', e.target.value)
                                    setExperience(e.target.value)
                                }}
                                required
                            >
                                <option value="">اختر...</option>
                                <option value="0-1">أقل من سنة</option>
                                <option value="1-3">1-3 سنوات</option>
                                <option value="3-5">3-5 سنوات</option>
                                <option value="5-10">5-10 سنوات</option>
                                <option value="10+">أكثر من 10 سنوات</option>
                            </select>
                        </div>

                        <button
                            className="next-btn"
                            onClick={() => {
                                console.log('Step 1 validation:', { name, phone, experience, disclaimerAccepted })
                                if (name && phone && experience && disclaimerAccepted) {
                                    setStep(2)
                                } else {
                                    alert('يرجى ملء جميع الحقول المطلوبة')
                                }
                            }}
                            disabled={!name || !phone || !experience || !disclaimerAccepted}
                        >
                            التالي
                        </button>
                    </div>
                )}

                {/* Step 2: Select Professions */}
                {step === 2 && (
                    <div className="step">
                        <button className="back-btn" onClick={() => setStep(1)}>← رجوع</button>
                        <h2>اختر تخصصك (يمكن اختيار أكثر من واحد)</h2>

                        <div className="professions-grid">
                            {professions.map(profession => (
                                <div
                                    key={profession.id}
                                    className={`profession-card ${selectedProfessions.includes(profession.id) ? 'selected' : ''}`}
                                    style={{ borderColor: profession.color }}
                                    onClick={() => handleProfessionToggle(profession.id)}
                                >
                                    <span className="icon">{profession.icon}</span>
                                    <h3>{profession.nameAr}</h3>
                                    {selectedProfessions.includes(profession.id) && (
                                        <span className="check-mark">✓</span>
                                    )}
                                </div>
                            ))}
                        </div>

                        <button
                            className="next-btn"
                            onClick={() => setStep(3)}
                            disabled={selectedProfessions.length === 0}
                        >
                            التالي
                        </button>
                    </div>
                )}

                {/* Step 3: Set Prices for Each Service */}
                {step === 3 && (
                    <div className="step">
                        <button className="back-btn" onClick={() => setStep(2)}>← رجوع</button>
                        <h2>حدد أسعارك لكل خدمة</h2>

                        <div className="pricing-info">
                            <p>💡 <strong>نصيحة:</strong> العمال الجدد يختارون $ لجذب الطلبات، والمحترفون يختارون $$$ للأرباح الأعلى</p>
                        </div>

                        {selectedProfessions.map(professionId => {
                            const profession = professions.find(p => p.id === professionId)
                            const services = getServicesByProfession(professionId)

                            return (
                                <div key={professionId} className="profession-pricing">
                                    <h3 style={{ color: profession.color }}>
                                        {profession.icon} {profession.nameAr}
                                    </h3>

                                    <div className="services-pricing-list">
                                        {services.map(service => (
                                            <div key={service.id} className="service-pricing-item">
                                                <div className="service-name">{service.nameAr}</div>
                                                <div className="price-options">
                                                    {Object.entries(priceTiers).map(([key, tier]) => (
                                                        <button
                                                            key={key}
                                                            className={`price-option ${servicePricing[service.id] === key ? 'selected' : ''}`}
                                                            onClick={() => handleServicePricing(service.id, key)}
                                                        >
                                                            <span className="tier-icon">{tier.icon}</span>
                                                            <span className="tier-price">{service.prices[key]} ر.س</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}

                        <button
                            className="next-btn"
                            onClick={() => setStep(4)}
                            disabled={!allServicesHavePrices()}
                        >
                            التالي
                        </button>
                    </div>
                )}

                {/* Step 4: Commitment & Submit */}
                {step === 4 && (
                    <div className="step">
                        <button className="back-btn" onClick={() => setStep(3)}>← رجوع</button>
                        <h2>إقرار الالتزام</h2>

                        <div className="commitment-box">
                            <h3>⚠️ إقرار مهم</h3>
                            <p>أنا أقر بأنني:</p>
                            <ul>
                                <li>✅ اخترت أسعاري لكل خدمة بحرية</li>
                                <li>✅ ملتزم بهذه الأسعار عند قبول الطلبات</li>
                                <li>✅ لن أطلب من العميل سعراً أعلى من المتفق عليه</li>
                                <li>✅ يمكنني تعديل أسعاري لاحقاً من الإعدادات</li>
                            </ul>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={commitmentAccepted}
                                    onChange={(e) => setCommitmentAccepted(e.target.checked)}
                                    required
                                />
                                أوافق على هذه الشروط
                            </label>
                        </div>

                        <div className="summary-box">
                            <h3>ملخص التسجيل</h3>
                            <div className="summary-item">
                                <strong>الاسم:</strong> {name}
                            </div>
                            <div className="summary-item">
                                <strong>الجوال:</strong> {phone}
                            </div>
                            <div className="summary-item">
                                <strong>الخبرة:</strong> {experience}
                            </div>
                            <div className="summary-item">
                                <strong>التخصصات:</strong> {selectedProfessions.length}
                            </div>
                            <div className="summary-item">
                                <strong>الخدمات:</strong> {Object.keys(servicePricing).length}
                            </div>
                        </div>

                        <button className="submit-btn" onClick={handleSubmit}>
                            إرسال الطلب
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default WorkerRegister
