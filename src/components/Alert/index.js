import { notification } from 'antd';

const Alert = (type, message, description) => {
  notification[type]({
    message,
    description,
    duration: 3,
    style: { width: '90%' }
  })
}

export default Alert;