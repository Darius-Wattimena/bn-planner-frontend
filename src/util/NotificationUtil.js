import { store } from 'react-notifications-component'

export function pushNotification (title, message, type) {
  const notification = {
    title: title,
    message: message,
    type: type,
    insert: 'top',
    container: 'top-right',
    animationIn: ['animated', 'fadeIn'],
    animationOut: ['animated', 'fadeOut'],
    dismiss: {
      duration: 5000,
      onScreen: true
    }
  }
  store.addNotification(notification)
}
