import type { FC } from 'react'
import { Box } from '@mui/material'
import { useIsSubmitting } from 'remix-validated-form'

type SubmitButtonProps = {
  boxClassName: string
  buttonClassName: string
  buttonContent: string
  buttonContentLoading: string
  form: string
  solvedCaptcha: boolean
}

const SubmitButton: FC<SubmitButtonProps> = props => {
  const {
    boxClassName,
    buttonClassName,
    buttonContent,
    buttonContentLoading,
    form,
    solvedCaptcha
  } = props
  const isSubmitting = useIsSubmitting()

  return (
    <Box className={boxClassName}>
      <button
        disabled={isSubmitting || !solvedCaptcha}
        className={buttonClassName}
        type='submit'
        form={form}
        onClick={e => {
          console.log('e', e)
        }}
      >
        {isSubmitting ? buttonContentLoading : buttonContent}
      </button>
    </Box>
  )
}

export { SubmitButton }
