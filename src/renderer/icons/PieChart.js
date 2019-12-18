// @flow

import React from 'react'

const path = (
  <path
    fill="currentColor"
    d="M5.2 1.067V2.71a5.985 5.985 0 0 0 2.027 11.223A5.983 5.983 0 0 0 13.34 10.7h1.625a.759.759 0 0 1-.056.22A7.5 7.5 0 0 1 .575 9.052 7.502 7.502 0 0 1 5 1.123a.759.759 0 0 1 .2-.056zM15.5 8c0 .42-.34.759-.758.759H8A.758.758 0 0 1 7.242 8V1.26c0-.42.34-.759.758-.759a7.499 7.499 0 0 1 7.5 7.501zm-3.27-4.23a5.982 5.982 0 0 0-3.47-1.705v5.178h5.176a5.985 5.985 0 0 0-1.704-3.473z"
  />
)

const PieChart = ({ size, ...p }: { size: number }) => (
  <svg viewBox="0 0 16 16" height={size} width={size} {...p}>
    {path}
  </svg>
)

export default PieChart
