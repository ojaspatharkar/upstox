let config = {}
config.historicChartOptions = {
    chart: {
        type: 'candlestick',
        height: 350,
    },
    title: {
        text: 'Historic data',
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
    xaxis: {
        type: 'datetime',
        labels: {
            style: {
                colors: 'grey'
            }
        }
    },
    yaxis: {
        labels: {
            style: {
                colors: 'grey'
            }
        },
        tooltip: {
            enabled: true
        }
    }
}

export default config;