'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export const ProgressBarNextjs = () => {

  return (
    <ProgressBar
      height="4px"
      color="#02B2DA"
      options={{ showSpinner: false }}
      shallowRouting
    />
  )
}