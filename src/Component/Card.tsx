import React, { ReactNode } from 'react';
import './Card.css';

type Props = {
    children?: React.ReactNode;
};
const Card = ({ children }: Props) => (
    <div className="CardContainer">
        {children}
    </div>
);
export default Card;