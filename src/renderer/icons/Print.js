// @flow

import React from 'react'

const path = (
  <path
    fill="currentColor"
    d="M4.75 2.08333333V6c0 .41421356-.33578644.75-.75.75s-.75-.33578644-.75-.75V1.33333333c0-.41421356.33578644-.75.75-.75h8c.4142136 0 .75.33578644.75.75V6c0 .41421356-.3357864.75-.75.75s-.75-.33578644-.75-.75V2.08333333h-6.5zM4 11.25c.41421356 0 .75.3357864.75.75s-.33578644.75-.75.75H2.66666667c-1.15059323 0-2.08333334-.9327401-2.08333334-2.0833333V7.33333333C.58333333 6.1827401 1.51607344 5.25 2.66666667 5.25H13.3333333c1.1505933 0 2.0833334.9327401 2.0833334 2.08333333v3.33333337c0 1.1505932-.9327401 2.0833333-2.0833334 2.0833333H12c-.4142136 0-.75-.3357864-.75-.75s.3357864-.75.75-.75h1.3333333c.3221661 0 .5833334-.2611672.5833334-.5833333V7.33333333c0-.3221661-.2611673-.58333333-.5833334-.58333333H2.66666667c-.32216611 0-.58333334.26116723-.58333334.58333333v3.33333337c0 .3221661.26116723.5833333.58333334.5833333H4zm.75 2.6666667h6.5v-3.8333334h-6.5v3.8333334zM4 8.58333333h8c.4142136 0 .75.33578644.75.75v5.33333337c0 .4142135-.3357864.75-.75.75H4c-.41421356 0-.75-.3357865-.75-.75V9.33333333c0-.41421356.33578644-.75.75-.75z"
  />
)

const Print = ({ size, ...p }: { size: number }) => (
  <svg viewBox="0 0 16 16" height={size} width={size} {...p}>
    {path}
  </svg>
)

export default Print
