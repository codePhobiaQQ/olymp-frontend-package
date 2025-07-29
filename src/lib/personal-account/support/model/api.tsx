import { wordpressApi } from '@shared/api'
import { error, success } from '@app/lib/notification'
import {
  IssueBackend,
  Issue,
  IssueListItem,
  IssueListItemBackend,
  CategoryType,
} from './../model/types'
import { ChosenDataInfo } from './../components/shared/chosen-data-info'

export const supportApi = wordpressApi.injectEndpoints({
  endpoints: (builder) => ({
    createTicket: builder.mutation<void, { category: string; title: string; description: string }>({
      query: ({ category, title, description }) => ({
        url: `/support/ticket`,
        method: 'POST',
        body: {
          department: category,
          title,
          content: description,
        },
      }),
      // @ts-ignore
      onQueryStarted: async (
        args,
        { queryFulfilled }: { queryFulfilled: Promise<{ data: { message: string; id: number } }> }
      ) => {
        try {
          const data = await queryFulfilled
          console.log(data, args)
          success({ text: data.data.message + `\nID обращения: ${data.data.id}` })
          return
        } catch (e) {
          console.error('Error setting metadata:', e)
          error({ text: 'Ошибка во время создания обращения' })
        }
      },
    }),

    getTickets: builder.query<IssueListItem[], void>({
      query: () => ({
        url: `/support/tickets`,
        method: 'GET',
      }),
      transformResponse: (data: IssueListItemBackend[]) => {
        return data?.map((issue) => {
          let status: IssueListItem['status'] | undefined
          if (issue.post_status === 'processing') {
            status = 'process'
          }

          return {
            status: status || 'process',
            id: issue.ID,
            category: issue.category,
          }
        })
      },
    }),

    getTicket: builder.query<Issue, { id: number }>({
      query: ({ id }) => ({
        url: `/support/ticket/${id}`,
        method: 'GET',
      }),
      transformResponse: (data: IssueBackend) => {
        return {
          id: data.ID,
          title: data.post_title,
          replies: [
            {
              content: (
                <ChosenDataInfo
                  data={{
                    description: { value: data?.post_content },
                    title: { value: data?.post_title },
                  }}
                />
              ),
              date: data?.post_date,
              isUser: true,
            },
            ...data?.replies?.map((reply) => {
              return {
                content: reply.post_content,
                date: reply.post_date,
                isUser: data.post_author === reply.post_author,
              }
            }),
          ],
        }
      },
    }),

    replyTicket: builder.mutation<void, { id: number; content: string }>({
      query: ({ id, content }) => ({
        url: `/support/reply-ticket`,
        method: 'POST',
        body: {
          ticket_id: id,
          reply_content: content,
        },
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const data = await queryFulfilled
          console.log(data)
          success({ text: 'Сообщение успешно отправлено' })
        } catch (e) {
          console.error('Error setting metadata:', e)
          error({ text: 'Ошибка во время отправки сообщения' })
        }
      },
    }),

    getSupportCategories: builder.query<CategoryType[], { topic?: string }>({
      query: ({ topic }) => {
        let query = `?subject=support`
        if (topic) {
          query = `?subject=${topic}`
        }
        return {
          url: `/support/categories` + query,
          method: 'GET',
        }
      },
      transformResponse: (data: CategoryType[]) => {
        console.log('data', data)
        return data
      },
    }),
  }),
})

export const useCreateTicket = supportApi.useCreateTicketMutation
export const useReplyTicket = supportApi.useReplyTicketMutation
export const useGetTickets = supportApi.useGetTicketsQuery
export const useGetTicket = supportApi.useGetTicketQuery
export const useGetSupportCategories = supportApi.useGetSupportCategoriesQuery
