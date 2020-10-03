import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts'
import { makeAPICall } from '../common';
import config from '../config';

class Overview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stocksData : []
        }
    }

    componentDidMount() {
        this.getOHLCData();
    }

    getOHLCData() {
        let prams = {
            url: 'http://kaboom.rksv.net/api/historical?interval=1'
        }
        makeAPICall(prams, (data) => {
            let stocksData = []
            for (let item of data) {
                let stockData = item.split(",")
                if (stockData && stockData.length) {
                    stocksData.push({
                        x: new Date(+stockData[0]),
                        y: stockData.slice(1, 5)
                    })
                }
            }
            this.setState({ stocksData })
        });
    }


    render() {
        let {stocksData} = this.state
        return (
            <div>
                <ReactApexChart
                    options={config.historicChartOptions}
                    series={[{ data : stocksData }]}
                    type="candlestick"
                    height={350} width={1000}
                />
            </div>
        )
    }
}

export default Overview;