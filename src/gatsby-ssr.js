// eslint-disable-next-line no-unused-vars
import React from 'react'

export const onRenderBody = (
  { setHeadComponents }, { environments = ['production'] }
) => {
  const currentEnvironment = process.env.ENV || process.env.NODE_ENV || 'development'

  if (!environments.includes(currentEnvironment)) {
    return null
  }

  // Lighthouse recommends pre-connecting to googletagmanager
  setHeadComponents([
    <link
      rel="preconnect dns-prefetch"
      key="preconnect-googletagmanager"
      href="https://www.googletagmanager.com"
    />,
  ])
}
