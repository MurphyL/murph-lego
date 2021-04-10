import styles from './form.v1.module.css';

const Form = ({ children }) => {
    return (
        <form className={styles.root}>
            { children }
        </form>
    );
};

export const FormControl = ({ label }) => {
    return (
        <label className={styles.field}>
            <span className={styles.label}>{ label || '未命名字段' }</span>
            <input type="text"/>
        </label>
    );
};

export default Form;