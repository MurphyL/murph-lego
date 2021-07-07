import classNames  from 'classnames';

import styles from './flex.v1.module.css';

export const Flexbox = ({ children }) => {
    return (
        <div className="flexbox">
            { children }
        </div>
    );
};

export const FlexItem = ({ children, flexSize = 1 }) => {
    return (
        <div className={styles['flex-item']} style={{ "--flex-item-size": flexSize }}>
            { children }
        </div>
    );
};