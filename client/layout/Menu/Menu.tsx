import { FunctionComponent, useContext, useState } from "react";
import { AppContext } from "../../context/app.context";
import { IFirstLevelMenuItem, IPageItem } from "../../interfaces/menu.interface";
import { ITopLevelCategory } from "../../interfaces/page.interface";
import BooksIcon from '../../assets/icons/books.svg'
import CoursesIcon from '../../assets/icons/courses.svg'
import ProductsIcon from '../../assets/icons/products.svg'
import ServicesIcon from '../../assets/icons/services.svg'
import styles from './Menu.module.css';
import cn from 'classnames';
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, useReducedMotion } from 'framer-motion';

interface MenuProps {

}

const firstLevelMenu: IFirstLevelMenuItem[] = [
    { id: ITopLevelCategory.Courses, name: 'Courses', icon: <CoursesIcon />, route: 'courses' },
    { id: ITopLevelCategory.Services, name: 'Services', icon: <ServicesIcon />, route: 'courses' },
    { id: ITopLevelCategory.Books, name: 'Books', icon: <BooksIcon />, route: 'courses' },
    { id: ITopLevelCategory.Products, name: 'Products', icon: <ProductsIcon />, route: 'courses' },
]

const Menu: FunctionComponent<MenuProps> = () => {
    const { menu, setMenu, firstCategory } = useContext(AppContext);
    const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>();
    const shouldReduceMotion = useReducedMotion();
    const router = useRouter();

    const variants = {
        visible: {
            marginBottom: 20,
            transition: shouldReduceMotion ? {} : {
                when: 'beforeChildren',
                staggerChildren: 0.1
            }
        },
        hidden: { marginBottom: 0 }
    };

    const variantsChildren = {
        visible: {
            opacity: 1,
            height: 29
        },
        hidden: { opacity: shouldReduceMotion ? 1 : 0, height: 0 }
    };

    const openSecondLevel = (secondCategory: string) => {
        setMenu && setMenu(menu.map(m => {
            console.log('click');
            if (m._id.secondCategory === secondCategory) {
                m.isOpened = !m.isOpened;
            }
            return m;
        }));
    };

    const buildFirstLevel = () => {
        return (
            <ul className={styles.firstLevelList}>
                {firstLevelMenu.map(m => (
                    <li key={m.route} aria-expanded={m.id == firstCategory}>
                        <Link href={`/${m.route}`}>
                            <a>
                                <div className={cn(styles.firstLevel, {
                                    [styles.firstLevelActive]: m.id == firstCategory
                                })}>
                                    {m.icon}
                                    <span>{m.name}</span>
                                </div>
                            </a>
                        </Link>
                        {m.id == firstCategory && buildSecondLevel(m)}
                    </li>
                ))}
            </ul>
        );
    };

    const buildSecondLevel = (menuItem: IFirstLevelMenuItem) => {
        return (
            <ul className={styles.secondBlock}>
                {menu.map(m => {
                    if (m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
                        m.isOpened = true;
                    }
                    return (
                        <li key={m._id.secondCategory}>
                            <button
                                className={styles.secondLevel}
                                onClick={() => openSecondLevel(m._id.secondCategory)}
                                aria-expanded={m.isOpened}
                            >{m._id.secondCategory}</button>
                            <motion.ul
                                layout
                                variants={variants}
                                initial={m.isOpened ? 'visible' : 'hidden'}
                                animate={m.isOpened ? 'visible' : 'hidden'}
                                className={styles.secondLevelBlock}
                            >
                                {buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
                            </motion.ul>
                        </li>
                    );
                })}
            </ul>
        );
    };

    const buildThirdLevel = (pages: IPageItem[], route: string, isOpened: boolean) => {
        return (
            pages.map(p => (
                <motion.li key={p._id} variants={variantsChildren}>
                    <Link href={`/${route}/${p.alias}`}>
                        <a
                            tabIndex={isOpened ? 0 : -1}
                            className={cn(styles.thirdLevel, {
                                [styles.thirdLevelActive]: `/${route}/${p.alias}` == router.asPath
                            })}
                            aria-current={`/${route}/${p.alias}` == router.asPath ? 'page' : false}
                        >
                            {p.category}
                        </a>
                    </Link>
                </motion.li>
            ))
        );
    };

    return (
        <nav className={styles.menu} role='navigation'>
            {announce && <span role="log" className="visualyHidden">{announce == 'opened' ? 'развернуто' : 'свернуто'}</span>}
            {buildFirstLevel()}
        </nav>
    );
}

export default Menu;