import { useEffect, useRef } from 'react';

import { ajaxGet } from 'utils/async.utils.jsx';

import scriptjs from 'scriptjs';

const deps = [
    '/chart/engine/echarts/echarts.min.js'
];

const echartConfig = {
    height: 260,
    width: 300,
    renderer: 'svg'
};

const echartOption = {
    title: {
        text: '测试报表'
    },
    grid: {
        top: 45,
        right: 60,
        bottom: 30,
        left: 60
    }
};

const getChartOption = (data = [], chartType) => {
    const xAxis = [];
    const series = [];
    const legend = [];
    (data || []).forEach(({ label, items }, index) => {
        legend.push(label);
        const line = { name: label, type: chartType, data: [] };
        (items || []).forEach(({ label: xLabel, value }) => {
            if (index === 0) {
                xAxis.push(xLabel);
            }
            line.data.push(value);
        });
        series.push(line);
    });
    return Object.assign({
        xAxis: { data: xAxis }, yAxis: {}, series
    }, echartOption);
};

const EChartEngine = ({ config: userConfig, option: userOption }) => {
    const chartInstance = useRef(null);
    useEffect(() => {
        scriptjs(deps, () => {
            if (!chartInstance.current) {
                return;
            }
            const { init: createChart } = window.echarts;
            const { url, type: chartType } = userConfig;
            ajaxGet(url).then(({ payload = {} }) => {
                const config = Object.assign({}, userConfig, echartConfig);
                const chartObject = createChart(chartInstance.current, {}, config);
                chartObject.setOption(getChartOption(payload.data, chartType));
            });
        });
    }, [userConfig, userOption]);
    return (
        <div className="echart-engine" ref={chartInstance} />
    );
}

export default EChartEngine;