import { Timeline } from '@shared/components/timeline'
import cn from 'classnames'

const steps = [
  {
    title: "Ознакомительный этап",
    description:
      "Для знакомства с системой проведения дистанционных этапов олимпиад на нашем сайте.",
    active: true,
  },
  {
    title: "Отборочный (дистанционный) этап",
    description:
      "Проводится в заочной форме на нашем сайте. Узнайте даты на странице расписания.",
  },
  {
    title: "Заключительный этап",
    description:
      "Дату проведения Вы можете узнать в Расписании. Для участия необходимо пройти предыдущие этапы.",
  },
];

export const CustomSteps = ({ className, active }: { className?: string, active?: number }) => {
  return (
    <Timeline active={active} className={cn(className)} steps={steps} />
  )
}
