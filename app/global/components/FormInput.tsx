import type { FC } from 'react'
import { useField } from 'remix-validated-form'

import { Box } from '@mui/material'
import type { Theme } from '@mui/material'

import { makeStyles } from '~/utils'

type StylesProps = {
  marginBottom: number
  marginTop: number
}

const useStyles = makeStyles<StylesProps>()((theme: Theme, props) => ({
  inputWrapper: {
    marginBottom: props.marginBottom,
    marginTop: props.marginTop,
    placeContent: 'flex-end'
  }
}))

export type FormInputProps = {
  name: string
  inputClassName: string
  placeholder: string
  message?: boolean
  type?: string
  value?: string
  readonly?: boolean
  marginBottom?: number
  marginBottomWithError?: number
}

const FormInput: FC<FormInputProps> = props => {
  const {
    name,
    inputClassName,
    message = false,
    placeholder,
    type = 'text',
    value,
    readonly = false,
    marginBottomWithError = 0,
    marginBottom = 24
  } = props
  const { error, getInputProps } = useField(name)
  console.log('error', error)
  const { classes } = useStyles({
    marginBottom: error ? marginBottomWithError : marginBottom,
    marginTop: message ? 40 : 0
  })

  return (
    <Box className={classes.inputWrapper}>
      <input
        placeholder={placeholder}
        className={inputClassName}
        name={name}
        {...getInputProps({ id: name, type })}
        value={value}
        readOnly={readonly}
      />
      {error ? (
        <p style={{ color: 'red', fontSize: 12, marginTop: 6 }}>{error}</p>
      ) : null}
    </Box>
  )
}

export { FormInput }
