import React, {useEffect, useState} from 'react';
import { Icon16SearchOutline } from '@vkontakte/icons';

import {
	Panel,
	PanelHeader,
	Button,
	Search,
	ModalRoot, CellButton, Text, ScreenSpinner
} from '@vkontakte/vkui';
import Modal from "./Modal";
import {useFetching} from "../hooks/useFetching";
import DBConnect from "../API/DBConnect";
const MODAL_LIST_STUDENT = 'students'

const Home = ({ id, go, fetchedUser,setSelectedStudent, setPopout, ...props}) => {
	const [activeModel, setActiveModel] = useState(null);
	const [room, setRoom] = useState('');
	const [list,setList] = useState([]);

	useEffect(()=>{
		if(room){
			fetching();
		}
	},[]);

	const modal = (
		<ModalRoot
			activeModal={activeModel}
		>
			<Modal
				id={MODAL_LIST_STUDENT}
				onClose={()=>setActiveModel(null)}
				dynamicContentHeight
				room={room}
				list={list}
			>
				{list && room ? list.map(el=><CellButton key={el.ID} onClick={(e)=>{
					setSelectedStudent(el.NAME==='Свободно'?{}:el);
					go(e);
				}} data-to='edit'>{el.NAME}</CellButton>) : <Text weight='semibold' style={{padding: '2% 3%'}}>Введите номер комнаты</Text>}
			</Modal>
		</ModalRoot>
	)

	function createArray(students) {
		const rooms = [51,62,95,106,139,150,183,194];

		const result = [];
		result.length = rooms.indexOf(+room)===-1 ? 3:2;
		for (let i = 0; i<result.length; i++){
			result[i]={
				ID:-i,
				NAME:'Свободно'
			}
		}

		for(let i = 0; i<students.length; i++){
			result[i] = students[i];
		}
		setList(result);
	}

	const [fetching, loading, error] = useFetching(async ()=>{

		if(!room){
			setActiveModel(MODAL_LIST_STUDENT);
			return
		}
		setList(null);
		const response = await DBConnect.getInfoRoom('ROOM',room)
			.then(response=> {
				createArray(response.data);
				list.forEach(el=>console.log(el.NAME));
				setActiveModel(MODAL_LIST_STUDENT);
			});

	});

	const spinner = (loading ? <ScreenSpinner size='large' /> : '');

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
				onClick={()=>fetching()}
				data-to="student-list"
			>Поиск комнаты</Button>
			{spinner}
			{modal}
		</Panel>
	);
};

export default Home;
