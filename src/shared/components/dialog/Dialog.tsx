import cls from './Dialog.module.scss'
import { Modal, ModalProps } from 'antd'
import { ReactNode, useState } from 'react'
import cn from 'classnames'

export interface DialogProps extends ModalProps {
  children?: ReactNode
  buttonComponent?: (data: any) => ReactNode
  handleOkProps?: {
    action: (...data: any) => any
    isAsync?: boolean
  }
}

export const Dialog = (props: DialogProps) => {
  const { children, className, buttonComponent, handleOkProps, ...otherProps } = props

  const [open, setOpen] = useState<boolean>(false)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [, setModalText] = useState('Content of the modal')

  const showModal = () => {
    setOpen(true)
  }

  const handleOk = async (data: unknown) => {
    if (!handleOkProps) return
    setModalText('The modal will be closed after two seconds')
    setConfirmLoading(true)

    if (handleOkProps?.isAsync) {
      await handleOkProps
        .action?.(data)
        ?.then((res: unknown) => {
          console.log(res)
        })
        ?.finally(() => {
          setOpen(false)
          setConfirmLoading(false)
        })
    }
  }

  const handleCancel = () => {
    setOpen(false)
  }

  // -----------------------------------
  // ------- Button to Open Modal ------
  // -----------------------------------
  let button
  if (buttonComponent) {
    button = buttonComponent({ onClick: showModal })
  }
  // -----------------------------------

  return (
    <>
      {button}

      <Modal
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        className={cn(className, cls.Dialog)}
        {...otherProps}
      >
        {children}
      </Modal>
    </>
  )
}
