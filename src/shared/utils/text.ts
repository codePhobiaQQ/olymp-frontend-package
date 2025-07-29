import { message } from 'antd'
import React from 'react'
import parse, { domToReact, HTMLReactParserOptions, Element, DOMNode } from 'html-react-parser'

// ---------------------------

export const copyHandler = (text: string) => {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        message.success('Copied')
      })
      .catch((err) => {
        console.error('Failed to copy: ', err)
        message.error('Failed to copy')
      })
  } else {
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select()
    try {
      document.execCommand('copy')
      message.success('Copied')
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err)
      message.error('Failed to copy')
    }
    document.body.removeChild(textArea)
  }
}

// ----------------------------

type ClassMap = {
  tag?: Record<string, string> // по тегу: { p: 'mb-4', h4: 'text-lg' }
  classNames?: Record<string, string> // по классу: { 'highlight': 'text-yellow-500' }
  id?: Record<string, string> // по id: { 'description': 'text-sm' }
}

export function parseWithClasses(html: string, classMap: ClassMap) {
  const options: HTMLReactParserOptions = {
    replace: (node) => {
      if (node.type !== 'tag') return

      const el = node as Element
      const tagName = el.name
      const attribs = el.attribs || {}

      const existingClass = attribs.class || ''
      let newClass = existingClass

      // TAG
      if (classMap.tag?.[tagName]) {
        newClass += ' ' + classMap.tag[tagName]
      }

      // CLASS
      if (attribs.class) {
        const originalClasses = attribs.class.split(' ')
        originalClasses.forEach((cls) => {
          if (classMap.classNames?.[cls]) {
            newClass += ' ' + classMap.classNames[cls]
          }
        })
      }

      // ID
      if (attribs.id && classMap.id?.[attribs.id]) {
        newClass += ' ' + classMap.id[attribs.id]
      }

      return React.createElement(
        tagName,
        { ...attribs, className: newClass.trim() },
        domToReact(el.children as DOMNode[], options)
      )
    },
  }

  return parse(html, options)
}