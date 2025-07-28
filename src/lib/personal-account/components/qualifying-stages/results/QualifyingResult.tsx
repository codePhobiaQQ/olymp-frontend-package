import { useGetQualifyingResults } from './../../../model/services'
import { useMemo } from 'react'
import cn from 'classnames'
import { Skeleton, Typography } from 'antd'

export const QualifyingResult = () => {
  const { data: results, isLoading } = useGetQualifyingResults()

  const renderResults = useMemo(() => {
    if (isLoading) {
      return new Array(9).fill('').map((_, index) =>
        <div className={cn('p-5 border-2')} key={index}><Skeleton /></div>,
      )
    }

    if (results?.length === 0 || !results) {
      return <Typography.Text>
        Вы пока не прошли ни одного отборочного этапа
      </Typography.Text>
    }

    return results?.map(result => <div className={cn('p-5 border-2 flex flex-col gap-4')} key={result?.['result_id']}>
      <div className='flex items-center justify-between'>
        <Typography.Title level={5}>
          {result?.['quiz_name']}
        </Typography.Title>

        <Typography.Text>
          {result?.['datetime']}
        </Typography.Text>
      </div>

      <div className={cn('flex items-center')}>
        <Typography.Text>
          Результат:&nbsp;
        </Typography.Text>

        {result?.['message'] ?
          <Typography.Text>
            {result?.['message']}
          </Typography.Text>
          :
          <Typography.Text>
            {result?.['point_score'] + ' / ' + result?.['total'] + ' балла'}
          </Typography.Text>}


      </div>
    </div>)
  }, [results, isLoading])

  return (
    <div className={cn('flex flex-col gap-10')}>
      <Typography.Title level={4}>Результаты пройденных отборочных этапов</Typography.Title>

      <div className={cn('flex flex-col gap-4 max-h-96 overflow-auto')}>
        {renderResults}
      </div>
    </div>
  )
}