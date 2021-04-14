import Dynamic from 'utils/dynamic.utils.jsx';

import styles from './bigscreen.v1.module.css';

const Bigscreen = ({ children }) => {
    return (
        <div className={styles.root}>
            <Dynamic items={children} message="暂无图表" />
        </div>
    );
};
export default Bigscreen;