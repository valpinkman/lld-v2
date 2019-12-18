// @flow

import React from 'react'

const path = (
  <path
    fill="currentColor"
    d="M12.541 4.432l1.51-1.51a.697.697 0 0 1 1.1.152c.94 1.67.744 3.259-.575 4.577-1.153 1.154-2.565 1.502-4.127 1.02a.232.232 0 0 0-.233.057L3.71 15.234a2.09 2.09 0 1 1-2.955-2.956L7.26 5.772c.06-.06.083-.15.057-.232-.483-1.562-.134-2.974 1.02-4.128C9.655.094 11.244-.1 12.914.838a.697.697 0 0 1 .15 1.1l-1.509 1.51.165.82.82.164zM1.74 14.25a.697.697 0 0 0 .985 0l6.506-6.506a1.625 1.625 0 0 1 1.63-.404c1.068.33 1.942.115 2.73-.673.63-.63.862-1.277.702-2.015l-.854.854a1.161 1.161 0 0 1-1.049.318l-1.095-.22a1.161 1.161 0 0 1-.91-.91l-.22-1.094a1.168 1.168 0 0 1 .318-1.05l.855-.854c-.738-.16-1.386.073-2.016.702-.787.788-1.003 1.662-.673 2.73a1.625 1.625 0 0 1-.403 1.63L1.74 13.264a.697.697 0 0 0 0 .986z"
  />
)

const AccountSettings = ({ size, ...p }: { size: number }) => (
  <svg viewBox="0 0 16 16" height={size} width={size} {...p}>
    {path}
  </svg>
)

export default AccountSettings
