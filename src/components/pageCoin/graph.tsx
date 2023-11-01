'use client'
import ICoin from '@/interfaces/Coin.interface';
import styles from './coin.module.scss';
import { useCallback, useEffect, useMemo, useState } from 'react';
import IChartData from '@/interfaces/IChartData';
// @ts-ignore
import CanvasJSReact from '@canvasjs/react-charts';
import { useCoinGraph } from '@/hooks/useCoinGraph';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Graph({ coin }: { coin: ICoin }) {
    const [period, setPeriod] = useState('week');

    const { isLoading, data: response, error, isSuccess, isError } = useCoinGraph(coin.id, period);

    const [dataPoints, setDataPoints] = useState<IChartData[]>([]);
    const [chartCV, setChartCV] = useState<any>();


    useEffect(() => {
        if (isSuccess) {
            if (chartCV)
                drawChart(chartCV);
        }
    }, [response])

    const drawChart = (chartCV: any) => {
        var chart = chartCV;
        let dataPointsTemp: IChartData[] = [];
        for (var i = 0; i < response?.data.data.length; i++) {
            dataPointsTemp.push({
                x: new Date(response?.data.data[i].time),
                y: Number(response?.data.data[i].priceUsd) < 0.1
                    ? Number(parseFloat(Number(response?.data.data[i].priceUsd).toPrecision(3)))
                    : Number(Number(response?.data.data[i].priceUsd).toFixed(3))
            });
        }
        if (chart) {
            setDataPoints(dataPointsTemp);
            chart.render();
        }
    }

    return (

        <div className={styles.wrapper_right}>
            {
                !isLoading &&
                <>
                    <div className={styles.wrapper_buttons}>
                        <button onClick={() => setPeriod('day')}>Day</button>
                        <button onClick={() => setPeriod('week')}>Week</button>
                        <button onClick={() => setPeriod('month')}>Month</button>
                    </div>
                    <div>
                        <CanvasJSChart
                            options={{
                                theme: "light2",
                                title: {
                                    text: "Price " + coin.symbol + ' ('+period+ ')'
                                },
                                data: [{
                                    type: "line",
                                    toolTipContent: "{x}<hr/>Price: {y}$",
                                    // xValueFormatString: "DD MMM",
                                    // yValueFormatString: "$",
                                    dataPoints: dataPoints
                                }]
                            }}
                            onRef={(ref: any) => { setChartCV(ref); drawChart(ref) }}
                        />
                    </div>
                </>

            }
        </div>
    );
}

export default Graph;