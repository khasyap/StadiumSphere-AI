import type { ButtonHTMLAttributes } from 'react';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className, type = 'button', ...props }: ButtonProps) {
  const buttonClassName = ['rounded-md px-4 py-2 font-medium', className].filter(Boolean).join(' ');

  return <button className={buttonClassName} type={type} {...props} />;
}
