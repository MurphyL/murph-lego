import { useContext, useReducer } from 'react';

// import remove from 'lodash/remove';
import pathGet from 'lodash/get';
import pathSet from 'lodash/set';
import debounce from 'lodash/debounce';
import uniqueId from 'lodash/uniqueId';

import JsonSchema from 'react-json-schema';

import { LegoView } from 'plug/extra/extra.plug';

import { DispatchContext } from 'plug/designer/designer.plug';

import styles from './designer.v2.module.css';

const createNode = (label, parent, index) => ({
    label, parent, index,
    component: 'TreeNode',
    children: []
});

const nn = (items) => items.filter(part => part !== undefined)

const reducer = (state, action) => {
    const { type, parent, index } = action;
    const path = (items) => [parent, index, ...items];
    const cpath = nn(path(['children'])).join('.');
    const getChildren = () => {
        return pathGet(state, cpath, [])
    };
    const setChildren = (value) => {
        return pathSet(state, cpath, value);
    };
    switch (type) {
        case 'add':
            const name = uniqueId('新组件');
            const children = parent ? getChildren() : state.children;
            const node = createNode(name, cpath, children.length);
            return {...setChildren([...children, node])};
        default:
            console.log('default');
            return state;
    }
};

const TreeNode = ({ label, children, parent, index }) => {
    const dispatch = useContext(DispatchContext);
    return (
        <div className={styles.node}>
            <div className={styles.header}>
                <span className={styles.label}>{label}</span>
                <div className={styles.toolbar}>
                    <button onClick={({ target }) => {
                        target.disabled = true;
                        dispatch({ type: 'add', parent: (parent ? parent : undefined), index });
                        debounce(() => {
                            target.disabled = false;
                        }, 100)();
                    }}>ADD</button>
                </div>
            </div>
            <div className={styles.children}>
                {children}
            </div>
        </div>
    );
};

const Designer = () => {
    const [state, dispatch] = useReducer(reducer, createNode('/ROOT'));
    const view = new JsonSchema();
    view.setComponentMap({ TreeNode });
    console.log('state: ', state);
    return (
        <LegoView className={styles.root} title="编辑器">
            <DispatchContext.Provider value={dispatch}>
                <div className={styles.tree}>
                    {view.parseSchema(state)}
                </div>
                <div className={styles.board}></div>
            </DispatchContext.Provider>
        </LegoView>
    );
};

export default Designer;