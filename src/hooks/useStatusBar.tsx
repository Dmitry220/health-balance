import { SafeArea } from 'capacitor-plugin-safe-area'
import React, { useEffect, useState } from 'react'

export const useStatusBar = () => {
  const [insetsHeight, setInsetsHeight] = useState<number>(0)
  const [statusBarHeight, setStatusBarHeight] = useState<number>(0)

  useEffect(() => {
    SafeArea.getSafeAreaInsets().then((data) => {
      setInsetsHeight(data.insets.top)
    })
    SafeArea.getStatusBarHeight().then(({ statusBarHeight }) => {
      setStatusBarHeight(statusBarHeight)
    })
  }, [])

  return insetsHeight + statusBarHeight + 20
}
