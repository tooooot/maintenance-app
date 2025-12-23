import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { professions, getServicesByProfession, priceTiers } from '../../data/services'
import MapPicker from '../../components/MapPicker'
import './NewRequest.css'

function NewRequest() {
    const navigate = useNavigate()
    const [step, setStep] = useState(1) // 1-7 steps

    // Form data
    const [selectedProfession, setSelectedProfession] = useState(null)
    const [selectedService, setSelectedService] = useState(null)
    const [selectedPriceTier, setSelectedPriceTier] = useState(null)
    const [description, setDescription] = useState('')
    const [images, setImages] = useState([])
    const [video, setVideo] = useState(null)
    const [location, setLocation] = useState(null)
    const [timing, setTiming] = useState('now') // now or scheduled

    const handleProfessionSelect = (profession) => {
        setSelectedProfession(profession)
        setSelectedService(null)
        setSelectedPriceTier(null)
        setStep(2)
    }

    const handleServiceSelect = (service) => {
        setSelectedService(service)
        setStep(3)
    }

    const handlePriceTierSelect = (tier) => {
        setSelectedPriceTier(tier)
        setStep(4)
    }

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files)
        if (images.length + files.length <= 5) {
            setImages([...images, ...files])
        } else {
            alert('يمكنك رفع 5 صور كحد أقصى')
        }
    }

    const handleVideoUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            // Check video duration (max 60 seconds)
            const videoElement = document.createElement('video')
            videoElement.preload = 'metadata'
            videoElement.onloadedmetadata = function () {
                window.URL.revokeObjectURL(videoElement.src)
                if (videoElement.duration > 60) {
                    alert('مدة الفيديو يجب ألا تتجاوز 60 ثانية')
                } else {
                    setVideo(file)
                }
            }
            videoElement.src = URL.createObjectURL(file)
        }
    }

    const handleSubmit = () => {
        // TODO: Submit to backend
        console.log({
            profession: selectedProfession,
            service: selectedService,
            priceTier: selectedPriceTier,
            description,
            images,
            video,
            location,
            timing
        })

        alert('تم إرسال الطلب بنجاح!')
        navigate('/customer/home')
    }

    return (
        <div className="new-request-page">
            <div className="progress-bar">
                <div className="progress" style={{ width: `${(step / 7) * 100}%` }}></div>
            </div>

            <div className="request-container">
                {/* Step 1: Select Profession */}
                {step === 1 && (
                    <div className="step">
                        <h2>اختر المهنة</h2>
                        <div className="professions-grid">
                            {professions.map(profession => (
                                <div
                                    key={profession.id}
                                    className="profession-card"
                                    style={{ borderColor: profession.color }}
                                    onClick={() => handleProfessionSelect(profession)}
                                >
                                    <span className="icon">{profession.icon}</span>
                                    <h3>{profession.nameAr}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 2: Select Service */}
                {step === 2 && selectedProfession && (
                    <div className="step">
                        <button className="back-btn" onClick={() => setStep(1)}>← رجوع</button>
                        <h2>اختر الخدمة - {selectedProfession.nameAr}</h2>
                        <div className="services-list">
                            {getServicesByProfession(selectedProfession.id).map(service => (
                                <div
                                    key={service.id}
                                    className="service-card"
                                    onClick={() => handleServiceSelect(service)}
                                >
                                    <h3>{service.nameAr}</h3>
                                    <div className="prices">
                                        <span className="price">💰 {service.prices.economy} ريال</span>
                                        <span className="price">💰💰 {service.prices.standard} ريال</span>
                                        <span className="price">💰💰💰 {service.prices.premium} ريال</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 3: Select Price Tier */}
                {step === 3 && selectedService && (
                    <div className="step">
                        <button className="back-btn" onClick={() => setStep(2)}>← رجوع</button>
                        <h2>اختر مستوى السعر</h2>
                        <p className="service-name">{selectedService.nameAr}</p>

                        <div className="price-tiers">
                            {Object.entries(priceTiers).map(([key, tier]) => (
                                <div
                                    key={key}
                                    className={`price-tier-card ${selectedPriceTier === key ? 'selected' : ''}`}
                                    onClick={() => handlePriceTierSelect(key)}
                                >
                                    <span className="tier-icon">{tier.icon}</span>
                                    <h3>{tier.nameAr}</h3>
                                    <p className="tier-desc">{tier.description}</p>
                                    <div className="tier-price">{selectedService.prices[key]} ريال</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 4: Description & Media */}
                {step === 4 && (
                    <div className="step">
                        <button className="back-btn" onClick={() => setStep(3)}>← رجوع</button>
                        <h2>وصف المشكلة</h2>

                        <textarea
                            placeholder="اكتب وصف تفصيلي للمشكلة (اختياري)"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="4"
                        />

                        <div className="media-upload">
                            <div className="upload-section">
                                <label className="upload-btn">
                                    📷 رفع صور (حتى 5 صور)
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageUpload}
                                        style={{ display: 'none' }}
                                    />
                                </label>
                                {images.length > 0 && (
                                    <div className="uploaded-files">
                                        {images.map((img, i) => (
                                            <div key={i} className="file-preview">
                                                <img src={URL.createObjectURL(img)} alt="" />
                                                <button onClick={() => setImages(images.filter((_, idx) => idx !== i))}>×</button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="upload-section">
                                <label className="upload-btn">
                                    📹 رفع فيديو (حتى 60 ثانية)
                                    <input
                                        type="file"
                                        accept="video/*"
                                        onChange={handleVideoUpload}
                                        style={{ display: 'none' }}
                                    />
                                </label>
                                {video && (
                                    <div className="uploaded-files">
                                        <div className="file-preview">
                                            <video src={URL.createObjectURL(video)} controls />
                                            <button onClick={() => setVideo(null)}>×</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <button className="next-btn" onClick={() => setStep(5)}>
                            التالي
                        </button>
                    </div>
                )}

                {/* Step 5: Location */}
                {step === 5 && (
                    <div className="step">
                        <button className="back-btn" onClick={() => setStep(4)}>← رجوع</button>
                        <h2>تحديد الموقع</h2>

                        <MapPicker
                            onLocationSelect={(loc) => setLocation(loc)}
                            initialLocation={location}
                        />

                        <button
                            className="next-btn"
                            onClick={() => setStep(6)}
                            disabled={!location}
                        >
                            التالي
                        </button>
                    </div>
                )}

                {/* Step 6: Timing */}
                {step === 6 && (
                    <div className="step">
                        <button className="back-btn" onClick={() => setStep(5)}>← رجوع</button>
                        <h2>اختر التوقيت</h2>

                        <div className="timing-options">
                            <div
                                className={`timing-card ${timing === 'now' ? 'selected' : ''}`}
                                onClick={() => setTiming('now')}
                            >
                                <h3>الآن</h3>
                                <p>طلب فوري</p>
                            </div>
                            <div
                                className={`timing-card ${timing === 'scheduled' ? 'selected' : ''}`}
                                onClick={() => setTiming('scheduled')}
                            >
                                <h3>جدولة</h3>
                                <p>حدد وقت لاحق</p>
                            </div>
                        </div>

                        <button className="next-btn" onClick={() => setStep(7)}>
                            التالي
                        </button>
                    </div>
                )}

                {/* Step 7: Review & Submit */}
                {step === 7 && (
                    <div className="step">
                        <button className="back-btn" onClick={() => setStep(6)}>← رجوع</button>
                        <h2>مراجعة الطلب</h2>

                        <div className="review-section">
                            <div className="review-item">
                                <strong>المهنة:</strong> {selectedProfession?.nameAr}
                            </div>
                            <div className="review-item">
                                <strong>الخدمة:</strong> {selectedService?.nameAr}
                            </div>
                            <div className="review-item">
                                <strong>المستوى:</strong> {priceTiers[selectedPriceTier]?.nameAr}
                            </div>
                            <div className="review-item">
                                <strong>السعر:</strong> {selectedService?.prices[selectedPriceTier]} ريال
                            </div>
                            <div className="review-item">
                                <strong>الصور:</strong> {images.length} صورة
                            </div>
                            <div className="review-item">
                                <strong>الفيديو:</strong> {video ? 'نعم' : 'لا'}
                            </div>
                            <div className="review-item">
                                <strong>الموقع:</strong> {location?.address}
                            </div>
                            <div className="review-item">
                                <strong>التوقيت:</strong> {timing === 'now' ? 'الآن' : 'مجدول'}
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

export default NewRequest
