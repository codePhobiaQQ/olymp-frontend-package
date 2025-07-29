import { useState } from 'react'
import { GeneralCategoryStep } from './create-steps/general-category-step.tsx'
import { CategoryStep } from './create-steps/category-step.tsx'
import { TitleStep } from './create-steps/title-step.tsx'
import { DescriptionStep } from './create-steps/description-step.tsx'
import { FinalStep } from './create-steps/final-step.tsx'

export type Step = 'generalCategory' | 'category' | 'title' | 'description' | 'final'

export type Steps = Record<Step, number>
export const steps: Steps = {
  generalCategory: 1,
  category: 2,
  title: 3,
  description: 4,
  final: 5,
}

export type Data = Partial<Record<Step, { value: any }>>

export const CreateIssue = ({}: { scrollBottom?: () => void }) => {
  const [data, setData] = useState<Data>({})
  const [currentStep, setStep] = useState<Step>('generalCategory')

  if (Boolean(steps[currentStep] == 1)) {
    return <GeneralCategoryStep setData={setData} setStep={setStep} />
  } else if (Boolean(steps[currentStep] == 2)) {
    return <CategoryStep data={data} setData={setData} setStep={setStep} />
  } else if (Boolean(steps[currentStep] == 3)) {
    return <TitleStep data={data} setData={setData} setStep={setStep} />
  } else if (Boolean(steps[currentStep] == 4)) {
    return <DescriptionStep data={data} setData={setData} setStep={setStep} />
  } else if (Boolean(steps[currentStep] == 5)) {
    return <FinalStep data={data} setData={setData} setStep={setStep} />
  }
}
