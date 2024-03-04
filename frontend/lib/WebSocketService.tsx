import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let stompClient: Client | null = null;

export const isConnected = () => {
	return stompClient !== null && stompClient.connected;
};

export const disconnect = () => {
	if (isConnected()) {
		stompClient?.deactivate();
	}
};

const connect = (artisanId: string, onMessageReceived: (msg: any) => void) => {
	// Create a new Client instance with the SockJS endpoint
	stompClient = new Client({
		webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
		// Configure the onConnect callback
		onConnect: () => {
			if (stompClient) {
				stompClient.subscribe(`/topic/public`, (message) => {
					if (onMessageReceived) {
						onMessageReceived(JSON.parse(message.body));
					}
				});
			}
		},
	});

	// Activate the client to establish the connection
	stompClient.activate();
};

const sendMessage = (msg: any) => {
	if (stompClient && stompClient.connected) {
		stompClient.publish({
			destination: "/api/chat.sendMessage",
			body: JSON.stringify(msg),
		});
	} else {
		console.error("stompClient is not connected.");
	}
};

export { connect, sendMessage };
