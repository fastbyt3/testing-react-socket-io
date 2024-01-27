import React from 'react';

const TypeMessage = ({ socket }) => {
	const onSubmit = (e) => {
		e.preventDefault();
		const input = document.getElementById('input');
		if (input.value) {
			socket.emit('chat', input.value);
			input.value = '';
		}
	};

	return (
		<form onSubmit={(e) => onSubmit(e)}>
			<input id="input" />
			<button type="submit">Send</button>
		</form>
	);
};

export default TypeMessage;
