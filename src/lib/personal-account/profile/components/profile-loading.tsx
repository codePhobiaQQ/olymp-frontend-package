import { Skeleton } from 'antd'

export const ProfileLoading = () => {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton />
      <Skeleton />
    </div>
  )
}
