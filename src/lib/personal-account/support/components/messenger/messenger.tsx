import { Button, ConfigProvider, Form, Input } from 'antd'
import { SendOutlined } from '@ant-design/icons'
import FileSvg from '/public/svg/messenger/file.svg?react'
import { useEffect, useRef } from 'react'
import { CreateIssue } from './create-issue'
import {
  actionSignal,
  issueId,
  messengerStatus,
  showedPinFile,
  showMessageLine,
} from '../../model/provider'
import cn from 'classnames'
import { ExistedIssue } from './existed-issue'

export const Messenger = () => {
  const messagesWrapper = useRef<HTMLDivElement>(null)
  const messages = useRef<HTMLDivElement>(null)
  const [form] = Form.useForm()

  const scrollBottom = () => {
    if (
      !messages.current ||
      !messagesWrapper.current ||
      messages.current?.scrollHeight === undefined
    ) {
      return
    }
    messagesWrapper.current.scrollTop = messages.current.scrollHeight!
  }

  useEffect(() => {
    scrollBottom()
  }, [issueId.value])

  const sendMessageHandler = (data: { message?: string }) => {
    actionSignal.value?.({ value: data?.message || '' })
    form.resetFields(['message'])
  }

  let messengerContent
  if (messengerStatus.value === 'create-issue') {
    messengerContent = <CreateIssue scrollBottom={scrollBottom} />
  } else if (messengerStatus.value === 'issue-set') {
    messengerContent = <ExistedIssue scrollBottom={scrollBottom} issueId={issueId.value!} />
  } else {
    messengerContent = null
  }

  return (
    <div
      style={{ height: '65vh' }}
      className="accentBlueMedium relative max-w-screen-lg  overflow-hidden rounded-xl border-2"
    >
      <div
        style={{
          height: '65vh',
          maxHeight: '65vh',
        }}
        ref={messagesWrapper}
        className="overflow-scroll p-6 pb-16"
      >
        <div ref={messages} className="flex flex-col justify-end gap-4">
          {messengerContent}
        </div>
      </div>

      <ConfigProvider
        theme={{
          components: {
            Input: {
              borderRadius: 0,
              colorBorder: 'hsl(var(--twc-accentBlueMedium))',
              colorBgContainer: 'hsl(var(--twc-secondary))',
              activeBg: 'hsl(var(--twc-secondary))',
            },
            Button: {
              borderRadius: 0,
              defaultBorderColor: 'hsl(var(--twc-accentBlueMedium))',
            },
          },
        }}
      >
        <Form
          form={form}
          onFinish={sendMessageHandler}
          className={cn(
            'absolute bottom-0 left-0 flex h-10 w-full items-center justify-between transition-opacity',
            {
              ['pointer-events-none']: !showMessageLine.value,
            }
          )}
        >
          <div
            className={cn(
              'absolute left-0 top-0 z-10 h-full w-full bg-gray-200 transition-opacity',
              {
                ['opacity-50']: !showMessageLine.value,
                ['pointer-events-none opacity-0']: showMessageLine.value,
              }
            )}
          />
          <Form.Item>
            <Button
              className={cn('h-10 w-10 border-b-0 border-l-0 transition-opacity', {
                ['pointer-events-none']: !showedPinFile.value,
              })}
              icon={<FileSvg className="h-4 w-4 fill-primary" />}
            />
          </Form.Item>
          <Form.Item name="message" rootClassName="h-10 flex-1 border-b-0 border-l-0 border-r-0">
            <Input
              placeholder="Введите текст обращения"
              className="h-10 flex-1 border-b-0 border-l-0 border-r-0"
            />
          </Form.Item>
          <Form.Item name="sende">
            <Button
              htmlType="submit"
              className="h-10 w-10 border-b-0 border-r-0"
              icon={<SendOutlined />}
            />
          </Form.Item>
        </Form>
      </ConfigProvider>
    </div>
  )
}
