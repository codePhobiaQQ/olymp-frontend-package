import { ReactNode } from 'react'

export type MessengerStatus = 'create-issue' | 'issue-set'

// -------- CATEGORIES --------
export type CategoryType = {
  name: string
  label: string
}

// -------- TICKET --------

type ReplyBackend = {
  attached_files: any[]
  post_author: string
  post_content: string
  post_date: string
  post_date_gmt: '2024-12-09 13:11:46'
}

export type IssueBackend = {
  ID: number
  post_date: string
  post_author: string
  post_content: string
  post_title: string
  replies: ReplyBackend[]
}

export type Issue = {
  id: number
  title: string
  replies: {
    date: string
    content?: ReactNode
    isUser?: boolean
  }[]
}

// --------- LIST -------

export type IssueListItemBackend = {
  ID: number
  post_status: 'success' | 'processing'
  category: string
}

export type IssueListItem = {
  id: number
  status: 'success' | 'process'
  category?: string
}
