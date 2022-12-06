import { useState, useCallback } from 'react'

export default function useLocalUserInputForm(
  initialState: any = {},
  submitCb: any
) {
  const [values, setValues] = useState<any>(initialState)

  const onChange: any = useCallback(({ target: { name, value } }: any) => {
    setValues((values: any) => ({
      ...values,
      [name]: value
    }))
  }, [])

  // const onCheckboxChange = useCallback(({ target: { name, checked } }:any) => {
  //     setValues(values => ({
  //         ...values,
  //         [name]: checked
  //     }));
  // }, []);

  const onSubmit = (e: any) => {
    if (e && e.preventDefault) {
      e.preventDefault()
    }
    submitCb({ ...values })
  }

  return {
    values,
    onChange,
    //onCheckboxChange,
    onSubmit
  }
}
