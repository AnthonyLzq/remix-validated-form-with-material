import type { Theme } from '@mui/material'

import { makeStyles } from '~/utils'

type CardStylesProps = {
  height?: string
  minWidthCardContainer?: string | number
  maxWidthCardContainer?: string | number
  cardFormControlPadding?: string | number
  wrapperMarginTop?: string | number
}

const useCardStyles = makeStyles<CardStylesProps>()((theme: Theme, props) => ({
  wrapper: {
    display: 'grid',
    placeContent: 'center',
    overflow: 'hidden',
    marginTop: props.wrapperMarginTop ?? 40,
    height: props.height || 'calc(100vh - 40px)',
    width: '100vw',
    [theme.breakpoints.down('md')]: {
      marginTop: 0,
      height: '100vh'
    }
  },
  cardContainer: {
    flex: 1,
    margin: 'auto',
    borderRadius: 16,
    backgroundColor: '#3e3e3e',
    [theme.breakpoints.up('md')]: {
      minWidth: props.minWidthCardContainer || 796
    },
    [theme.breakpoints.down('md')]: {
      maxWidth: props.maxWidthCardContainer || '80% !important'
    }
  },
  card: {
    position: 'relative',
    borderRadius: 16
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 18px',
    backgroundColor: '#4d4d4d',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16
  },
  cardHeaderLeft: {
    marginRight: 'auto'
  },
  cardHeaderRight: {
    display: 'flex'
  },
  cardHeaderEllipsis: {
    width: 3,
    height: 3,
    marginLeft: 2,
    borderRadius: 8,
    backgroundColor: '#999'
  },
  cardHeaderButton: {
    display: 'inline-block',
    width: 8,
    height: 8,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: 'white'
  },
  cardBody: {
    display: 'flex',
    margin: 0,
    width: 'auto'
  },
  cardBodyContent: {
    padding: '28px 48px !important',
    [theme.breakpoints.down('md')]: {
      padding: '24px 32px !important'
    }
  },
  cardBodyContentLeft: {
    display: 'flex',
    flexDirection: 'column'
  },
  cardBodyTitle: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    color: '#f2f0f0',
    fontSize: 26,
    fontFamily: 'Nunito, sans-serif',
    '&:after': {
      content: "''",
      display: 'block',
      position: 'absolute',
      left: 0,
      bottom: -10,
      width: 25,
      height: 4,
      backgroundColor: '#f2f0f0'
    },
    marginBottom: 32
  },
  cardBodyContact: {
    marginTop: 'auto',
    fontSize: 8,
    color: '#888'
  },
  cardFormControl: {
    width: '100%',
    padding: props.cardFormControlPadding ?? '10px 0',
    background: 'none',
    border: 'none',
    borderBottom: '1px solid #666',
    color: '#ddd',
    fontSize: 14,
    outline: 'none',
    transition: 'border-color 0.2s',
    '&::placeholder': {
      color: '#666'
    },
    '&:focus': {
      borderBottomColor: '#ddd'
    },
    fontWeight: '700 !important',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  cardFormControlButtonContainer: {
    marginTop: 16,
    marginBottom: 0,
    display: 'grid',
    placeContent: 'flex-end'
  },
  cardFormContainer: {
    minWidth: 240,
    maxWidth: 340,
    backgroundColor: '#3e3e3e',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    padding: '32px 36px',
    boxSizing: 'content-box',
    [theme.breakpoints.down('xs')]: {
      minWidth: 220
    }
  },
  cardFormControlButton: {
    background: 'none',
    border: 'none',
    fontSize: 14,
    backgroundColor: '#5e548e',
    padding: '12px 20px',
    minWidth: 120,
    borderRadius: 8,
    outline: 'none',
    fontWeight: 700
  }
}))

type ButtonStyleProps = {
  active: boolean
}

const useButtonStyles = makeStyles<ButtonStyleProps>()(
  (theme: Theme, props) => ({
    button: {
      color: props.active ? '#f2f0f0' : '#929292',
      cursor: props.active ? 'pointer' : 'default'
    }
  })
)

export { useCardStyles, useButtonStyles }
