import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
    return (
        <div className="home-page">
            <div className="hero">
                <h1>منصة الصيانة</h1>
                <p>اطلب خدمة صيانة بضغطة زر</p>

                <div className="cta-buttons">
                    <Link to="/customer/new-request" className="btn btn-primary">
                        طلب خدمة صيانة
                    </Link>
                    <Link to="/worker/register" className="btn btn-secondary">
                        التسجيل كعامل
                    </Link>
                </div>
            </div>

            <div className="features">
                <div className="feature-card">
                    <span className="icon">💰</span>
                    <h3>أسعار واضحة</h3>
                    <p>3 مستويات سعر لكل خدمة</p>
                </div>
                <div className="feature-card">
                    <span className="icon">📹</span>
                    <h3>رفع فيديو</h3>
                    <p>صور المشكلة بالفيديو</p>
                </div>
                <div className="feature-card">
                    <span className="icon">🔔</span>
                    <h3>إشعارات فورية</h3>
                    <p>تابع طلبك لحظة بلحظة</p>
                </div>
                <div className="feature-card">
                    <span className="icon">⭐</span>
                    <h3>تقييمات شفافة</h3>
                    <p>اختر العامل المناسب</p>
                </div>
            </div>

            <div className="disclaimer">
                <h3>⚠️ إخلاء المسؤولية</h3>
                <p>
                    هذه المنصة وسيط فقط لربط العملاء بالعمال.
                    المنصة غير مسؤولة عن جودة العمل أو أي أضرار.
                    التعامل بين الطرفين على مسؤوليتهم الخاصة.
                </p>
            </div>
        </div>
    )
}

export default Home
