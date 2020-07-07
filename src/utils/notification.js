import { notification } from 'antd';

export const Alert = (type, message, description) => {
  notification[type]({
    message,
    description,
    duration: 3,
    style: { width: '90%' }
  })
}