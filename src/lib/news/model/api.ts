import { wordpressApi } from '@shared/api/rtkApi'
import { FilterI, NewsPreviewItemI } from './types'
import { news_categories } from './../model/provider'

export const newsApi = wordpressApi.injectEndpoints({
  endpoints: (builder) => ({
    getNews: builder.query<
      { count: number; data: NewsPreviewItemI[] },
      {
        categories?: string[]
        page?: number
        limit?: number
        orderby?: 'post_date' | 'title'
        order?: 'ASC' | 'DESC'
      }
    >({
      query: ({ categories, page, limit /*orderby, order*/ }) => {
        let url = 'news?'

        if (categories?.length && categories[0] !== 'all') {
          url += `&categories=${categories.join(',')}`
        }

        if (page) {
          url += `&_page=${page}`
        }

        if (limit) {
          url += `&_limit=${limit}`
        }

        return {
          url,
          method: 'GET',
        }
      },

      transformResponse: (response: {
        data: {
          id: number
          post_date: string
          post_modified: string
          post_author: string
          post_title: string
          post_content: string
          create_time: string
          categories: { name: string; slug: string }[]
          news_title: string
          news_description: string
          news_preview_image: string
        }[]
        count: number
      }) => {
        return {
          data: response?.data?.map((news) => ({
            id: news.id,
            category: news.categories?.[0],
            date: news.create_time,
            preview_title: news.news_title,
            preview_description: news.news_description,
          })) ?? [],
          count: response.count,
        }
      },
    }),

    getCategories: builder.query<FilterI[], void>({
      query: () => ({
        url: `news/categories`,
        method: 'GET',
      }),
      transformResponse: (
        response: { id: number; slug?: string; name: string; parent: number }[]
      ) => {
        console.log('response', response)

        const filters = response?.map((category, index) => ({
          id: category.id,
          name: category.name,
          slug: category.slug || index.toString(),
        }))

        news_categories.value = filters
        return filters
      },
    }),
  }),
})

export const useGetNews = newsApi.useGetNewsQuery
