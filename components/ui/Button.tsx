import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseClasses =
    'inline-block font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-center'

  const variantClasses = {
    primary:
      'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800',
    secondary:
      'bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800',
    outline:
      'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 active:bg-primary-100',
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-7 py-3.5 text-lg',
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}) {
  const baseClasses =
    'inline-block font-medium rounded-lg transition-all duration-200 text-center'

  const variantClasses = {
    primary:
      'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800',
    secondary:
      'bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800',
    outline:
      'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 active:bg-primary-100',
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-7 py-3.5 text-lg',
  }

  return (
    <a
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </a>
  )
}
