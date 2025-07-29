import { useEffect, useState, useRef } from 'react'
import { finishQuizTime } from './../../model/provider/provider'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { Typography } from 'antd'

dayjs.extend(duration)

export const Timer = () => {
  const [remainingTime, setRemainingTime] = useState('')
  const timerInterval = useRef<any | null>(null) // Используем useRef для хранения ID таймера

  useEffect(() => {
    if (!finishQuizTime.value) return
    const endTime = finishQuizTime.value * 1000

    const updateRemainingTime = () => {
      const now = Date.now()
      const timeLeft = endTime - now
      if (timeLeft <= 0) {
        setRemainingTime('00:00:00')
        if (timerInterval.current) clearInterval(timerInterval.current)
      } else {
        const durationObj = dayjs.duration(timeLeft)
        const formattedTime = `${durationObj.hours().toString().padStart(2, '0')}:${durationObj.minutes().toString().padStart(2, '0')}:${durationObj.seconds().toString().padStart(2, '0')}`
        setRemainingTime(formattedTime)
      }
    }

    updateRemainingTime()
    timerInterval.current = setInterval(updateRemainingTime, 1000) // Сохраняем ID таймера в useRef

    return () => {
      if (timerInterval.current) clearInterval(timerInterval.current) // Очищаем таймер при размонтировании
    }
  }, [finishQuizTime.value])

  return (
    <Typography.Text className="text-xl font-medium text-gray-500">
      Осталось: {remainingTime}
    </Typography.Text>
  )
}
