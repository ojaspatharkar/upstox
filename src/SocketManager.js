import openSocket from 'socket.io-client';

class SocketManager {
    constructor(url) {
        this.socket = openSocket(url);
        this.interval = null;
        this.socket.on('connect', () => {
            console.log("Connected")
        })
        this.socket.on('disconnect', () => {
            alert("Disconnected from server")
        })
    }
    subscribeToQuotes(successCallback, erorCallback) {
        try {
            this.socket.emit('sub', { state: true })

            this.socket.on("data", (resp, acnknwledge) => {
                if (successCallback) {
                    successCallback(resp)
                }
                this.interval = setInterval(() => {
                    acnknwledge(1);
                }, 500)
            })

            this.socket.on("error", (resp) => {
                if (erorCallback) {
                    erorCallback(resp)
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    unsubscribeToQuotes() {
        this.socket.emit('unsub', { state: false })
        if(this.interval){
            clearInterval(this.interval)
        }
    }

}

export default SocketManager;