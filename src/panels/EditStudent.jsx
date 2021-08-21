import React, {useEffect, useState} from 'react';
import {
    DatePicker,
    FormItem,
    Group,
    Input,
    NativeSelect,
    Panel,
    PanelHeader,
    PanelHeaderBack,
    Checkbox,
    Textarea, Button, ModalRoot, ModalPage, ScreenSpinner, Text, Slider, SliderSwitch
} from "@vkontakte/vkui";
import { Icon16CheckCircleOutline } from '@vkontakte/icons';
import {useFetching} from "../hooks/useFetching";
import DBConnect from "../API/DBConnect";

const EditStudent = ({student,setSelectedStudent,go,...props}) => {

    const [fetchingPost, loadingPost, errorPost] = useFetching(async ()=>{
        await  DBConnect.setInfoStudent(student);
    })

    const sending = (
        <div style={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
        }}>
            <Text weight='semibold'>Отправка</Text>
            <ScreenSpinner size='large' /> : ''
        </div>
    )

    useEffect(()=>{

        if(!Object.keys(student).length){
            setSelectedStudent({
                ID: 0,
                ROOM: "",
                NAME: "",
                GENDER: "MALE",
                PHONE_NUMBER: "",
                FACULTY: "",
                GROUP_ID: "",
                PRIVILEGIES: "",
                DATE_BIRTH: "1990-1-1",
                HOBBIES: "",
                HOME_ADRESS: "",
                HOME_NUMBER: "",
                BRSM: "0",
                TRADE_UNION: "0",
                WORKING: "0",
                EDUCATION_TYPE: "1",
                MOTHER_INFO: "",
                MOTHER_NUMBER: "",
                FATHER_INFO: "",
                FATHER_NUMBER: "",
                HOUR_WORKING: "0",
                PAID_MONTH: "0"
            })
        }
    },[])

    const form = ()=> (
        <Group>
            <FormItem top='ФИО'>
                <Input type='text' value={student.NAME} onChange={(e)=>setSelectedStudent({...student, NAME: e.target.value})}/>
            </FormItem>
            <FormItem top='Номер телефона'>
                <Input type='text' value={student.PHONE_NUMBER} onChange={(e)=>setSelectedStudent({...student, PHONE_NUMBER: e.target.value})}/>
            </FormItem>
            <FormItem top='Номер комнаты'>
                <Input type='text' value={student.ROOM} onChange={(e)=>setSelectedStudent({...student, ROOM: e.target.value})}/>
            </FormItem>
            <FormItem top='Факультет'>
                <NativeSelect value={student.FACULTY ? student.FACULTY : 'ФилФак'} onChange={e=>setSelectedStudent({...student, FACULTY:e.target.value})}>
                    <option value="ФилФак">ФилФак</option>
                    <option value="ИстФак">ИстФак</option>
                    <option value="ФЭО">ФЭО</option>
                    <option value="ФНО">ФНО</option>
                    <option value="ЕстФак">ЕстФак</option>
                    <option value="ФДО">ФДО</option>
                    <option value="ФСПТ">ФСПТ</option>
                    <option value="ФФВ">ФФВ</option>
                    <option value="ФМФ">ФМФ</option>
                    <option value="ИП">ИП</option>
                    <option value="ИИО">ИИО</option>
                </NativeSelect>
            </FormItem>
            <FormItem top='Номер группы'>
                <Input type='text' value={student.GROUP_ID} onChange={(e)=>setSelectedStudent({...student, GROUP_ID: e.target.value})}/>
            </FormItem>
            <FormItem top="Пол">
                <SliderSwitch
                    activeValue={student.GENDER ? student.GENDER : 'MALE'}
                    onSwitch={value => setSelectedStudent({...student,GENDER: value})}
                    options={[
                        {
                            name: 'Мужской',
                            value: 'MALE',
                        },
                        {
                            name: 'Женский',
                            value: 'FEMALE',
                        },
                    ]}
                />
            </FormItem>
            <FormItem top='Льготы'>
                <Input type='text' value={student.PRIVILEGIES} onChange={(e)=>setSelectedStudent({...student, PRIVILEGIES: e.target.value})}/>
            </FormItem>
            <FormItem top='Дата рождения'>
                <DatePicker
                    min={{day: 1, month: 1, year: 1960}}
                    defaultValue={{
                        day: +student.DATE_BIRTH.split('-')[2],
                        month: +student.DATE_BIRTH.split('-')[1],
                        year: +student.DATE_BIRTH.split('-')[0]}}
                    onDateChange={(value)=>setSelectedStudent({...student, DATE_BIRTH: `${value.year}-${value.month}-${value.day}`})}/>
            </FormItem>
            <FormItem>
                <Checkbox checked={+student.BRSM} onChange={e=>setSelectedStudent({...student, BRSM: +e.target.checked})}>БРСМ</Checkbox>
                <Checkbox checked={+student.TRADE_UNION} onChange={e=>setSelectedStudent({...student, TRADE_UNION: +e.target.checked})}>Профсоюз</Checkbox>
                <Checkbox checked={+student.WORKING} onChange={e=>setSelectedStudent({...student, WORKING: +e.target.checked})}>Работает</Checkbox>
            </FormItem>
            <FormItem top='Форма обучения'>
                <NativeSelect value={student.EDUCATION_TYPE} onChange={e=>setSelectedStudent({...student, EDUCATION_TYPE:e.target.value})}>
                    <option value="1">Бесплатная</option>
                    <option value="0">Платная</option>
                </NativeSelect>
            </FormItem>
            <FormItem top='Увлечения'>
                <Input type='text' value={student.HOBBIES} onChange={e=>setSelectedStudent({...student, HOBBIES:e.target.value})}/>
            </FormItem>
            <FormItem top='Домашний адрес'>
                <Textarea defaultValue={student.HOME_ADRESS} onChange={e=>setSelectedStudent({...student, HOME_ADRESS:e.target.value})}/>
            </FormItem>
            <FormItem top='Домашний телефон'>
                <Input type='text' value={student.HOME_NUMBER} onChange={e=>setSelectedStudent({...student, HOME_NUMBER:e.target.value})}/>
            </FormItem>
            <FormItem top='Информация об отце'>
                <Textarea defaultValue={student.FATHER_INFO} onChange={e=>setSelectedStudent({...student, FATHER_INFO:e.target.value})}/>
            </FormItem>
            <FormItem top='Телефон отца'>
                <Input type='text' value={student.FATHER_NUMBER} onChange={e=>setSelectedStudent({...student, FATHER_NUMBER:e.target.value})}/>
            </FormItem>
            <FormItem top='Информация об матери'>
                <Textarea defaultValue={student.MOTHER_INFO} onChange={e=>setSelectedStudent({...student, MOTHER_INFO:e.target.value})}/>
            </FormItem>
            <FormItem top='Телефон матери'>
                <Input type='text' value={student.MOTHER_NUMBER} onChange={e=>setSelectedStudent({...student, MOTHER_NUMBER:e.target.value})}/>
            </FormItem>
            <FormItem top={`Отработано ${student.HOUR_WORKING} часов`}>
                <Slider
                    step={1}
                    min={0}
                    max={10}
                    value={+student.HOUR_WORKING}
                    onChange={value => setSelectedStudent({...student,HOUR_WORKING: value})}
                />
            </FormItem>
            <FormItem top={`Оплачено ${student.PAID_MONTH} месяцев`}>
                <Slider
                    step={1}
                    min={0}
                    max={10}
                    value={+student.PAID_MONTH}
                    onChange={value => setSelectedStudent({...student,PAID_MONTH: value})}
                />
            </FormItem>
        </Group>
    )

    return (
        <Panel id='edit'>
            <PanelHeader
                left={<PanelHeaderBack onClick={go} data-to="home"/>}
            >
                {student.NAME ? student.NAME : 'Свободное место'}
            </PanelHeader>
            {
                loadingPost ? sending :
                Object.keys(student).length ? form() : ''
            }
            <Button
                mode="outline"
                size="m"
                before={<Icon16CheckCircleOutline/>}
                onClick={(e)=>{
                    fetchingPost();
                    go(e)
                }}
                data-to='home'
            >Сохранить информацию</Button>
        </Panel>
    );
};

export default EditStudent;