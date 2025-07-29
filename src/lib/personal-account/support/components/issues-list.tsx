import { Button, ConfigProvider, Tag, Typography } from 'antd'
import { CheckOutlined, ClockCircleOutlined, FormOutlined } from '@ant-design/icons'
import { useGetTickets } from '../model/api'
import SkeletonButton from 'antd/es/skeleton/Button'
import { issueId, messengerStatus } from './../model/provider'

export const IssuesList = () => {
  const { data: issues, isLoading } = useGetTickets()

  const createIssueHandler = () => {
    messengerStatus.value = 'create-issue'
  }

  const openIssueHandler = (id: number) => () => {
    messengerStatus.value = 'issue-set'
    issueId.value = id
  }

  if (isLoading) {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <SkeletonButton className="h-6" />
        <SkeletonButton className="h-6" />
        <SkeletonButton className="h-6" />
        <SkeletonButton className="h-6" />
      </div>
    )
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Tag: {
            fontSize: 18,
          },
        },
      }}
    >
      <div className="flex flex-col gap-4">
        <div>
          <Button onClick={createIssueHandler} icon={<FormOutlined />}>
            Создать обращение
          </Button>
        </div>

        <div className="flex flex-wrap gap-3">
          {issues?.length ? (
            issues?.map((issue) => {
              let color
              let icon
              if (issue.status === 'success') {
                color = 'green'
                icon = <CheckOutlined />
              } else if (issue.status === 'process') {
                color = 'blue'
                icon = <ClockCircleOutlined />
              }

              return (
                <Tag
                  onClick={openIssueHandler(issue.id)}
                  key={'Обращение №' + issue.id}
                  className="cursor-pointer"
                  color={color}
                  icon={icon}
                >
                  {'Обращение №' + issue.id}
                </Tag>
              )
            })
          ) : (
            <Typography.Text>У вас пока нет обращений</Typography.Text>
          )}
        </div>
      </div>
    </ConfigProvider>
  )
}
