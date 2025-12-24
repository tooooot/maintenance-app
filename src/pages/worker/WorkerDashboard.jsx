import { useState, useEffect } from 'react'
import { collection, query, where, onSnapshot, doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase'
import './WorkerDashboard.css'

function WorkerDashboard() {
    const [availableOrders, setAvailableOrders] = useState([])
    const [activeOrders, setActiveOrders] = useState([])
    const [isAvailable, setIsAvailable] = useState(true)
    const [workerData, setWorkerData] = useState(null)

    useEffect(() => {
        // Get worker data from localStorage (set during registration)
        const worker = JSON.parse(localStorage.getItem('workerData') || '{}')
        setWorkerData(worker)

        if (!worker.professions || worker.professions.length === 0) {
            return
        }

        // Listen to pending orders that match worker's professions
        const ordersQuery = query(
            collection(db, 'orders'),
            where('status', '==', 'pending')
        )

        const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
            const orders = snapshot.docs
                .map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                .filter(order =>
                    worker.professions?.includes(order.professionId)
                )

            setAvailableOrders(orders)
        })

        // Listen to worker's active orders
        const activeQuery = query(
            collection(db, 'orders'),
            where('workerId', '==', worker.id),
            where('status', 'in', ['accepted', 'in_progress'])
        )

        const unsubscribeActive = onSnapshot(activeQuery, (snapshot) => {
            const orders = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setActiveOrders(orders)
        })

        return () => {
            unsubscribe()
            unsubscribeActive()
        }
    }, [])

    const handleAcceptOrder = async (order) => {
        try {
            const orderRef = doc(db, 'orders', order.id)
            await updateDoc(orderRef, {
                status: 'accepted',
                workerId: workerData.id,
                workerName: workerData.name,
                workerPhone: workerData.phone,
                acceptedAt: serverTimestamp()
            })
            alert('تم قبول الطلب! يمكنك الآن التوجه للموقع.')
        } catch (error) {
            console.error('Error accepting order:', error)
            alert('حدث خطأ أثناء قبول الطلب')
        }
    }

    const handleRejectOrder = async (order) => {
        // For now, just remove from view (in real app, might want to track rejections)
        setAvailableOrders(prev => prev.filter(o => o.id !== order.id))
    }

    const handleNavigate = (order) => {
        if (order.location) {
            const { lat, lng } = order.location
            // Open Google Maps with directions
            const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
            window.open(url, '_blank')
        }
    }

    const handleStartWork = async (order) => {
        try {
            const orderRef = doc(db, 'orders', order.id)
            await updateDoc(orderRef, {
                status: 'in_progress',
                startedAt: serverTimestamp()
            })
        } catch (error) {
            console.error('Error starting work:', error)
        }
    }

    const handleCompleteWork = async (order) => {
        try {
            const orderRef = doc(db, 'orders', order.id)
            await updateDoc(orderRef, {
                status: 'completed',
                completedAt: serverTimestamp()
            })
            alert('تم إكمال العمل بنجاح! 🎉')
        } catch (error) {
            console.error('Error completing work:', error)
            alert('حدث خطأ أثناء إكمال العمل')
        }
    }

    return (
        <div className="worker-dashboard">
            <header className="dashboard-header">
                <h1>👷 لوحة تحكم العامل</h1>
                <p>مرحباً {workerData?.name || 'بك'}!</p>
                <button
                    className={`availability-btn ${isAvailable ? 'available' : 'unavailable'}`}
                    onClick={() => setIsAvailable(!isAvailable)}
                >
                    {isAvailable ? '✅ متاح الآن' : '⏸️ غير متاح'}
                </button>
            </header>

            {/* Active Orders */}
            {activeOrders.length > 0 && (
                <section className="orders-section active-section">
                    <h2>🔄 الطلبات النشطة ({activeOrders.length})</h2>
                    <div className="orders-grid">
                        {activeOrders.map(order => (
                            <div key={order.id} className="order-card active-order">
                                <div className="order-header">
                                    <span className="order-id">#{order.id.substring(0, 8)}</span>
                                    <span className={`order-status ${order.status}`}>
                                        {order.status === 'accepted' ? 'مقبول' : 'جاري التنفيذ'}
                                    </span>
                                </div>
                                <div className="order-body">
                                    <div className="order-info">
                                        <span className="icon">🔧</span>
                                        <span>{order.professionNameAr} - {order.serviceNameAr}</span>
                                    </div>
                                    <div className="order-info">
                                        <span className="icon">💰</span>
                                        <span>{order.price} ر.س</span>
                                    </div>
                                    <div className="order-info">
                                        <span className="icon">📍</span>
                                        <span className="location">{order.location?.address}</span>
                                    </div>
                                    {order.description && (
                                        <div className="order-description">
                                            <span className="icon">📝</span>
                                            <span>{order.description}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="order-actions">
                                    <button
                                        className="btn btn-navigate"
                                        onClick={() => handleNavigate(order)}
                                    >
                                        🗺️ التوجه للموقع
                                    </button>
                                    {order.status === 'accepted' && (
                                        <button
                                            className="btn btn-start"
                                            onClick={() => handleStartWork(order)}
                                        >
                                            ▶️ بدء العمل
                                        </button>
                                    )}
                                    {order.status === 'in_progress' && (
                                        <button
                                            className="btn btn-complete"
                                            onClick={() => handleCompleteWork(order)}
                                        >
                                            ✅ إكمال العمل
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Available Orders */}
            <section className="orders-section">
                <h2>📋 الطلبات المتاحة ({availableOrders.length})</h2>
                {!isAvailable && (
                    <div className="unavailable-notice">
                        ⏸️ أنت غير متاح حالياً. قم بتفعيل حالتك لاستقبال الطلبات.
                    </div>
                )}
                {availableOrders.length === 0 ? (
                    <div className="empty-state">
                        <p>لا توجد طلبات متاحة حالياً</p>
                        <p className="hint">سنعلمك فور وصول طلب جديد! 🔔</p>
                    </div>
                ) : (
                    <div className="orders-grid">
                        {availableOrders.map(order => (
                            <div key={order.id} className="order-card">
                                <div className="order-header">
                                    <span className="order-id">#{order.id.substring(0, 8)}</span>
                                    <span className="order-badge new">جديد</span>
                                </div>
                                <div className="order-body">
                                    <div className="order-info">
                                        <span className="icon">🔧</span>
                                        <span>{order.professionNameAr} - {order.serviceNameAr}</span>
                                    </div>
                                    <div className="order-info">
                                        <span className="icon">💰</span>
                                        <span className="price">{order.price} ر.س</span>
                                    </div>
                                    <div className="order-info">
                                        <span className="icon">📍</span>
                                        <span className="location">{order.location?.address}</span>
                                    </div>
                                    <div className="order-info">
                                        <span className="icon">⏰</span>
                                        <span>{order.timing === 'now' ? 'الآن' : 'لاحقاً'}</span>
                                    </div>
                                    {order.description && (
                                        <div className="order-description">
                                            <span className="icon">📝</span>
                                            <span>{order.description}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="order-actions">
                                    <button
                                        className="btn btn-accept"
                                        onClick={() => handleAcceptOrder(order)}
                                        disabled={!isAvailable}
                                    >
                                        ✅ قبول
                                    </button>
                                    <button
                                        className="btn btn-reject"
                                        onClick={() => handleRejectOrder(order)}
                                    >
                                        ❌ رفض
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}

export default WorkerDashboard
