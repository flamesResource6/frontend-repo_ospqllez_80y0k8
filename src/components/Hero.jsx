import { AlertTriangle, PhoneCall, Shield, MapPin } from 'lucide-react'

function Stat({ icon: Icon, title, desc }) {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-lg bg-rose-100 text-rose-600"><Icon size={20} /></div>
      <div>
        <p className="font-semibold text-gray-800">{title}</p>
        <p className="text-gray-600 text-sm">{desc}</p>
      </div>
    </div>
  )
}

export default function Hero({ onRegisterClick }) {
  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
              Safety at your fingertips
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Trigger an SOS, share your location, and instantly notify trusted contacts. Built to help women feel safer, everywhere.
            </p>
            <div className="flex gap-3">
              <button onClick={onRegisterClick} className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-3 rounded-lg font-semibold shadow">
                Get Started
              </button>
              <a href="/test" className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-3 rounded-lg font-semibold">
                System Check
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Stat icon={AlertTriangle} title="SOS Alerts" desc="Quick one-tap emergency alerts" />
            <Stat icon={MapPin} title="Live Location" desc="Share location with contacts" />
            <Stat icon={PhoneCall} title="Trusted Contacts" desc="Notify instantly via SMS/Email" />
            <Stat icon={Shield} title="Safe PIN" desc="Cancel false alarms securely" />
          </div>
        </div>
      </div>
    </section>
  )
}
