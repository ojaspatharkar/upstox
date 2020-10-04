let config = {}
config.historicApiUrl = "http://kaboom.rksv.net/api/historical?interval=1"
config.socketURL = "http://kaboom.rksv.net/watch"
config.historicChartOptions = {
    chart: {
        type: 'candlestick'
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