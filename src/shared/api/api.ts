import axios, { CreateAxiosDefaults } from 'axios'
import { __API__WORDPRESS__ } from '@shared/consts/api.ts'
import { USER_LOCALSTORAGE_KEY } from '@lib/user/model/consts/user.ts'

const $api_wordpress = axios.create({
  baseURL: __API__WORDPRESS__,
  headers: {
    authorization: `Bearer ${localStorage.getItem(USER_LOCALSTORAGE_KEY)}`,
  },
} as CreateAxiosDefaults)

$api_wordpress.interceptors.response.use(
  (response) => {
    console.log('response hello')
    return response
  }, // Пропускаем успешные ответы без изменений
  (error) => {
    console.log('here bro')
    if (error.response && error.response.status === 401) {
      // Если получен статус 401, удаляем токен из localStorage
      localStorage.removeItem(USER_LOCALSTORAGE_KEY)
    }
    return Promise.reject(error) // Передаем ошибку дальше
  }
)

export { $api_wordpress }
