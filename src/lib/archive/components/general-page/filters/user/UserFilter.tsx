import { Typography } from 'antd'
import { Year } from './Year'
import { Rubric } from './Rubric'
import { Class } from './Class'
import cn from 'classnames'

export const UserFilter = ({ showDescription = true, className }: { showDescription?: boolean, className?: string }) => {
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {showDescription && (
        <div className="flex">
          <div className="content-name hidden md:block" />
          <div className="max-w-screen-sm flex-1 md:ml-auto md:pl-10 xl:pl-32">
            <Typography.Text rootClassName="text-lg font-light">
              Задания в данном разделе упорядочены по тематике и снабжены подсказками и подробными
              решениями, что очень удобно при подготовке к олимпиаде.
            </Typography.Text>
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-4 lg:flex-row">
        <Class />
        <Year />
        <Rubric />
      </div>
    </div>
  )
}
