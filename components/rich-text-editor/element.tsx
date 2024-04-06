export interface ElementProps {
  attributes: any
  children: React.ReactNode
  element: {
    type: string
    align: string
  }
}

const Element = ({ attributes, children, element }: ElementProps) => {
  const getClasses = (type: string) => {
    switch (type) {
      case 'block-quote':
        return 'text-left p-4 italic border-l-4 bg-neutral-100 text-neutral-600 border-neutral-500 quote'
      case 'bulleted-list':
        return 'list-disc list-inside text-left'
      case 'heading-one':
        return 'text-4xl font-bold text-left'
      case 'heading-two':
        return 'text-2xl font-bold text-left'
      case 'list-item':
        return 'text-left'
      case 'numbered-list':
        return 'list-decimal list-inside text-left'
      default:
        return 'text-left'
    }
  }

  const classes = `${getClasses(element.type)} ${element.align ? `text-${element.align}` : ''}`

  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote className={classes} {...attributes}>
          {children}
        </blockquote>
      )
    case 'bulleted-list':
      return (
        <ul className={classes} {...attributes}>
          {children}
        </ul>
      )
    case 'heading-one':
      return (
        <h1 className={classes} {...attributes}>
          {children}
        </h1>
      )
    case 'heading-two':
      return (
        <h2 className={classes} {...attributes}>
          {children}
        </h2>
      )
    case 'list-item':
      return (
        <li className={classes} {...attributes}>
          {children}
        </li>
      )
    case 'numbered-list':
      return (
        <ol className={classes} {...attributes}>
          {children}
        </ol>
      )
    default:
      return (
        <p className={classes} {...attributes}>
          {children}
        </p>
      )
  }
}

export default Element
