export function debouncingFilter(group, value, formValues, setFormValues, timeoutValue, setTimeoutValue, setFilter) {
  formValues[group] = value
  setFormValues({
    ...formValues
  })

  if (timeoutValue) {
    clearTimeout(timeoutValue);
  }

  setTimeoutValue(setTimeout(() => {
    formValues["page"] = 1
    setFilter({
      ...formValues
    })
    clearTimeout(timeoutValue)
  }, 500))
}

export function instantFilter(group, value, formValues, setFormValues, timeoutValue, setFilter) {
  formValues[group] = value
  formValues["page"] = 1

  if (timeoutValue) {
    clearTimeout(timeoutValue);
  }

  setFormValues({
    ...formValues
  })
  setFilter({
    ...formValues
  })
}