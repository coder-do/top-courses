import { DetailedHTMLProps, FunctionComponent, HTMLAttributes, ReactNode } from "react";
import styles from './Tag.module.css';
import cn from 'classnames';

interface TagProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    size?: 's' | 'm';
    children: ReactNode;
    color?: 'ghost' | 'red' | 'grey' | 'green' | 'primary';
    href?: string;
}

const Tag: FunctionComponent<TagProps> = ({ size = 's', className, href, color = 'ghost', children, ...props }) => {
    return (
        <div
            className={cn(styles.tag, className, styles[size], styles[color])}
            {...props}
        >
            {
                href
                    ? <a href={href}>{children}</a>
                    : <>{children}</>
            }
        </div>
    );
}

export { Tag };