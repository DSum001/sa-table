import { UsersInterface } from "../../interfaces/IUser";

import { SignInInterface } from "../../interfaces/SignIn";

import { TableInterface } from "../../interfaces/table";

import axios from "axios";

const apiUrl = "http://localhost:8000";

const Authorization = localStorage.getItem("token");

const Bearer = localStorage.getItem("token_type");


const requestOptions = {

    headers: {

    "Content-Type": "application/json",

    Authorization: `${Bearer} ${Authorization}`,

    },

};


async function SignIn(data: SignInInterface) {

    return await axios

    .post(`${apiUrl}/signin`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}


async function GetUsers() {

    return await axios

    .get(`${apiUrl}/employee`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}


async function GetUsersById(id: string) {

    return await axios

    .get(`${apiUrl}/employee/${id}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}


async function UpdateUsersById(id: string, data: UsersInterface) {

    return await axios

    .put(`${apiUrl}/employee/${id}`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}


async function DeleteUsersById(id: string) {

    return await axios

    .delete(`${apiUrl}/employee/${id}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}


async function CreateUser(data: UsersInterface) {

    return await axios

    .post(`${apiUrl}/signup`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function TablePage(data: TableInterface) {

    return await axios

    .post(`${apiUrl}/table`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function TableBooking(data: TableInterface) {

    return await axios

    .post(`${apiUrl}/table/booking`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function TableList(data: TableInterface) {

    return await axios

    .post(`${apiUrl}/table/table_list`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}


export {

    SignIn,

    GetUsers,

    GetUsersById,

    UpdateUsersById,

    DeleteUsersById,

    CreateUser,

    TablePage,

    TableBooking,

    TableList,

};