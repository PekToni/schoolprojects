const initialNotification = {success: null, error: null}

const notificationRecuder = (state = initialNotification, action) => {
  switch(action.type) {
  case 'SUCCESS_NOTIFICATION':
    return action
  case 'ERROR_NOTIFICATION':
    return action
  default:
    return state
  }
}

export const showSuccessNotification = (notification) => {
  return {
    type: 'SUCCESS_NOTIFICATION',
    success: notification,
    error: null
  }
}

export const showErrorNotification = (notification) => {
  return {
    type: 'ERROR_NOTIFICATION',
    error: notification,
    success: null
  }
}

export default notificationRecuder