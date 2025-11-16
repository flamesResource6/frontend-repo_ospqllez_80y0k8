import { useEffect, useState } from 'react'
import { AlertTriangle, Loader2 } from 'lucide-react'

export default function AlertPanel({ userId }) {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState('idle')
  const [alertId, setAlertId] = useState(null)
  const [coords, setCoords] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const watch = navigator.geolocation?.watchPosition(
      (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy }),
      () => {},
      { enableHighAccuracy: true, maximumAge: 5000 }
    )
    return () => { if (watch && navigator.geolocation?.clearWatch) navigator.geolocation.clearWatch(watch) }
  }, [])

  const sendAlert = async () => {
    setSending(true)
    setError('')
    try {
      const res = await fetch(`${baseUrl}/api/alerts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, location: coords || null })
      })
      if (!res.ok) throw new Error('Failed to send alert')
      const data = await res.json()
      setAlertId(data.alert_id)
      setStatus('active')
    } catch (e) {
      setError(e.message)
    } finally {
      setSending(false)
    }
  }

  const cancelAlert = async () => {
    const pin = prompt('Enter your PIN to cancel (if set)') || undefined
    setSending(true)
    try {
      const res = await fetch(`${baseUrl}/api/alerts/cancel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alert_id: alertId, pin })
      })
      if (!res.ok) throw new Error('Failed to cancel alert')
      setStatus('canceled')
    } catch (e) {
      setError(e.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Emergency Alert</h2>
      <p className="text-gray-600 mb-4">Press the button below to send an SOS to your trusted contacts.</p>

      {error && <p className="text-rose-600 text-sm mb-3">{error}</p>}

      {status === 'active' ? (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-rose-700 bg-rose-50 border border-rose-200 p-3 rounded-lg">
            <AlertTriangle size={18} />
            <p className="font-medium">Alert is ACTIVE. Help is on the way.</p>
          </div>
          <button onClick={cancelAlert} disabled={sending} className="w-full bg-gray-800 hover:bg-black text-white py-2 rounded-lg font-semibold disabled:opacity-60">
            {sending ? 'Processing...' : 'Cancel Alert'}
          </button>
        </div>
      ) : (
        <button onClick={sendAlert} disabled={sending} className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-lg font-bold text-lg disabled:opacity-60 flex items-center justify-center gap-2">
          {sending && <Loader2 className="animate-spin" size={18} />}<span>SEND SOS</span>
        </button>
      )}

      {coords && (
        <p className="text-xs text-gray-500 mt-3">Location: {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)} (±{Math.round(coords.accuracy)}m)</p>
      )}
    </div>
  )
}
