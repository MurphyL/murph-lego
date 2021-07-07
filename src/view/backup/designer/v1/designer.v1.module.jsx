import { useReducer } from 'react';

import JsonSchema from 'react-json-schema';

import { LegoView } from 'plug/extra/extra.plug';

import { DispatchContext, schemaComponents } from 'plug/designer/designer.plug';

import styles from './designer.v1.module.css';

const defaultSchema = {
    component: 'Board',
    children: [],
    appendable: [
        'Bigscreen',
        'Chart'
    ]
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'add':
            if (action.parent) {

            } else {
                return { 
                    ...state, 
                    children: [ 
                        ...state.children, {
                        component: 'Bigscreen',
                        text: 'Hello',
                        ts: Date.now()
                    }
                ]};
            }
            break;
        case 'change': 
            console.log(action);
            if (action.parent) {

            } else {
                return { ...state, root: action.target };
            }
            break;
        default:
            console.log(state, action);
    }
    return state;
};

const Designer = () => {
    const [state, dispatch] = useReducer(reducer, defaultSchema);
    const view = new JsonSchema();
    view.setComponentMap(schemaComponents);
    console.log(state);
    return (
        <LegoView className={styles.root} title="编辑器">
            <DispatchContext.Provider value={dispatch}>
                {view.parseSchema(state)}
            </DispatchContext.Provider>
        </LegoView>
    );
};

export default Designer;