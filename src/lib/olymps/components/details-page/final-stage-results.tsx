import { SectionTitle } from './shared'
import { Input } from '@shared/components/input'
import { Button } from '@shared/components/button'
import { ChangeEvent, useState } from 'react'

export const FinalStageResults = ({}: { slug: string }) => {
  const [blankNumb, setBlankNumb] = useState<string>()

  const onChangeBlankNumb = (e: ChangeEvent<HTMLInputElement>) => {
    setBlankNumb(e.target.value)
  }

  return (
    <section className="section-padding flex flex-col" id="final-stage-results">
      <SectionTitle title="Результаты заключительго этапа" />

      <div className="flex items-center gap-2.5 flex-wrap">
        <Input
          className="min-w-64 md:min-w-80 bg-[#42A0E41A]"
          value={blankNumb}
          onChange={onChangeBlankNumb}
          placeholder="Введите номер анкеты"
        />
        <Button>Результат</Button>
      </div>
    </section>
  )
}
