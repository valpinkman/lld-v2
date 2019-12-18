// @flow
import React from 'react'

const CrossCircle = ({ size = 16, color = 'currentColor' }: { size: number, color?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.99544 5.99514C3.78365 8.20692 3.78365 11.7929 5.99544 14.0047C8.20722 16.2165 11.7932 16.2165 14.005 14.0047C16.2168 11.7929 16.2168 8.20692 14.005 5.99514C11.7932 3.78335 8.20722 3.78335 5.99544 5.99514ZM5.00549 14.9947C2.24697 12.2362 2.24697 7.76371 5.00549 5.00519C7.76401 2.24666 12.2365 2.24666 14.995 5.00519C17.7535 7.76371 17.7535 12.2362 14.995 14.9947C12.2365 17.7532 7.76401 17.7532 5.00549 14.9947ZM6.95965 6.95952C7.233 6.68614 7.67622 6.68613 7.94959 6.95949L10.0002 9.00992L12.0506 6.9595C12.3239 6.68613 12.7672 6.68614 13.0405 6.9595C13.3139 7.23287 13.3139 7.67608 13.0405 7.94945L10.9901 9.99984L13.0407 12.0502C13.314 12.3236 13.3141 12.7668 13.0407 13.0402C12.7673 13.3136 12.3241 13.3136 12.0507 13.0402L10.0002 10.9898L7.94961 13.0404C7.67624 13.3137 7.23303 13.3137 6.95966 13.0404C6.68629 12.767 6.68629 12.3238 6.95966 12.0504L9.0102 9.99987L6.95968 7.94947C6.6863 7.67611 6.68629 7.23289 6.95965 6.95952Z"
      fill={color}
    />
  </svg>
)

export default CrossCircle
