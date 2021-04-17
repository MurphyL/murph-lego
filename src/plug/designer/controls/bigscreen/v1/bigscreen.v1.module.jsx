import Dynamic from 'plug/designer/extra/dynamic/dynamic.module';

const Bigscreen = () => {
    return (
        <Dynamic>
            <span>Bigscreen</span>
        </Dynamic>
    );
};

Bigscreen.definitions = {
    name: '大屏',
    leaf: false
};

export default Bigscreen;