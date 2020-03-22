import ChatMessage from "./modules/ChatMessage.js";

const socket = io();

function setUserId({sID, message}) {
    vm.socketID = sID;
    console.log(message);
}

function runDisconnectMessage(packet) {
    console.log(packet);
    // vm.notification.push(user);
}

// function appendNewNotification(user) {
//     console.log(user);
//     // take the incoming update and push it into the Vue instance
//     vm.notification.push(user);
// }

function broadcastMessage(hello) {
    console.log('hello');
}

function appendNewMessage(msg) {
    // take the incoming message and push it into the Vue instance
    vm.messages.push(msg);
}

const vm = new Vue({
    data: {
        socketID: "", 
        messages: [],
        message: "",
        nickName: "",

        // classes truthy or falsy
        isHidden: false,
        isDesign: false,
        isDesignBg: false,
        isDesignBtn: false,
        isGeo: false,
        isGeoBg: false,
        isGeoBtn: false,
        isAlchemy: false,
        isAlchemyBg: false,
        isAlchemyBtn: false,

        notification: ""
    },

    methods: {
        dispatchMessage() {
            // emit a message event and send the message to the server
            console.log('handle send message');

            socket.emit('chat_message', {
                content: this.message || "no content",
                name: this.nickName || "anonymous",
                // || is called a double pipe operator or an "or" operator
                // if this.nickName is set, use it as the value
                // or just make name "anonymous"
            })

            this.message = "";
        },

        closeLB() {
            console.log ('close');
            this.isHidden = true;
        },

        setDesign() {
            console.log ('change to gloomy designer theme');
            this.isDesign = true;
            this.isDesignBg = true;
            this.isDesignBtn = true;
            this.isGeo = false;
            this.isGeoBg = false;
            this.isGeoBtn = false;
            this.isAlchemy = false;
            this.isAlchemyBg = false;
            this.isAlchemyBtn = false;

            this.notification = "Welcome to Gloomy Designer Chatroom";
        },

        setGeo() {
            console.log ('change to tokyo geometric theme');
            this.isDesign = false;
            this.isDesignBg = false;
            this.isDesignBtn = false;
            this.isGeo = true;
            this.isGeoBg = true;
            this.isGeoBtn = true;
            this.isAlchemy = false;
            this.isAlchemyBg = false;
            this.isAlchemyBtn = false;

            this.notification = "Welcome to Tokyo Geometric Chatroom";
        },
        
        setAlchemy() {
            console.log ('change to marmalade alchemy theme');
            this.isDesign = false;
            this.isDesignBg = false;
            this.isDesignBtn = false; 
            this.isGeo = false;
            this.isGeoBg = false;
            this.isGeoBtn = false;
            this.isAlchemy = false;
            this.isAlchemy = true;
            this.isAlchemyBg = true;
            this.isAlchemyBtn = true;

            this.notification = "Welcome to Marmalade Alchemy Chatroom";
        }
        
    },

    components: {
        newmessage: ChatMessage
    },

    mounted: function() {
        console.log('mounted');
    }
}).$mount("#app");

socket.addEventListener('connected', setUserId);
socket.addEventListener('user_disconnect', runDisconnectMessage);
socket.addEventListener('new_message', appendNewMessage);
// socket.addEventListener('notification', appendNewNotification);
socket.addEventListener('broadcast', broadcastMessage);