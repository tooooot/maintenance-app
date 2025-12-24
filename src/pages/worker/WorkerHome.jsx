import { Routes, Route } from 'react-router-dom'
import WorkerRegister from './WorkerRegister'
import WorkerDashboard from './WorkerDashboard'

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
