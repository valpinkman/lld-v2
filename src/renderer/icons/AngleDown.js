// @flow

import React from 'react'

const path = (
  <path
    fill="currentColor"
    d="M7.70123023 10.2169906L3.62390158 6.53574061c-.16520211-.146875-.16520211-.384375 0-.53125l.24956063-.221875c.16520211-.146875.43233744-.146875.59753955 0L8 8.97949061l3.5289982-3.19375c.1652022-.146875.4323375-.146875.5975396 0l.2495606.221875c.1652021.146875.1652021.384375 0 .53125L8.29876977 10.2201156c-.16520211.14375-.43233743.14375-.59753954-.003125z"
  />
)

const AngleDown = ({ size, ...p }: { size: number }) => (
  <svg viewBox="0 0 16 14" height={size} width={size * 0.875} {...p}>
    {path}
  </svg>
)

export default AngleDown
