// @flow

import React from 'react'

const path = (
  <path
    fill="currentColor"
    d="M2.502 8.393c.335.494.731.99 1.184 1.45C4.953 11.128 6.399 11.888 8 11.888s3.047-.76 4.314-2.047A10.368 10.368 0 0 0 13.751 8a10.368 10.368 0 0 0-1.437-1.842C11.047 4.87 9.601 4.11 8 4.11s-3.047.76-4.314 2.047A10.368 10.368 0 0 0 2.249 8c.073.12.158.253.253.393zm-1.44-.641a8.35 8.35 0 0 1 .46-.748c.37-.547.809-1.094 1.313-1.606C4.302 3.907 6.028 3 8 3s3.698.907 5.165 2.398c.504.512.942 1.059 1.313 1.606.225.33.378.591.46.748a.532.532 0 0 1 0 .496 8.35 8.35 0 0 1-.46.748 11.477 11.477 0 0 1-1.313 1.606C11.698 12.093 9.972 13 8 13s-3.698-.907-5.165-2.398a11.477 11.477 0 0 1-1.313-1.606 8.35 8.35 0 0 1-.46-.748.532.532 0 0 1 0-.496zM8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0-1a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
  />
)

const Eye = ({ size, ...p }: { size: number }) => (
  <svg viewBox="0 0 16 16" height={size} width={size} {...p}>
    {path}
  </svg>
)

export default Eye
