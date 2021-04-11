import { useReducer } from 'react';

import { Plus, Trash2 } from '@geist-ui/react-icons';

import styles from './designer.v1.module.css';

const initialState = { children: [] };

const reducer = (state, action) => {
    switch (action.type) {
        case 'add':
            return { children: [...state.children, {
                label: 'test',
                path: 'children'
            }] };
        default:
            throw new Error();
    }
}

const TreeNode = ({ label, unique, children, dispatch, path = '/' }) => {
    return (
        <div className={styles.node} data-unique={unique}>
            <div className={styles.label}>
                <span className={styles.text}>{label || '/ROOT'}</span>
                <span className={styles.suffix} onClick={() => dispatch({ type: 'add', path })}>
                    <Plus />
                </span>
            </div>
            <div className={styles.children}>
                {(children || []).map((item, index) => (
                    <TreeNode key={index} {...item} dispatch={dispatch} />
                ))}
            </div>
        </div>
    );
};


const Designer = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <div className={styles.root}>
            <div className={styles.tree}>
                <TreeNode {...state} dispatch={dispatch} />
            </div>
            <div className={styles.board}>
                <div className={styles.toolbar}>
                    <div className={styles.button}>
                        <Trash2 />
                    </div>
                </div>
                <div className={styles.content}>
                    <pre>
                        <code>{JSON.stringify(state, null, '  ')}</code>
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default Designer;