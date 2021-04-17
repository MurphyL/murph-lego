import React, { useContext } from 'react';
import { DispatchContext } from '../../designer.plug';

import styles from './dynamic.module.css';

const Dynamic = ({ appendable, title, component, children, parent, ...extra }) => {
    const dispatch = useContext(DispatchContext);
    const changeComponent = (target) => dispatch({ type: 'change', target, parent });
    return (
        <div className={styles.root} {...extra}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <span>{title || '未命名组件'}</span>
                </div>
                <div className={styles.toolbar}>
                    <select name="component-selecter" onChange={({target}) => changeComponent(target.value) }>
                        {(appendable || []).map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>
                    <button onClick={() => dispatch({type: 'add'})}>添加子组件</button>
                </div>
            </div>
            <div className={styles.body}>
                {children}
            </div>
        </div>
    );
};

export default Dynamic;