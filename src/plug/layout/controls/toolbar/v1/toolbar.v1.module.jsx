import React from 'react';
import group from 'lodash/groupBy';

import styles from './toolbar.v1.module.css';

const Toolbar = ({ _path, children }) => {
    const items = React.Children.toArray(children) || [];
    const { left, right } = group(items, ({ props }) => props.place || 'left');
    return (
        <div className={styles.root} data-path={_path}>
            <div className={styles.left}>
                {left}
            </div>
            <div className={styles.right}>
                {right}
            </div>
        </div>
    );
};

export default Toolbar;