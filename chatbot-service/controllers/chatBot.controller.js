
exports.chatbot = (req, res) => {
    var message = req.body.message;
    message = message.toLowerCase();
            if(message === 'how to book a car?') {
                var data = '***Steps to book a cars :***  \n 1.Register as a **Client** \n 2.Select location and date range in Home page \n 3.Select suitable Car.\n 4. Book the car in detail page.';

                return res.send(data)
            }
            else if(message === 'how to add my car?') {
                var data = '***Steps to add your cars :***  \n 1.Register as a **Vendor** \n 2.Add your Address\n 3.Upload your cars details';

                return res.send(data)

            }
            else if(message.includes("sign")) {
                return res.send("receive-chatbot-message","click Login / Sign Up button, \n It's available at top right corner.")


            }
            else {
                return res.send(null)
            }
}