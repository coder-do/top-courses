import type { GetStaticProps, NextPage } from 'next';
import { useState } from 'react';
import { Button, HTag, Paragraph, Tag, Rating } from '../components';
import { withLayout } from '../layout/Layout';
import axios from 'axios';
import { IMenuItem } from '../interfaces/menu.interface';

interface HomeProps {
    menu: IMenuItem[],
    firstCategory: number
}

const Home: NextPage<HomeProps> = ({ menu, firstCategory }) => {
    const [t, setT] = useState(4);
    return (
        <>
            <HTag tag='h1'>
                some header
            </HTag>
            <Button color='ghost' position='right'>
                dfghjds
            </Button>
            <Paragraph size='s'>
                paragrajhfsd
            </Paragraph>
            <Tag size='m' color='green'>
                Design
            </Tag>
            <Rating
                rating={t}
                isEditable
                setRating={setT}
            />
            <Rating
                rating={4}
            />
            {
                menu.map(el => <li key={el._id.secondCategory}>{el._id.secondCategory}</li>)
            }
        </>
    );
};

export default withLayout(Home);


export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const firstCategory = 0;
    const { data: menu } = await axios.post<IMenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', { firstCategory });
    return {
        props: {
            menu,
            firstCategory
        }
    }
}