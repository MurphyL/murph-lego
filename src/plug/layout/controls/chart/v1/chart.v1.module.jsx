import { useEffect, useRef } from 'react';

import { Chart as G2Chart } from '@antv/g2';

import { AsyncModule } from 'plug/extra/extra.plug';

import styles from './chart.v1.module.css';

const charts = {
    bar: 'interval',
    line: 'line',
    pie: 'interval'
};

const ChartInstance = ({ type, axis, option, width, height, ...config }) => {
    const chartTarget = useRef(null);
    useEffect(() => {
        if (!chartTarget) {
            return;
        }
        if (!charts[type]) {
            console.log('没有支持的图表类型');
            return;
        }
        // 实例初始化
        const chartInstance = new G2Chart({
            container: chartTarget.current,
            autoFit: true,
            height,
            width,
            syncViewPadding: true,
        });
        // 加载数据
        chartInstance.data(option.data || []);
        // 轴向
        const position = axis.join('*');
        // 数据构造
        const chartObject = chartInstance[charts[type]]().position(position);
        switch (type) {
            case 'line':
                // 折线平滑
                config.smooth !== false && chartObject.shape('smooth');
                break;
            case 'bar':
                break;
            case 'pie':
                chartInstance.coordinate('theta', { radius: 0.75 });
                break;
            default:
                console.error('暂不支持的图表类型');
        }
        if (type !== 'line') {
            // 调整数据
            chartObject.adjust('stack');
        }
        // 支持多折线
        config.group && chartObject.color(config.group, (config.color));
        // 扩展
        config.extra && ((extraItems) => {
            (extraItems || []).forEach(([extra, ...more]) => {
                if (extra === 'mark' && type === 'line') {
                    const [markType = "circle"] = more;
                    const marks = chartInstance.point().position(position).shape(markType);
                    config.group && marks.color(config.group, (config.color));
                }
                if (extra === 'area' && type === 'line') {
                    chartInstance.area().position(position);
                }
            });
        })(config.extra);
        // 渲染图标
        chartInstance.render();
        return () => {
            // 销毁图表
            chartInstance.destroy();
        }
    });
    return (
        <div className="lego-chart-wrapper" ref={chartTarget} />
    );
}

const AsyncChart = ({ _path, style, config: userConfig, request }) => {
    const { type, ...extra } = (userConfig || {});
    return (
        <div className={styles.root} style={style} data-path={_path}>
            <AsyncModule promise={request}>
                {(data) => (
                    <ChartInstance type={type} option={data} {...extra} />
                )}
            </AsyncModule>
        </div>
    );
};

export default AsyncChart;