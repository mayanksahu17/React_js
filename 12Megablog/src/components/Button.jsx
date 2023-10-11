import React from 'react'

function Button({
    children,
    type = 'button',
    bgcolor =  'bg-blue-600',
    textcolor = 'text-white',
    classname = '',
    ...props
}) {
  return (
    <Button classname= {`px-4 py-2 rounded-lg ${classname} ${textcolor}`} {...props}>{children}</Button>
  )
}

export default Button