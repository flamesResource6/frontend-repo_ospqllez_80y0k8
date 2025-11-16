import { useState } from 'react'
import Hero from './components/Hero'
import Register from './components/Register'
import AlertPanel from './components/AlertPanel'

function App() {
  const [userId, setUserId] = useState(localStorage.getItem('ws_user_id') || '')
  const [step, setStep] = useState(userId ? 'alert' : 'hero')

  const handleRegisterClick = () => setStep('register')
  const handleRegistered = (id) => {
    localStorage.setItem('ws_user_id', id)
    setUserId(id)
    setStep('alert')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      <header className="sticky top-0 backdrop-blur bg-white/50 border-b border-rose-100">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="font-extrabold text-rose-700 text-xl">SafeNow</a>
          <nav className="text-sm text-gray-700 flex items-center gap-4">
            <a href="/test" className="hover:text-rose-700">System Check</a>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {step === 'hero' && <Hero onRegisterClick={handleRegisterClick} />}
        {step === 'register' && <Register onRegistered={handleRegistered} />}
        {step === 'alert' && <AlertPanel userId={userId} />}
      </main>

      <footer className="py-8 text-center text-sm text-gray-500">Built for safety and peace of mind.</footer>
    </div>
  )
}

export default App
