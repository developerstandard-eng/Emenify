import { Loader2 } from 'lucide-react'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'onDark'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-heading font-semibold transition-[background-color,border-color,color,box-shadow,transform] duration-200 disabled:cursor-not-allowed disabled:opacity-60'

// Orange fails contrast with white text, so primary buttons use navy-deep text (7:1). See DESIGN.md §2.
const variants: Record<Variant, string> = {
  primary: 'bg-accent text-navy-deep hover:bg-accent-hover hover:-translate-y-px active:translate-y-0',
  secondary: 'border border-navy/20 bg-white text-navy hover:border-navy hover:-translate-y-px active:translate-y-0',
  ghost: 'text-navy hover:text-cobalt',
  onDark: 'border border-white/30 text-white hover:border-white hover:bg-white/5',
}

const sizes: Record<Size, string> = {
  sm: 'h-10 px-5 text-[0.875rem]',
  md: 'h-12 px-6 text-[0.9375rem]',
  lg: 'h-14 px-8 text-base',
}

interface CommonProps {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
  iconRight?: ReactNode
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { to?: undefined; href?: undefined; loading?: boolean }
type RouterLinkProps = CommonProps & { to: string; href?: undefined; onClick?: () => void }
type AnchorProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; to?: undefined }

export function Button(props: ButtonProps | RouterLinkProps | AnchorProps) {
  const { variant = 'primary', size = 'md', className, children, iconRight } = props
  const classes = cn(base, variants[variant], sizes[size], className)

  if (props.to !== undefined) {
    return (
      <Link to={props.to} className={classes} onClick={props.onClick}>
        {children}
        {iconRight}
      </Link>
    )
  }

  if (props.href !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { variant: _v, size: _s, className: _c, iconRight: _i, children: _ch, ...rest } = props
    return (
      <a {...rest} className={classes}>
        {children}
        {iconRight}
      </a>
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { variant: _v, size: _s, className: _c, iconRight: _i, children: _ch, loading, disabled, type, ...rest } = props
  return (
    <button {...rest} type={type ?? 'button'} disabled={disabled || loading} aria-busy={loading || undefined} className={classes}>
      {loading && <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} aria-hidden />}
      {children}
      {!loading && iconRight}
    </button>
  )
}
