import styles from './container.v1.module.css';

const Container = ({ _path, children, style }) => {
    return (
        <div className={styles.root} style={style} data-path={_path}>{ children }</div>
    );
};


export default Container;