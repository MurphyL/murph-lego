import Dynamic from 'plug/designer/extra/dynamic/dynamic.module';

const Board = ({ children, ...extra }) => {
    return (
        <Dynamic {...extra}>
            {children}
        </Dynamic>
    );
};

export default Board;