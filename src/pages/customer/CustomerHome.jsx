import { Routes, Route } from 'react-router-dom'
import NewRequest from './NewRequest'

function CustomerHome() {
    return (
        <div className="customer-section">
            <Routes>
                <Route path="/home" element={<CustomerDashboard />} />
                <Route path="/new-request" element={<NewRequest />} />
                <Route path="/orders" element={<MyOrders />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </div>
    )
}

function CustomerDashboard() {
    return (
        <div style={{ padding: '20px' }}>
            <h1>مرحباً بك!</h1>
            <p>لوحة تحكم العميل</p>
            <div style={{ marginTop: '20px' }}>
                <a href="/customer/new-request" style={{
                    display: 'inline-block',
                    padding: '15px 30px',
                    background: '#4CAF50',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '10px'
                }}>
                    طلب خدمة جديدة
                </a>
            </div>
        </div>
    )
}

function MyOrders() {
    return (
        <div style={{ padding: '20px' }}>
            <h1>طلباتي</h1>
            <p>قريباً...</p>
        </div>
    )
}

function Profile() {
    return (
        <div style={{ padding: '20px' }}>
            <h1>الملف الشخصي</h1>
            <p>قريباً...</p>
        </div>
    )
}

export default CustomerHome
