import React from 'react'

function Alert({text}:any) {
  return (
    <div className='absolute top-0 text-error p-4 bg-white dark:bg-primary'>{text}</div>
  )
}

export default Alert