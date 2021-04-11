import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { DndSource, DndTarget } from 'plug/dnd/dnd.module.jsx';

import styles from './editor.v1.module.css';

// fake data generator
const getItems = (count, offset = 0) => {
    return Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`
    }));
}

const Editor = () => {
    const items = getItems(10);
    const selected = getItems(5, 10);
    
    return (
        <DndProvider backend={HTML5Backend}>
            <div className={styles.root}>
                <div className={styles.source}>
                    {items.map((item, index) => (
                        <DndSource key={index}>
                            <span>{JSON.stringify(item)}</span>
                        </DndSource>
                    ))}
                </div>
                <DndTarget items={selected}/>
            </div>
        </DndProvider>
    );
}

export default Editor;