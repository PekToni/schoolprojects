import React from 'react'
import {Alert} from 'react-bootstrap'
import PropTypes from 'prop-types'
import {useSelector} from 'react-redux'

const Notification = () => {
  const successNotification = useSelector(state => state.notifications)
  const errorNotification = useSelector(state => state.notifications)
  return (
    <div>
      {successNotification.success !== null && <Alert variant="success">{successNotification.success}</Alert>}
      {errorNotification.error !== null && <Alert variant="danger">{errorNotification.error}</Alert>}
    </div>
  )
}

Notification.propTypes = {
  successNotification: PropTypes.string,
  errorNotification: PropTypes.string
}

export default Notification
