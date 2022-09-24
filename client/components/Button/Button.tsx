import { ButtonHTMLAttributes, DetailedHTMLProps, FunctionComponent, ReactNode } from "react";
import cn from 'classnames';
import styles from './Button.module.css';
import ArrowIcon from '../../assets/arrow.svg'

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    color: 'primary' | 'ghost',
    position?: 'right' | 'down' | 'none',
    children: ReactNode
}

const Button: FunctionComponent<ButtonProps> = ({ color, position = 'none', children, className, ...props }) => {
    return (
        <button className={cn(styles.button, className, styles[color])} {...props}>
            {children}
            {
                position !== 'none' &&
                <span className={cn(styles.arrow, {
                    [styles.down]: position === 'down'
                })}>
                    <ArrowIcon />
                </span>
            }
        </button>
    );
}

export { Button };