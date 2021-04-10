import { useEffect, useRef, useState } from 'react';

import scriptjs from 'scriptjs';

import { ajaxGet } from 'utils/async.utils.jsx';

const deps = [
    '/chart/engine/antv/g2/g2.min.js'
];

const chartConfig = {
    height: 260,
    width: 300,
    renderer: 'svg'
};

const chartOption = {
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

const data = [
    { year: '1951 年', sales: 38 },
    { year: '1952 年', sales: 52 },
    { year: '1956 年', sales: 61 },
    { year: '1957 年', sales: 145 },
    { year: '1958 年', sales: 48 },
    { year: '1959 年', sales: 38 },
    { year: '1960 年', sales: 38 },
    { year: '1962 年', sales: 38 },
];

const AntVEngine = ({ config: userConfig, option: userOption }) => {
    const chartRef = useRef(null);
    const [ chartInstance, setChartInstance ] = useState(null);
    useEffect(() => {
        scriptjs(deps, () => {
            if (chartInstance || !chartRef.current) {
                return;
            }
            ajaxGet(userConfig.url).then(({ payload = {} }) => {
                console.log('@antv/g2: ', payload);
            });
            const config = Object.assign({}, userConfig, chartConfig);
            // const option = Object.assign({}, userOption, chartOption);
            const { Chart: G2Chart } = window.G2;
            const instance = new G2Chart({
                ...config,
                autoFit: true,
                container: chartRef.current,
                padding: [20, 20, 30, 20]
            });
            instance.data(data);
            instance.scale('sales', {
                nice: true,
            });
            instance.interval().position('year*sales');
            instance.render();
            setChartInstance(instance);
        });
    }, [chartInstance, userConfig, userOption])
    console.log(chartOption);
    return (
        <div className="antv-engine" ref={chartRef} />
    );
}

export default AntVEngine;