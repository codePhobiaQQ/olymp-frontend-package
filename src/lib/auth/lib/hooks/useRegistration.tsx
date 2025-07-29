import { ReactNode /*useState */ } from 'react'
// import { Switcher } from '@shared/components/switcher'
// import { registrationOptions } from './../../consts/registration.tsx'
// import { RegistrationFormType } from './../../model/types/registration.ts'
import cn from 'classnames'
import { UserRegistrationForm } from './../../components/forms/reg-form/UserRegistrationForm'
// import { SchoolRegistrationForm } from '@lib/auth/components/forms/reg-form/SchoolRegistrationForm.tsx'
// import { TeacherRegistrationForm } from '@lib/auth/components/forms/reg-form/TeacherRegistrationForm.tsx'

export type RegistrationPayload = {
  content?: ReactNode
}

export const useRegistration = (): RegistrationPayload => {
  let content = null

  // const [registrationType, setRegistrationType] = useState<RegistrationFormType>('teenager')
  // const changeTypeHandler = (value: string | number) => {
  //   setRegistrationType(value as RegistrationFormType)
  // }

  // if (registrationType === 'teenager') {
  content = <UserRegistrationForm />
  // }
  // else if (registrationType === 'school') {
  //   content = <SchoolRegistrationForm />
  // } else if (registrationType === 'teacher') {
  //   content = <TeacherRegistrationForm />
  // }

  return {
    content: (
      <div className={cn('flex flex-col gap-4')}>
        {/*<Switcher onChange={changeTypeHandler} options={registrationOptions} />*/}
        {content}
      </div>
    ),
  }
}
