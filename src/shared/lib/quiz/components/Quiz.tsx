import {
  currentQuestion,
  questions,
  isFullScreen,
  inited,
  isFinalPage,
  userAnswers,
  destroy,
  finishQuizTime,
} from './../model/provider/provider'
import cls from './Quiz.module.scss'
import { InfoProps, QuestionI } from './../model/types'
import { ButtonProps, ConfigProvider, Tabs, Typography } from 'antd'
import {
  CheckCircleOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  LeftCircleOutlined,
  RightCircleOutlined,
  SignatureOutlined,
} from '@ant-design/icons'
import { Button } from '@shared/components/button'
import { Question } from './question'
import cn from 'classnames'
import { Timer } from './timer'
import { ReactNode, useEffect } from 'react'
import { init } from './../model/services/init'
import { FinalPage } from './final'
import { useAppDispatch } from '@shared/hooks'

export interface QuizProps {
  info?: InfoProps
  questions: QuestionI[]
  finishBtnProps?: ButtonProps
  onAnswer?: (props: { question_id: string; answer: string }) => Promise<void>
  onFinish?: () => Promise<void>
}

export const Quiz = (props: QuizProps) => {
  const dispatch = useAppDispatch()
  const { questions: initQuestions, info, onAnswer, onFinish } = props

  useEffect(() => {
    if (info?.finish_time) {
      finishQuizTime.value = info.finish_time
    }
    if (inited.value || !initQuestions?.length) {
      return
    }
    dispatch(init({ initQuestions, info }))
    return () => {
      destroy()
    }
  }, [initQuestions, inited.value, info?.finish_time])

  const changeTabHandler = (key: string) => {
    currentQuestion.value = Number(key)
  }

  const toggleFullScreen = (value: boolean) => () => {
    isFullScreen.value = value
  }

  const toggleFinalPageHandler = (value: boolean) => () => {
    isFinalPage.value = value
  }

  // Question controllers
  const prevHandler = () => {
    if (currentQuestion.value === 1) {
      return
    }
    currentQuestion.value = (currentQuestion.value ?? 2) - 1
  }

  const nextHandler = () => {
    if (questions.value?.length === currentQuestion.value) {
      return
    }
    currentQuestion.value = (currentQuestion.value ?? 0) + 1
  }

  return (
    <section id="quiz" className={cn('flex w-full max-w-screen-md flex-col gap-6', cls.Quiz)}>
      <div
        className={cn('flex w-full flex-col rounded-xl border-2 border-accentPink p-4', {
          ['fixed left-0 top-0 z-10 h-screen scale-100 border-0 bg-secondary']: isFullScreen.value,
        })}
      >
        {/* Top controllers */}
        <div className="flex justify-between border-b-2 pb-4">
          <Timer />

          {!isFullScreen.value ? (
            <FullscreenOutlined
              onClick={toggleFullScreen(true)}
              className="cursor-pointer text-3xl"
            />
          ) : (
            <FullscreenExitOutlined
              onClick={toggleFullScreen(false)}
              className="cursor-pointer text-3xl"
            />
          )}
        </div>

        {!isFinalPage.value ? (
          <>
            <ConfigProvider
              theme={{
                components: {
                  Tabs: {},
                },
              }}
            >
              <Tabs
                defaultActiveKey="1"
                onChange={changeTabHandler}
                activeKey={currentQuestion.value?.toString()}
                items={questions.value?.map((question) => {
                  const isDone =
                    question?.userAnswer ||
                    (userAnswers.value[question.id]?.value &&
                      userAnswers.value[question.id]?.needUpdate === false)

                  const needUpdate =
                    userAnswers.value[question.id]?.value !== undefined &&
                    userAnswers.value[question.id]?.needUpdate

                  let icon: ReactNode
                  let textCls: string | undefined

                  if (needUpdate) {
                    icon = <SignatureOutlined className="text-gray-500" />
                    textCls = 'text-gray-500'
                  } else if (isDone) {
                    icon = <CheckCircleOutlined className="text-green-500" />
                    textCls = 'text-green-500'
                  }

                  return {
                    label: (
                      <Typography.Text className={cn(textCls)}>
                        Задание {question.id}
                      </Typography.Text>
                    ),
                    key: question.id.toString(),
                    children: <Question onAnswer={onAnswer} question={question} />,
                    icon,
                  }
                })}
              />
            </ConfigProvider>
          </>
        ) : (
          <FinalPage />
        )}

        {/* Bottom controllers */}
        <div className={cn('flex justify-between border-t-2 pt-4')}>
          <div className="flex items-center gap-4">
            {isFinalPage.value && <Button onClick={toggleFinalPageHandler(false)}>Назад</Button>}
            <Button onClick={isFinalPage.value ? onFinish : toggleFinalPageHandler(true)} danger>
              {!isFinalPage.value ? 'Проверить ответы' : 'Завершить'}
            </Button>
          </div>

          {!isFinalPage.value && (
            <div className="flex items-center gap-4">
              <LeftCircleOutlined
                disabled={currentQuestion.value === 1}
                className={cn('text-3xl', { ['opacity-50']: currentQuestion.value === 1 })}
                onClick={prevHandler}
              />

              <RightCircleOutlined
                disabled={questions.value.length === currentQuestion.value}
                className={cn('text-3xl', {
                  ['opacity-50']: questions.value.length === currentQuestion.value,
                })}
                onClick={nextHandler}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
