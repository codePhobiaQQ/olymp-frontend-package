import { Task, TaskProps } from './Task'
import cn from 'classnames'

interface TasksListProps {
  className?: string
  subject: string
  grades?: number[]
  years?: number[]
  categories?: string[]
}

export const TasksList = (props: TasksListProps) => {
  const { className } = props
  const tasks: TaskProps[] = [
    {
      id: '1',
      title: 'Сумма квадратов делителей',
      isFavorite: false,
      rate: 4.6,
      answer: '10',
      decision: 'decision',
      clue: 'clue',
      state:
        'Из центра O сферы радиуса R проведены три луча, пересекающие сферу в точках A, B и C. Известно, что ∠AOB=∠AOC=∠BOC=60°. Найдите площадь части сферы, ограниченной плоскостями (AOB), (AOC) и (BOC).',
    },
    {
      id: '2',
      title: 'Сумма квадратов делителей',
      isFavorite: false,
      rate: 2.6,
      answer: '10',
      decision: 'decision',
      clue: 'clue',
      state:
        'Из центра O сферы радиуса R проведены три луча, пересекающие сферу в точках A, B и C. Известно, что ∠AOB=∠AOC=∠BOC=60°. Найдите площадь части сферы, ограниченной плоскостями (AOB), (AOC) и (BOC).',
    },
    {
      id: '2',
      title: 'Сумма квадратов делителей',
      isFavorite: true,
      rate: 0.8,
      answer: '10',
      decision: 'decision',
      clue: 'clue',
      state:
        'Из центра O сферы радиуса R проведены три луча, пересекающие сферу в точках A, B и C. Известно, что ∠AOB=∠AOC=∠BOC=60°. Найдите площадь части сферы, ограниченной плоскостями (AOB), (AOC) и (BOC).',
    },
  ]

  return (
    <div className={cn('flex flex-col gap-5', className)}>
      {tasks.map((task) => (
        <Task key={task.id} {...task} />
      ))}
    </div>
  )
}
