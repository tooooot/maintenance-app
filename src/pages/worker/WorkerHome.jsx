import { Routes, Route } from 'react-router-dom'
import WorkerRegister from './WorkerRegister'

function WorkerHome() {
    return (
        <div className="worker-section">
            <Routes>
                <Route path="/home" element={<WorkerDashboard />} />
                <Route path="/register" element={<WorkerRegister />} />
                <Route path="/orders" element={<WorkerOrders />} />
                <Route path="/earnings" element={<Earnings />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </div>
    )
}

function WorkerDashboard() {
    return (
        <div style={{ padding: '20px' }}>
            <h1>لوحة تحكم العامل</h1>
            <p>مرحباً بك!</p>
            <div style={{ marginTop: '20px' }}>
                <button style={{
                    padding: '15px 30px',
                    background: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    cursor: 'pointer'
                }}>
                    أنا متاح الآن
                </button>
            </div>
        </div>
    )
}

function WorkerOrders() {
    return (
        <div style={{ padding: '20px' }}>
            <h1>الطلبات</h1>
            <p>قريباً...</p>
        </div>
    )
}

function Earnings() {
    return (
        <div style={{ padding: '20px' }}>
            <h1>الأرباح</h1>
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

export default WorkerHome
