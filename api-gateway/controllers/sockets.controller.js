const { default: axios } = require("axios");
const services = require('../services.json');

module.exports = (http) => {
    const io = require("socket.io")(http, {
        cors: {
            origins: "https://carentz.stackroute.io:3000",
            methods: ["GET", "POST"],
            allowedHeaders: ["my-custom-header"],
            credentials: true
        },
        path: "/chatbot-service/socket.io"

    }

    )

    io.on("connection", socket => {
        console.log("Connected!!!")
        socket.on('send-chatbot-message', message => {
            var data = {
                message: message
            }
            axios.post(services['chatbot-service'].url + 'chatbot-message', data)
                .then(responses => {
                    io.emit("receive-chatbot-message", responses.data)
                })
                .catch(err => console.log(err))
        })

        socket.on('disconnect', () => {
            console.log("Disconnected!!!")
        })
    })
    return "success"
}