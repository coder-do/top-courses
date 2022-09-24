import { DetailedHTMLProps, FunctionComponent, HTMLAttributes } from "react";

interface HeaderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {

}

const Header: FunctionComponent<HeaderProps> = ({ ...props }) => {
    return (
        <div {...props}>
            Header
        </div>
    );
}

export default Header;