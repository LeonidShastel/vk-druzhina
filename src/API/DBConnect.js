import axios from "axios";

export default class DBConnect {
    static url = 'https://cf90812.tmweb.ru/';
    static async getInfoRoom(method, num){
        const response = await axios.get(this.url+'room.php?'+method+'='+num);
        return response;
    }
    static async setInfoStudent(student){
        const response = await axios.post(this.url+'edit_student.php',student);
        return response;
    }
}