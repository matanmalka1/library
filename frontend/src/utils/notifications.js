import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'

const notyf = new Notyf({
  duration: 3000,
  position: {
    x: 'right',
    y: 'top',
  },
  types: [
    {
      type: 'success',
      background: '#10b981',
      icon: {
        className: 'notyf__icon--success',
        tagName: 'i',
      },
    },
    {
      type: 'error',
      background: '#ef4444',
      icon: {
        className: 'notyf__icon--error',
        tagName: 'i',
      },
    },
    {
      type: 'warning',
      background: '#f59e0b',
      icon: false,
    },
    {
      type: 'info',
      background: '#3b82f6',
      icon: false,
    },
  ],
})

export const showNotification = (type, message) => {
  notyf.open({
    type,
    message,
  })
}

export default notyf
