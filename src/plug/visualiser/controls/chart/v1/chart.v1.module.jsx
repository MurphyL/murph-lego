import { useEffect, useRef } from 'react';

import { Chart as G2Chart } from '@antv/g2';

import { AsyncModule } from 'plug/extra/extra.plug';

import styles from './chart.v1.module.css';

const charts = {
    bar: 'interval',
    line: 'line',
    pie: 'interval'
};

const ChartInstance = ({ type, option, width, height, x: chartConfig, ...config }) => {
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
        chartInstance.data(option || []);
        // 轴向
        const position = chartConfig.axis.join('*');
        // 数据构造
        const chartObject = chartInstance[charts[type]]().position(position);
        switch (type) {
            case 'line':
                // 折线平滑
                chartConfig.smooth !== false && chartObject.shape('smooth');
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
        chartConfig.group && chartObject.color(chartConfig.group, (config.color));
        // 扩展
        chartConfig.extra && ((extraItems) => {
            (extraItems || []).forEach(([extra, ...more]) => {
                // 标记
                if (extra === 'mark' && type === 'line') {
                    const [markType = "circle"] = more;
                    // 显示标记
                    const marks = chartInstance.point().position(position).shape(markType);
                    // 着色
                    chartConfig.group && marks.color(chartConfig.group, (chartConfig.color));
                }
                // 面积图
                if (extra === 'area' && type === 'line') {
                    chartInstance.area().position(position);
                }
            });
        })(chartConfig.extra);
        // 渲染图标
        chartInstance.render();
        return () => {
            // 销毁图表
            chartInstance.destroy();
        }
    });
    return (
        <div className="lego-chart-wrapper" data-chart-type={type} data-engine="@antv/g2" ref={chartTarget} />
    );
}

const AsyncChart = ({ _path, style, chart, config: userConfig, data:datasource }) => {
    const { type, ...extra } = (chart || {});
    return (
        <div className={styles.root} style={style} data-module-unique={_path} data-source={datasource}>
            <AsyncModule fetch={datasource}>
                {(data) => (
                    <ChartInstance type={type} option={data} {...userConfig} x={extra}/>
                )}
            </AsyncModule>
        </div>
    );
};

export default AsyncChart;