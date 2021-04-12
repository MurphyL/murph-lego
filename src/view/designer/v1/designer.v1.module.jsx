import { useReducer } from 'react';

import clone from 'lodash/cloneDeep';
import isNil from 'lodash/isNil';
import pathGet from 'lodash/get';
import pathSet from 'lodash/set';

import { Plus, Trash2 } from '@geist-ui/react-icons';

import styles from './designer.v1.module.css';

const initialState = { children: [] };

const reducer = (state, action) => {
    const { type, parent } = action;
    switch (type) {
        case 'add':
            const path = [parent, 'children'].filter(o => !isNil(o));
            const children = pathGet(state, path, []);
            if (!Array.isArray(children)) {
                return;
            }
            children.push({ label: 'test', parent: path.join('.') });
            return pathSet(clone(state), path, children);
        default:
            throw new Error();
    }
}

const TreeNode = ({ label, unique, children, dispatch, parent, index }) => {
    return (
        <div className={styles.node} data-unique={unique}>
            <div className={styles.label}>
                <span className={styles.text}>{label || '/ROOT'}</span>
                <span className={styles.suffix} onClick={() => dispatch({ type: 'add', parent, index })}>
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