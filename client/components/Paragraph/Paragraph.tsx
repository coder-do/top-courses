import { DetailedHTMLProps, FunctionComponent, HTMLAttributes, ReactNode } from "react";
import styles from './Paragraph.module.css';
import cn from 'classnames';

interface ParagraphProps extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
    size?: 's' | 'm' | 'l';
    children: ReactNode;
}

const Paragraph: FunctionComponent<ParagraphProps> = ({ size = 's', className, children, ...props }) => {
    return (
        <p
            className={cn(styles.p, className, styles[size])}
            {...props}
        >
            {children}
        </p>
    );
}

export { Paragraph };