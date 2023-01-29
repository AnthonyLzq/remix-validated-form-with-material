import { Typography, styled } from '@mui/material'

const CustomTypoGraphy = styled(Typography)({
  color: '#FFF',
  fontFamily: 'Nunito, sans-serif'
})

const MainContactTypography = styled(Typography)(({ theme }) => ({
  fontFamily: 'Nunito, sans-serif',
  fontWeight: 700,
  fontSize: 28,
  [theme.breakpoints.down('md')]: {
    fontSize: 24
  }
}))

const SecondaryContactTypography = styled(Typography)({
  fontFamily: 'Nunito, sans-serif',
  fontWeight: 400,
  fontSize: 12
})

export { CustomTypoGraphy, MainContactTypography, SecondaryContactTypography }
