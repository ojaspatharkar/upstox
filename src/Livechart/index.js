import React, { Component } from 'react';
import SocketManager from '../SocketManager';
import { createStckData, makeAPICall } from '../common';
import ApexCharts from "apexcharts";
import config from '../config';

class Livechart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options : {
                chart: {
                    type: 'candlestick',
                    height: 450,
                    id:"realtime"
                },
                title: {
                    text: 'Live data',
                    align: 'center',
                    style: {
                        color: 'grey',
                        fontWeight: 'bold',
                        fontSize: 25
                    }
                },
                tooltip: {
                    enabled: true,
                    theme: 'dark'
                },
                markers:{
                    color:'red'
                },
                xaxis: {
                    type: 'datetime',
                    labels: {
                        style: {
                            colors: 'grey'
                        },
                        labels: {
                            format: 'hh : mm',
                        }
                    }
                },
                yaxis: {
                    min:0,
                    max:5000,
                    labels: {
                        style: {
                            colors: 'grey'
                        }
                    },
                    tooltip: {
                        enabled: true
                    }
                },
                series : [{ data : [] }],
            },
        }
        this.counter = 0
        this.firstData = null
        this.updateLiveData = this.updateLiveData.bind(this);
        this.errorHandler = this.errorHandler.bind(this);
        this.socketManager = new SocketManager(config.socketURL)
    }
    componentDidMount() {
        this.socketManager.subscribeToQuotes(this.updateLiveData, this.errorHandler);
        this.chart = new ApexCharts(
            document.querySelector("#chart"),
            this.state.options
          );
        this.chart.render();
        let liveData = localStorage['liveData']
        if(liveData){
            this.updateLiveData(JSON.parse(liveData).data)
        }
    }

    updateLiveData(liveData) {
        if(liveData){
            let data = createStckData(liveData)
            this.counter += 1
            this.chart.updateSeries([{data : [data]}])
            localStorage['liveData'] = JSON.stringify({data : liveData})
        }
        
    }

    errorHandler() {
        alert("Please try again later...")
    }

    componentWillUnmount() {
        this.socketManager.unsubscribeToQuotes()
        if (this.liveDataInterval) {
            clearInterval(this.liveDataInterval)
        }
    }


    render() {
        return (
            <div id="chart">
            </div>
        );
    }
}

export default Livechart;