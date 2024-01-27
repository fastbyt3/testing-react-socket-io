import React, { useState, useEffect } from 'react';
import { socket } from './socket';
import logo from './logo.svg';
import './App.css';
import Events from './components/Events';
import TypeMessage from './components/TypeMessage';

const App = () => {
	const [data, setData] = useState(null);
	const [isConnected, setIsConnected] = useState(socket.connected);
	const [serverData, setServerData] = useState([]);

	useEffect(() => {
		fetch("/api/hi")
			.then((res) => res.json())
			.then((data) => setData(data.message));
	}, []);

	useEffect(() => {
		const onConnect = () => {
			setIsConnected(true);
		}

		const onDisconnect = () => {
			setIsConnected(false);
		}

		const onRecvServerData = (value) => {
			console.log('recvb from server: ', value);
			setServerData(previous => [...previous, value]);
		}

		socket.on('connect', onConnect);
		socket.on('disconnect', onDisconnect);
		socket.on('server', onRecvServerData);

		return () => {
			socket.off('connect', onConnect);
			socket.off('disconnect', onDisconnect);
			socket.off('server', onRecvServerData);
		};
	}, []);

	console.log(isConnected);

  return (
    <div className="App">
      <header className="App-header">
		<h1>Socket is {isConnected ? "connected" : "not connected :("}</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>
		<TypeMessage socket={socket} />
		<Events events={serverData} />
      </header>
    </div>
  );
}

export default App;
