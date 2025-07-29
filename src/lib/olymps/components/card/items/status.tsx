import { QualStatus, qualStatusCodeData } from '@lib/olymps/model/consts'
import { Typography } from 'antd'
import cn from 'classnames'

export const Status = ({ statusCode, text }: { statusCode?: QualStatus; text?: string }) => {
  if (!statusCode) return

  const svgCls = qualStatusCodeData[statusCode]?.svgCls



  return (
    <div className="z-10 flex flex-col items-center justify-center gap-4">
      {qualStatusCodeData[statusCode]?.image ? (
        qualStatusCodeData[statusCode].image?.({
          className: cn({ ['w-12 h-12 fill-primary']: !svgCls, [`${svgCls}`]: svgCls }),
        })
      ) : (
        <div className="h-12 w-12" />
      )}

      {text && (
        <Typography.Text className="text-md text-center font-medium">{text}</Typography.Text>
      )}
    </div>
  )
}
