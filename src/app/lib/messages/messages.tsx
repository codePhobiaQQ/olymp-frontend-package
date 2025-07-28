import { messagesSignal } from '@app/model/state'
import { v4 as uuidv4 } from 'uuid'

export const tsxMsg = ({ content }: { content: string }) => {
  const key = uuidv4()
  messagesSignal.value?.loading({ duration: 0, key, content })
  return () => messagesSignal.value?.destroy(key)
}
