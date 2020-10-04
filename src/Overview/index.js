import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts'
import { makeAPICall, createStckData } from '../common';
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
            url: config.historicApiUrl
        }
        makeAPICall(prams, (data) => {
            let stocksData = []
            for (let item of data) {
                let stockObj = createStckData(item)
                if(stockObj){
                    stocksData.push(stockObj)
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
                    height={450} width={"100%"}
                />
            </div>
        )
    }
}

export default Overview;