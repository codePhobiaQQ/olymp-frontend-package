import { Message } from './message'
import { useEffect } from 'react'
import { actionSignal, showedPinFile, showMessageLine } from './../../model/provider'
import { warning } from '@app/lib/notification'
import { useGetTicket, useReplyTicket } from './../../model/api'
import { Skeleton, Spin } from 'antd'

export const ExistedIssue = ({
  issueId,
  scrollBottom,
}: {
  issueId: number
  scrollBottom?: () => void
}) => {
  const [replyIssue, { isLoading }] = useReplyTicket()
  const { data: issue, isLoading: isLoadingMessages, refetch } = useGetTicket({ id: issueId })

  useEffect(() => {
    scrollBottom?.()
  }, [issue?.replies?.length])

  const renderMessages = () => {
    return issue?.replies?.map((reply) => {
      return (
        <Message
          key={reply.date}
          timestamp={Date.now()}
          isUser={reply?.isUser}
          text={reply.content}
        />
      )
    })
  }

  useEffect(() => {
    showMessageLine.value = true
    showedPinFile.value = false

    setTimeout(() => {
      scrollBottom?.()
    })

    actionSignal.value = ({ value }: { value: string }) => {
      if (!value) {
        warning({ text: 'Вы не ввели тему обращения' })
        return
      }

      replyIssue({ id: issueId, content: value }).then(() => {
        refetch().then(() => {
          scrollBottom?.()
        })
      })
    }
  }, [issueId, refetch, scrollBottom])

  if (isLoadingMessages) {
    return <Skeleton />
  }

  return (
    <>
      {renderMessages()}
      {isLoading && <Spin className="mb-10 mt-10" />}
    </>
  )
}
