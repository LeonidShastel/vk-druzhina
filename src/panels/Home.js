import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Icon16SearchOutline } from '@vkontakte/icons';

import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, Search } from '@vkontakte/vkui';

const showStudent = ()=>{

}

const Home = ({ id, go, fetchedUser }) => {
	const [room, setRoom] = useState('');

	const showStudent = ()=>{

	}

	return (
		<Panel id={id}>
			<PanelHeader>Выбор комнаты</PanelHeader>
			<Search
				value={room}
				onChange={e => setRoom(e.target.value)}
			/>
			<Button
				mode="outline"
				size="m"
				before={<Icon16SearchOutline/>}

				onClick={showStudent}
			>Поиск комнаты</Button>
		</Panel>
	);




	{/*{fetchedUser &&*/}
	{/*<Group header={<Header mode="secondary">User Data Fetched with VK Bridge</Header>}>*/}
	{/*	<Cell*/}
	{/*		before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}*/}
	{/*		description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}*/}
	{/*	>*/}
	{/*		{`${fetchedUser.first_name} ${fetchedUser.last_name}`}*/}
	{/*	</Cell>*/}
	{/*</Group>}*/}

	{/*<Group header={<Header mode="secondary">Navigation Example</Header>}>*/}
	{/*	<Div>*/}
	{/*		<Button stretched size="l" mode="secondary" onClick={go} data-to="persik">*/}
	{/*			Show me the Persik, please*/}
	{/*		</Button>*/}
	{/*	</Div>*/}
	{/*</Group>*/}
};

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Home;
