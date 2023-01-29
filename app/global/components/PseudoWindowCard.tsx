import type { FC, ReactNode } from 'react'
import { Box, Card } from '@mui/material'

import { useCardStyles } from '../styles'

type PseudoWindowCardProps = {
  children?: ReactNode
  className?: string
  height?: string
  minWidthCardContainer?: string | number
  maxWidthCardContainer?: string | number
  wrapperMarginTop?: string | number
}

const PseudoWindowCard: FC<PseudoWindowCardProps> = props => {
  const {
    children,
    className,
    height,
    minWidthCardContainer,
    maxWidthCardContainer,
    wrapperMarginTop
  } = props
  const { classes: cardClasses } = useCardStyles({
    height,
    minWidthCardContainer,
    maxWidthCardContainer,
    wrapperMarginTop
  })

  return (
    <article className={`${className || ''} ${cardClasses.wrapper}`}>
      <Card className={cardClasses.cardContainer}>
        <Box className={cardClasses.card}>
          <Box className={cardClasses.cardHeader}>
            <Box className={cardClasses.cardHeaderLeft}>
              <Box
                className={cardClasses.cardHeaderButton}
                style={{ backgroundColor: '#ed1c6f' }}
              />
              <Box
                className={cardClasses.cardHeaderButton}
                style={{ backgroundColor: '#e8e925' }}
              />
              <Box
                className={cardClasses.cardHeaderButton}
                style={{ backgroundColor: '#74c54f' }}
              />
            </Box>
            <Box className={cardClasses.cardHeaderRight}>
              <Box className={cardClasses.cardHeaderEllipsis} />
              <Box className={cardClasses.cardHeaderEllipsis} />
              <Box className={cardClasses.cardHeaderEllipsis} />
            </Box>
          </Box>
          {children}
        </Box>
      </Card>
    </article>
  )
}

export { PseudoWindowCard }
