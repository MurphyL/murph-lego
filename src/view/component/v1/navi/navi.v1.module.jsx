import classnames from 'classnames';
import styles from './navi.v1.module.css';

export const SideNavi = ({ className }) => {
    return (
        <div className={classnames(styles.root, className)}>
            {children}
        </div>
    );
};

export const SideNavBoard = ({ className, children }) => {
    return (
        <div className={classnames(styles.root, className)}>{children}</div>
    );
};