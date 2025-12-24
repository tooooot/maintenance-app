import { useState, useEffect } from 'react'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase'
import './AdminDashboard.css'

function AdminDashboard() {
    const [orders, setOrders] = useState([])
    const [workers, setWorkers] = useState([])
    const [stats, setStats] = useState({
        totalOrders: 0,
        pendingOrders: 0,
        activeOrders: 0,
        completedOrders: 0,
        totalWorkers: 0
    })

    useEffect(() => {
        // Listen to orders in real-time
        const ordersQuery = query(collection(db, 'orders'), orderBy('createdAt', 'desc'))
        const unsubscribeOrders = onSnapshot(ordersQuery, (snapshot) => {
            const ordersData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setOrders(ordersData)

            // Calculate stats
            setStats({
                totalOrders: ordersData.length,
                pendingOrders: ordersData.filter(o => o.status === 'pending').length,
                activeOrders: ordersData.filter(o => o.status === 'accepted' || o.status === 'in_progress').length,
                completedOrders: ordersData.filter(o => o.status === 'completed').length,
                totalWorkers: 0 // Will update when we add workers listener
            })
        })

        // Listen to workers in real-time
        const workersQuery = query(collection(db, 'workers'))
        const unsubscribeWorkers = onSnapshot(workersQuery, (snapshot) => {
            const workersData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setWorkers(workersData)
            setStats(prev => ({ ...prev, totalWorkers: workersData.length }))
        })

        return () => {
            unsubscribeOrders()
            unsubscribeWorkers()
        }
    }, [])

    const getStatusColor = (status) => {
        const colors = {
            pending: '#f59e0b',
            accepted: '#3b82f6',
            in_progress: '#8b5cf6',
            completed: '#10b981',
            cancelled: '#ef4444'
        }
        return colors[status] || '#6b7280'
    }

    const getStatusText = (status) => {
        const texts = {
            pending: 'قيد الانتظار',
            accepted: 'مقبول',
            in_progress: 'جاري التنفيذ',
            completed: 'مكتمل',
            cancelled: 'ملغي'
        }
        return texts[status] || status
    }

    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                <h1>🎯 لوحة تحكم المدير - كَشّاف</h1>
                <p>مراقبة الطلبات والعمال في الوقت الفعلي</p>
            </header>

            {/* Stats Cards */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon">📋</div>
                    <div className="stat-content">
                        <h3>{stats.totalOrders}</h3>
                        <p>إجمالي الطلبات</p>
                    </div>
                </div>
                <div className="stat-card pending">
                    <div className="stat-icon">⏳</div>
                    <div className="stat-content">
                        <h3>{stats.pendingOrders}</h3>
                        <p>قيد الانتظار</p>
                    </div>
                </div>
                <div className="stat-card active">
                    <div className="stat-icon">🔄</div>
                    <div className="stat-content">
                        <h3>{stats.activeOrders}</h3>
                        <p>نشطة</p>
                    </div>
                </div>
                <div className="stat-card completed">
                    <div className="stat-icon">✅</div>
                    <div className="stat-content">
                        <h3>{stats.completedOrders}</h3>
                        <p>مكتملة</p>
                    </div>
                </div>
                <div className="stat-card workers">
                    <div className="stat-icon">👷</div>
                    <div className="stat-content">
                        <h3>{stats.totalWorkers}</h3>
                        <p>العمال</p>
                    </div>
                </div>
            </div>

            {/* Orders Timeline */}
            <div className="orders-section">
                <h2>📊 الطلبات الأخيرة</h2>
                {orders.length === 0 ? (
                    <div className="empty-state">
                        <p>لا توجد طلبات حتى الآن</p>
                    </div>
                ) : (
                    <div className="orders-timeline">
                        {orders.map(order => (
                            <div key={order.id} className="order-card">
                                <div className="order-header">
                                    <div className="order-id">#{order.id.substring(0, 8)}</div>
                                    <div
                                        className="order-status"
                                        style={{ backgroundColor: getStatusColor(order.status) }}
                                    >
                                        {getStatusText(order.status)}
                                    </div>
                                </div>
                                <div className="order-body">
                                    <div className="order-info">
                                        <span className="label">المهنة:</span>
                                        <span className="value">{order.professionNameAr || 'غير محدد'}</span>
                                    </div>
                                    <div className="order-info">
                                        <span className="label">الخدمة:</span>
                                        <span className="value">{order.serviceNameAr || 'غير محدد'}</span>
                                    </div>
                                    <div className="order-info">
                                        <span className="label">السعر:</span>
                                        <span className="value">{order.price || 0} ر.س</span>
                                    </div>
                                    {order.location && (
                                        <div className="order-info">
                                            <span className="label">الموقع:</span>
                                            <span className="value location">{order.location.address}</span>
                                        </div>
                                    )}
                                    {order.workerName && (
                                        <div className="order-info">
                                            <span className="label">العامل:</span>
                                            <span className="value">{order.workerName}</span>
                                        </div>
                                    )}
                                    <div className="order-info">
                                        <span className="label">الوقت:</span>
                                        <span className="value">
                                            {order.createdAt?.toDate?.().toLocaleString('ar-SA') || 'غير محدد'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Workers List */}
            <div className="workers-section">
                <h2>👷 العمال المسجلين</h2>
                {workers.length === 0 ? (
                    <div className="empty-state">
                        <p>لا يوجد عمال مسجلين حتى الآن</p>
                    </div>
                ) : (
                    <div className="workers-grid">
                        {workers.map(worker => (
                            <div key={worker.id} className="worker-card">
                                <div className="worker-name">{worker.name}</div>
                                <div className="worker-phone">{worker.phone}</div>
                                <div className="worker-professions">
                                    {worker.professions?.length || 0} مهنة
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminDashboard
