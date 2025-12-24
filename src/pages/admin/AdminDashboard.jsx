import { useState, useEffect } from 'react'
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc, where } from 'firebase/firestore'
import { db } from '../../firebase'
import './AdminDashboard.css'

function AdminDashboard() {
    const [orders, setOrders] = useState([])
    const [workers, setWorkers] = useState([])
    const [pendingWorkers, setPendingWorkers] = useState([])
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [selectedWorker, setSelectedWorker] = useState(null)
    const [stats, setStats] = useState({
        totalOrders: 0,
        pendingOrders: 0,
        activeOrders: 0,
        completedOrders: 0,
        totalWorkers: 0,
        totalRevenue: 0
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
            const revenue = ordersData
                .filter(o => o.status === 'completed')
                .reduce((sum, o) => sum + (o.price || 0), 0)

            setStats({
                totalOrders: ordersData.length,
                pendingOrders: ordersData.filter(o => o.status === 'pending').length,
                activeOrders: ordersData.filter(o => o.status === 'accepted' || o.status === 'in_progress').length,
                completedOrders: ordersData.filter(o => o.status === 'completed').length,
                totalWorkers: 0,
                totalRevenue: revenue
            })
        })

        // Listen to active workers
        const workersQuery = query(collection(db, 'workers'), where('status', '==', 'active'))
        const unsubscribeWorkers = onSnapshot(workersQuery, (snapshot) => {
            const workersData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setWorkers(workersData)
            setStats(prev => ({ ...prev, totalWorkers: workersData.length }))
        })

        // Listen to pending workers
        const pendingQuery = query(collection(db, 'workers'), where('status', '==', 'pending'))
        const unsubscribePending = onSnapshot(pendingQuery, (snapshot) => {
            const pendingData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setPendingWorkers(pendingData)
        })

        return () => {
            unsubscribeOrders()
            unsubscribeWorkers()
            unsubscribePending()
        }
    }, [])

    const handleCancelOrder = async (orderId) => {
        if (!confirm('هل أنت متأكد من إلغاء هذا الطلب؟')) return

        try {
            await updateDoc(doc(db, 'orders', orderId), {
                status: 'cancelled',
                cancelledBy: 'admin',
                cancelledAt: new Date()
            })
            alert('تم إلغاء الطلب بنجاح')
            setSelectedOrder(null)
        } catch (error) {
            console.error('Error cancelling order:', error)
            alert('حدث خطأ أثناء إلغاء الطلب')
        }
    }

    const handleReassignWorker = async (orderId) => {
        const workerName = prompt('أدخل اسم العامل الجديد:')
        if (!workerName) return

        try {
            await updateDoc(doc(db, 'orders', orderId), {
                workerName: workerName,
                reassignedBy: 'admin',
                reassignedAt: new Date()
            })
            alert('تم إعادة تعيين العامل بنجاح')
            setSelectedOrder(null)
        } catch (error) {
            console.error('Error reassigning worker:', error)
            alert('حدث خطأ أثناء إعادة التعيين')
        }
    }

    const handleApproveWorker = async (workerId) => {
        try {
            await updateDoc(doc(db, 'workers', workerId), {
                status: 'active',
                approvedBy: 'admin',
                approvedAt: new Date()
            })
            alert('تم الموافقة على العامل بنجاح')
        } catch (error) {
            console.error('Error approving worker:', error)
            alert('حدث خطأ أثناء الموافقة')
        }
    }

    const handleRejectWorker = async (workerId) => {
        if (!confirm('هل أنت متأكد من رفض هذا العامل؟')) return

        try {
            await deleteDoc(doc(db, 'workers', workerId))
            alert('تم رفض العامل')
        } catch (error) {
            console.error('Error rejecting worker:', error)
            alert('حدث خطأ أثناء الرفض')
        }
    }

    const handleSuspendWorker = async (workerId) => {
        if (!confirm('هل أنت متأكد من إيقاف هذا العامل؟')) return

        try {
            await updateDoc(doc(db, 'workers', workerId), {
                status: 'suspended',
                suspendedBy: 'admin',
                suspendedAt: new Date()
            })
            alert('تم إيقاف العامل')
            setSelectedWorker(null)
        } catch (error) {
            console.error('Error suspending worker:', error)
            alert('حدث خطأ أثناء الإيقاف')
        }
    }

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
                <p>إدارة شاملة للطلبات والعمال</p>
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
                <div className="stat-card revenue">
                    <div className="stat-icon">💰</div>
                    <div className="stat-content">
                        <h3>{stats.totalRevenue} ر.س</h3>
                        <p>الإيرادات</p>
                    </div>
                </div>
            </div>

            {/* Pending Workers Approval */}
            {pendingWorkers.length > 0 && (
                <div className="orders-section pending-workers-section">
                    <h2>👷 عمال ينتظرون الموافقة ({pendingWorkers.length})</h2>
                    <div className="workers-approval-grid">
                        {pendingWorkers.map(worker => (
                            <div key={worker.id} className="worker-approval-card">
                                <div className="worker-info">
                                    <h3>{worker.name}</h3>
                                    <p>📱 {worker.phone}</p>
                                    <p>💼 {worker.professions?.length || 0} مهنة</p>
                                    <p>⭐ خبرة: {worker.experience}</p>
                                </div>
                                <div className="approval-actions">
                                    <button
                                        className="btn btn-approve"
                                        onClick={() => handleApproveWorker(worker.id)}
                                    >
                                        ✅ موافقة
                                    </button>
                                    <button
                                        className="btn btn-reject"
                                        onClick={() => handleRejectWorker(worker.id)}
                                    >
                                        ❌ رفض
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

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
                                {order.status !== 'completed' && order.status !== 'cancelled' && (
                                    <div className="admin-actions">
                                        <button
                                            className="btn btn-cancel"
                                            onClick={() => handleCancelOrder(order.id)}
                                        >
                                            ❌ إلغاء الطلب
                                        </button>
                                        {order.workerId && (
                                            <button
                                                className="btn btn-reassign"
                                                onClick={() => handleReassignWorker(order.id)}
                                            >
                                                🔄 إعادة تعيين عامل
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Workers List */}
            <div className="workers-section">
                <h2>👷 العمال النشطين ({workers.length})</h2>
                {workers.length === 0 ? (
                    <div className="empty-state">
                        <p>لا يوجد عمال نشطين حتى الآن</p>
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
                                <button
                                    className="btn btn-suspend"
                                    onClick={() => handleSuspendWorker(worker.id)}
                                >
                                    ⏸️ إيقاف
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminDashboard
