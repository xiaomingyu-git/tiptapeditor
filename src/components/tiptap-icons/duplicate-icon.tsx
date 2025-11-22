import { memo } from "react"

type SvgProps = React.ComponentPropsWithoutRef<"svg">

export const DuplicateIcon = memo(({ className, ...props }: SvgProps) => {
  return (
    <svg
      width="24"
      height="24"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M8 2v4H16V2" />
      <path d="M16 2v4H8V2" />
      <path d="M4 8h16" />
      <path d="M4 8h12v12H4V8Z" />
      <path d="M8 12v4" />
      <path d="M11 12v4" />
      <path d="M14 12v4" />
    </svg>
  )
})

DuplicateIcon.displayName = "DuplicateIcon"
