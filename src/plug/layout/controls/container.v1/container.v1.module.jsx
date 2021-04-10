import styles from './container.v1.module.css';

const Container = ({ children, style }) => {
    return (
        <div className={styles.root} style={style}>{ children }</div>
    );
};


export default Container;