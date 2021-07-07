import { Fragment } from 'react';
import classnames from 'classnames';
import styles from './page.v1.module.css';

const PageView = ({ children, className, style }) => {
    return (
        <Fragment>
            <div className={classnames(styles.root, className)} style={style}>
                { children }
            </div>
        </Fragment>
    );
};

export default PageView;