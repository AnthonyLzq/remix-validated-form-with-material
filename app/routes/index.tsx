import { useEffect } from 'react'
import type { ActionFunction } from '@remix-run/node'
import { useActionData } from '@remix-run/react'
import { json } from '@remix-run/node'
import { useIsSubmitting, ValidatedForm } from 'remix-validated-form'
import { withZod } from '@remix-validated-form/with-zod'
import { z } from 'zod'

import { Grid } from '@mui/material'

import {
  FormInput,
  PseudoWindowCard,
  SubmitButton,
  Title,
  useButtonStyles,
  useCardStyles
} from '~/global'
import {
  fireSwalWithCustomMessage,
  getActionBodyParsed,
  makeStyles
} from '~/utils'

type Member = {
  id: number
  name: string
  username: string
  email: string
}

type StyleProps = {
  isSubmitting: boolean
}

const MAX_WIDTH = '460px'

const useStyles = makeStyles<StyleProps>()((theme, props) => ({
  smallContainer: {
    maxWidth: MAX_WIDTH,
    paddingBottom: '5rem',
    width: 'auto',
    height: 'auto',
    color: 'white'
  },
  bigContainer: {
    paddingBottom: '5rem',
    color: 'white'
  },
  form: {
    padding: '28px 48px',
    maxHeight: '600px',
    overflowY: 'auto'
  },
  title: {
    color: 'white'
  },
  cardFormControlButton: {
    ...(!props.isSubmitting && {
      '&:hover': {
        color: '#929292'
      }
    })
  }
}))

const codeValidator = withZod(
  z.object({
    id: z.coerce.number()
  })
)

const validator = withZod(
  z.object({
    id: z.coerce.number(),
    name: z.string().min(3, 'Invalid name'),
    username: z.string().min(3, 'Invalid username'),
    email: z.string().email('Invalid email'),
    photo: z.string().url('Url inválido'),
    git: z.string().optional(),
    linkedin: z.string().optional()
  })
)

const FORM_SEARCH_ID = 'searchMember'
const FORM_UPDATE_ID = 'updateMember'

export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData()
  const bodyParsed = getActionBodyParsed(body)

  if (bodyParsed.__rvfInternalFormId === FORM_SEARCH_ID) {
    const result = await codeValidator.validate(body)

    if (result.error) return false

    const member = await (
      await fetch(
        `https://jsonplaceholder.typicode.com/users/${result.data?.id}`
      )
    ).json()

    if (!member) return false

    return json({
      member,
      type: 'search'
    })
  }

  const result = await validator.validate(body)

  if (result.error) return false

  return json({
    member: result.data,
    type: 'update'
  })
}

const Home = () => {
  const isSubmitting = useIsSubmitting(FORM_SEARCH_ID)
  const { classes: cardClasses } = useCardStyles({})
  const { classes: buttonClasses } = useButtonStyles({
    active: !isSubmitting
  })
  const { classes } = useStyles({ isSubmitting })
  const updateMemberResult = useActionData<
    false | Serializer<{ member: Member; type: 'search' | 'update' }>
  >()

  useEffect(() => {
    if (updateMemberResult && updateMemberResult.type === 'search') {
      fireSwalWithCustomMessage(
        updateMemberResult
          ? 'Member found!'
          : 'Ups, we could not find the requested member member :(',
        Boolean(updateMemberResult)
      )

      return
    }

    if (updateMemberResult && updateMemberResult.type === 'update') {
      fireSwalWithCustomMessage(
        updateMemberResult
          ? 'Member updated!'
          : 'Ups, we could not update the requested member :(',
        Boolean(updateMemberResult)
      ).then(() => {
        window.location.reload()
      })

      return
    }
  }, [updateMemberResult])

  return (
    <PseudoWindowCard
      className={
        updateMemberResult ? classes.bigContainer : classes.smallContainer
      }
      minWidthCardContainer={updateMemberResult ? undefined : MAX_WIDTH}
    >
      {updateMemberResult ? (
        <ValidatedForm
          validator={validator}
          method='post'
          resetAfterSubmit={true}
          id={FORM_UPDATE_ID}
          className={classes.form}
          defaultValues={{
            id: updateMemberResult.member.id,
            name: updateMemberResult.member.name,
            username: updateMemberResult.member.username,
            email: updateMemberResult.member.email
          }}
          onSubmit={(data, event) => {
            console.log('data, event', data, event)
          }}
        >
          <Title title={`Update ${updateMemberResult.member.name} data`} />
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <FormInput
                name='name'
                inputClassName={cardClasses.cardFormControl}
                placeholder={`NAME: ${updateMemberResult.member.name}`}
                marginBottom={32}
                marginBottomWithError={8}
              />
              <FormInput
                name='email'
                inputClassName={cardClasses.cardFormControl}
                placeholder={`EMAIL: ${updateMemberResult.member.email}`}
                marginBottom={32}
                marginBottomWithError={8}
              />
            </Grid>
            <Grid item xs={6}>
              <FormInput
                name='username'
                inputClassName={cardClasses.cardFormControl}
                placeholder={`USERNAME: ${updateMemberResult.member.username}`}
                marginBottom={32}
                marginBottomWithError={8}
              />
            </Grid>
          </Grid>
          <SubmitButton
            boxClassName={cardClasses.cardFormControlButtonContainer}
            buttonClassName={`${classes.cardFormControlButton} ${cardClasses.cardFormControlButton} ${buttonClasses.button}`}
            buttonContent='Update'
            buttonContentLoading='Updating...'
            form={FORM_UPDATE_ID}
            solvedCaptcha
          />
        </ValidatedForm>
      ) : (
        <ValidatedForm
          validator={codeValidator}
          method='post'
          resetAfterSubmit={true}
          id={FORM_SEARCH_ID}
          className={classes.form}
        >
          <Title title='SEARCH A MEMBER' />
          <FormInput
            name='id'
            inputClassName={cardClasses.cardFormControl}
            placeholder='ID'
          />
          <SubmitButton
            boxClassName={cardClasses.cardFormControlButtonContainer}
            buttonClassName={`${classes.cardFormControlButton} ${cardClasses.cardFormControlButton} ${buttonClasses.button}`}
            buttonContent='Search'
            buttonContentLoading='Searching...'
            form={FORM_SEARCH_ID}
            solvedCaptcha
          />
        </ValidatedForm>
      )}
    </PseudoWindowCard>
  )
}

export default Home
