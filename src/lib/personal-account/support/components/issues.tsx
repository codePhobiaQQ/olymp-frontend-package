import { IssuesList } from './issues-list.tsx'
import { Messenger } from './messenger/messenger'

export const Issues = () => {
  return (
    <div className="flex flex-col gap-8">
      <IssuesList />
      <Messenger />
    </div>
  )
}
