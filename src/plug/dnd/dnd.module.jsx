import { useDrag, useDrop } from 'react-dnd';

import styles from './dnd.module.css';

export const DndSource = ({ name, children }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'DndSource',
        item: { name: 1 },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
                console.log(item, dropResult);
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
    }));
    return (
        <div className={`${styles.source} ${styles.item} ${isDragging ? styles.dragging : ''}`} ref={drag}>
            <div>{children}</div>
        </div>
    );
};


export const DndTarget = ({ items }) => {
    const [source, drop] = useDrop(() => ({
        accept: 'DndSource',
        drop: () => ({ name: 'Dustbin' }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));
    console.log(source);
    return (
        <div  ref={drop}>
            {(items || []).map((item, index) => (
                <div key={index} className={`${styles.source} ${styles.item}`}>
                    <span>{JSON.stringify(item)}</span>
                </div>
            ))}
        </div>
    );
};