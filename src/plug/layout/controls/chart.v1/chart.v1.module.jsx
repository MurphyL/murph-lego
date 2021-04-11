import AntV_Engine from './engines/antv.engine.v1.module.jsx';
import EChartEngine from './engines/echart.engine.v1.module.jsx';

import styles from './chart.v1.module.css';

const engines = {
    'echart': EChartEngine,
    '@antv/g2': AntV_Engine
};

const Chart = ({ engine, style, config, option }) => {
    const ChartRenderer = engines[engine];
    if(!ChartRenderer) {
        return (
            <div className="not-found">暂无图表</div>
        );
    }
    return (
        <div className={styles.root} style={style}>
            <ChartRenderer config={config} option={option} engine={engine} />
        </div>
    );
};

export default Chart;