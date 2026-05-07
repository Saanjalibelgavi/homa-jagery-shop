import { FileX } from 'lucide-react'

export default function EmptyState({ icon: Icon = FileX, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-16 h-16 bg-earthy-light rounded-full flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-earthy-brown" />
      </div>
      <h3 className="text-lg font-semibold text-earthy-dark mb-2">{title}</h3>
      <p className="text-sm text-earthy-brown mb-6">{description}</p>
      {action && action}
    </div>
  )
}
