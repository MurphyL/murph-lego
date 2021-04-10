import Dynamic from 'utils/dynamic.utils.jsx';

import styles from './flex-line.v1.module.css';

const FlexLine = ({ children }) => {
    return (
        <div className={styles.root}>
            <Dynamic items={children} message="空行" />
        </div>
    );
};

export default FlexLine;