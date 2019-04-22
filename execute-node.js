module.exports = function (RED) {
    this.isRequesting = false;

    var handle_error = function (err, node) {
        node.log(err.body);
        node.status({
            fill: "red",
            shape: "dot",
            text: err.message
        });
        node.error(err.message);
    };

    function FullcontactExecuteNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        node.host = RED.nodes.getNode(config.host);
        const got = require('got');
        node.client = got;
        node.on('input', function (msg) {
            node.status({
                fill: "blue",
                shape: "dot",
                text: `Check ${msg.payload}...`
            });

            // validation
            if (!msg.payload) {
                handle_error(new Error('No payload'), node);
                return false;
            }

            msg['_original'] = msg.payload;
            let apiUrl = `http://apilayer.net/api/check?access_key=${node.host.api_key}&email=${msg.payload}`;
            node.warn(`Calling: ${apiUrl}`);
            node.client.get(apiUrl)
                .then(function (res) {
                    node.status({
                        fill: "green",
                        shape: "dot",
                        text: `Success ${msg.payload} !`
                    });
                    msg.payload = JSON.parse(res.body);
                    node.send(msg);
                })
                .catch(function (err) {
                    // Email address could not be found
                    handle_error(err, node);
                    msg.payload = false;
                    node.send(msg);
                })
        });
    }
    RED.nodes.registerType("apilayer-execute", FullcontactExecuteNode);
};