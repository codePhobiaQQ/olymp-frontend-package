import { Typography } from 'antd'
import { Year } from './Year'
import { Rubric } from './Rubric'
import { Class } from './Class'

export const UserFilter = () => {
  return (
    <div className="mt-28 flex flex-col">
      <div className="flex">
        <div className="content-name" />
        <div className="ml-auto flex-1 xl:pl-32">
          <Typography.Text rootClassName="text-lg font-light">
            Задания в данном разделе упорядочены по тематике и снабжены подсказками и подробными
            решениями, что очень удобно при подготовке к олимпиаде.
          </Typography.Text>
        </div>
      </div>

      <div className="mt-16 flex flex-col gap-4 lg:flex-row">
        <Year />
        <Rubric />
        <Class />
      </div>
    </div>
  )
}
