import styles from './skeleton.module.css';

const Skeleton = ({ children, style }) => {
    return (
        <div className={styles.root} style={style}>{children}</div>
    );
};

export default Skeleton;