import { DEFAULT_COMPONENTS } from '@document-writing-tools/kernux-theme'
import {
    Children,
    isValidElement,
    type ComponentProps,
    type ComponentType,
} from 'react'

type ImgProps = ComponentProps<'img'>
type ParagraphProps = ComponentProps<'p'>

const ThemeImg = DEFAULT_COMPONENTS.img as ComponentType<ImgProps>
const ThemeP = DEFAULT_COMPONENTS.p as ComponentType<ParagraphProps>

function Figure({ alt, ...props }: ImgProps) {
    return (
        <figure className="mb-4">
            <ThemeImg alt={alt} {...props} />
            {alt && (
                // Hidden from screen readers: it repeats the alt text verbatim.
                <figcaption
                    aria-hidden="true"
                    className="mt-2 text-sm text-muted-foreground"
                >
                    {alt}
                </figcaption>
            )}
        </figure>
    )
}

// Markdown wraps a standalone image in a paragraph, but <figure> is invalid
// inside <p> — so unwrap paragraphs whose only child is an image.
function Paragraph(props: ParagraphProps) {
    const children = Children.toArray(props.children)
    const onlyChild = children.length === 1 ? children[0] : null

    if (isValidElement(onlyChild) && onlyChild.type === Figure) {
        return onlyChild
    }

    return <ThemeP {...props} />
}

export function useMDXComponents() {
    return {
        ...DEFAULT_COMPONENTS,
        img: Figure,
        p: Paragraph,
    }
}
