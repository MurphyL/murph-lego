import { Router } from "wouter";

import classNames from 'classnames';
import styles from './app.v1.module.css';

export const Application = ({ children, className, ...extra }) => {
    return (
        <div className={classNames(styles.root, className)} {...extra}>
            {children}
        </div>
    );
};

export const SinglePageApplication = (props) => {
    return (
        <Router>
            <Application {...props} />
        </Router>
    );
};