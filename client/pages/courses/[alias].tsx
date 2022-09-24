import type { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next';
import { useState } from 'react';
import { Button, HTag, Paragraph, Tag, Rating } from '../../components';
import { withLayout } from '../../layout/Layout';
import axios from 'axios';
import { IMenuItem } from '../../interfaces/menu.interface';
import { ITopPageModel } from '../../interfaces/page.interface';
import { ParsedUrlQuery } from 'querystring';
import { IProductModel } from '../../interfaces/product.interface';

interface CourseProps {
    menu: IMenuItem[],
    page: ITopPageModel,
    products: IProductModel[],
    firstCategory: number
}

const Course: NextPage<CourseProps> = ({ menu, page, products, firstCategory }) => {
    return (
        <>
            {products && products.length}
        </>
    );
};

export default withLayout(Course);

export const getStaticPaths: GetStaticPaths = async () => {
    const firstCategory = 0;
    const { data: menu } = await axios.post<IMenuItem[]>(
        process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
        { firstCategory }
    );

    return {
        paths: menu.flatMap(m => m.pages.map(p => '/courses/' + p.alias)),
        fallback: true
    }
}

export const getStaticProps: GetStaticProps<CourseProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
    if (!params) { return { notFound: true } }
    const firstCategory = 0;
    const { data: menu } = await axios.post<IMenuItem[]>(
        process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
        { firstCategory }
    );
    const { data: page } = await axios.get<ITopPageModel>(
        process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/byAlias/' + params.alias
    );
    const { data: products } = await axios.post<IProductModel[]>(
        process.env.NEXT_PUBLIC_DOMAIN + '/api/product/find/',
        {
            category: page.category,
            limit: 10
        }
    );
    return {
        props: {
            menu,
            page,
            products,
            firstCategory
        }
    }
}
