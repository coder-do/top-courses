import { DetailedHTMLProps, FunctionComponent, HTMLAttributes, ReactNode } from "react";
import Menu from "../Menu/Menu";

interface SidebarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {

}

const Sidebar: FunctionComponent<SidebarProps> = ({ ...props }) => {
    return (
        <div {...props}>
            <Menu />
        </div>
    );
}

export default Sidebar;