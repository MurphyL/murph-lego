import Dynamic from 'plug/designer/extra/dynamic/dynamic.module';

const Chart = () => {
    return (
        <Dynamic>
            <span>Chart</span>
        </Dynamic>
    );
};

Chart.definitions = {
    name: '可视化图表',
    leaf: true
};

export default Chart;