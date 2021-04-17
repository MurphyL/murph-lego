import { useEffect, useRef } from 'react';

export { default as Skeleton } from './skeleton/skeleton.module.jsx';

export { default as AsyncModule } from './async-module/async-module.module.jsx';

export const LegoView = ({title, children, ...extra}) => {
    useEffect(() => {
        const appTitle = (process.env.REACT_APP_TITLE || '').trim();
        document.title = title + ' - ' + (appTitle.length ? appTitle : '未命名页面');
        return () => {
            document.title = appTitle || '未命名页面';
        }
    }, [ title ]);
    return (
        <div {...extra}>{children}</div>
    );
};

export const Hoverable = ({ children, ...extra }) => {
    const domRef = useRef(null);
    const events = {
        onMouseEnter: () => { domRef.current.classList.add('current') },
        onMouseLeave: () => { domRef.current.classList.remove('current') },
    };
    return (
        <div {...extra} {...events} ref={domRef}>
            {children}
        </div>
    );
};