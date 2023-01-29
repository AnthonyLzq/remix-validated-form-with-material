const getActionBodyParsed = (body: FormData) => {
  const bodyObj: Record<string, unknown> & { __rvfInternalFormId: string } = {
    __rvfInternalFormId: ''
  }

  body.forEach((entry, key) => {
    bodyObj[key] = entry
  })

  if (process.env.NODE_ENV !== 'production') console.log('bodyObj', bodyObj)

  return bodyObj
}

export { getActionBodyParsed }
