import { DetailedHTMLProps, FunctionComponent, HTMLAttributes, KeyboardEvent, useEffect, useState } from "react";
import StarIcon from '../../assets/star.svg';
import styles from './Rating.module.css';
import cn from 'classnames';

interface RatingProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    isEditable?: boolean;
    rating: number;
    setRating?: (rating: number) => void;
    // error?: FieldError;
    error?: any;
}

const Rating: FunctionComponent<RatingProps> = ({ isEditable, rating, setRating, error, ...props }) => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

    useEffect(() => {
        constructRating(rating)
    }, [rating])

    const constructRating = (currentRating: number) => {
        const updatedArray = ratingArray.map((el: JSX.Element, ind: number) => (
            <span
                className={cn(styles.star, {
                    [styles.filled]: ind < currentRating
                })}
                onClick={() => onClick(ind + 1)}
                onMouseEnter={() => changeDisplay(ind + 1)}
                onMouseLeave={() => changeDisplay(rating)}
            >
                <StarIcon
                // onKeyDown={(e: KeyboardEvent<SVGElement>) => isEditable && handleSpaceClick(e, ind + 1)}
                // tabIndex={isEditable ? 0 : -1}
                />
            </span>
        ));
        setRatingArray(updatedArray)
    };

    // const handleSpaceClick = (e: KeyboardEvent<SVGElement>, i: number) => {
    //     if (e.code !== 'Space' || !setRating) { return }
    //     setRating(i);
    // }

    const changeDisplay = (i: number): void => {
        if (isEditable) constructRating(i);
    };

    const onClick = (i: number): void => {
        if (!isEditable || !setRating) { return }
        setRating(i);
    }

    return (
        <div {...props}>
            {ratingArray.map((el, ind) => <span key={ind}>{el}</span>)}
        </div>
    );
}

export { Rating };