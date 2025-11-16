import { useState } from 'react'

export default function Register({ onRegistered }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [pin, setPin] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${baseUrl}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email: email || null, pin: pin || null })
      })
      if (!res.ok) throw new Error('Registration failed')
      const data = await res.json()
      onRegistered(data.user_id)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Create your safety profile</h2>
      <form onSubmit={submit} className="space-y-3">
        <input value={name} onChange={(e)=>setName(e.target.value)} required placeholder="Full name" className="w-full border rounded-lg px-3 py-2" />
        <input value={phone} onChange={(e)=>setPhone(e.target.value)} required placeholder="Phone number" className="w-full border rounded-lg px-3 py-2" />
        <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email (optional)" className="w-full border rounded-lg px-3 py-2" />
        <input value={pin} onChange={(e)=>setPin(e.target.value)} placeholder="Cancel PIN (optional)" className="w-full border rounded-lg px-3 py-2" />
        {error && <p className="text-rose-600 text-sm">{error}</p>}
        <button disabled={loading} className="w-full bg-rose-600 hover:bg-rose-700 text-white py-2 rounded-lg font-semibold disabled:opacity-60">
          {loading ? 'Saving...' : 'Save & Continue'}
        </button>
      </form>
    </div>
  )
}
