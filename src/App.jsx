import { Routes, Route } from 'react-router-dom'
import './App.css'

// Pages (سننشئها لاحقاً)
import Home from './pages/Home'
import Login from './pages/Login'
import CustomerHome from './pages/customer/CustomerHome'
import WorkerHome from './pages/worker/WorkerHome'

function App() {
  return (
    <div className="app" dir="rtl">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/customer/*" element={<CustomerHome />} />
        <Route path="/worker/*" element={<WorkerHome />} />
      </Routes>
    </div>
  )
}

export default App
