import type { SweetAlertOptions } from 'sweetalert2'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import InfoIcon from '@mui/icons-material/Info'
import ErrorIcon from '@mui/icons-material/Error'

const ReactSwal = withReactContent(Swal)

interface CustomSweetAlertOptions extends SweetAlertOptions {
  title: SweetAlertOptions['title']
  position: SweetAlertOptions['position']
}

const fireSwal = (props: CustomSweetAlertOptions) => {
  const { title, position, ...rest } = props

  return ReactSwal.fire({
    title,
    position,
    showConfirmButton: false,
    background: '#4d4d4d',
    color: '#ddd',
    width: 'auto',
    customClass: {
      popup: 'swal2-border-radius'
    },
    ...rest
  })
}

const fireSwalWithCustomMessage = (message: string, success?: boolean) =>
  fireSwal({
    title: (
      <p style={{ fontSize: 16 }}>
        <span style={{ display: 'flex' }}>
          {success ? (
            <>
              <InfoIcon style={{ marginRight: 8 }} /> {message}
            </>
          ) : (
            <>
              <ErrorIcon style={{ marginRight: 8 }} /> {message}
            </>
          )}
        </span>
      </p>
    ),
    position: 'top-end',
    timer: 1000
  })

export { fireSwal, fireSwalWithCustomMessage }
