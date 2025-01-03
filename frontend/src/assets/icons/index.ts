export interface iconProps {
    size: 'sm' | 'md' | 'lg' | 'xl',
    color?: string | number
    onClick?: ()=> void
}


export const iconSizeVariants = {
    sm: 'size-4',
    md: 'size-5',
    lg: 'size-8',
    xl: 'size-10'
}