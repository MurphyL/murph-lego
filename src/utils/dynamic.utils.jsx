import React from 'react';


const Dynamic = ({ items, message }) => {
    if (React.Children.count(items)) {
        return items;
    }
    return (
        <div>{message || '空元素'}</div>
    );
};

export default Dynamic;