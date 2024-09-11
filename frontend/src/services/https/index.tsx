import { UsersInterface } from "../../interfaces/IUser";
import { SignInInterface } from "../../interfaces/SignIn";
import { TableInterface } from "../../interfaces/Table";
import { BookingInterface } from "../../interfaces/Booking";
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

async function GetBooking() {

    return await axios
    .get(`${apiUrl}/booking`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);

}

//Create Booking table
async function CreateBooking(data: BookingInterface) {
    return await axios
    .post(`${apiUrl}/booking`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetTables() {
    return await axios
    .get(`${apiUrl}/tables`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
    
}

async function GetTableCapacity() {
    return await axios
    .get(`${apiUrl}/table_capacity`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);

}

async function GetTableStatus() {
    return await axios
    .get(`${apiUrl}/table_status`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);

}

async function GetSoups() {
    return await axios
    .get(`${apiUrl}/soups`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);

}

async function GetPackages() {
    return await axios
    .get(`${apiUrl}/packages`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
    
}

async function TablePage(data: TableInterface) {
    return await axios
    .post(`${apiUrl}/table`, data, requestOptions)
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
    GetTables,
    GetTableStatus,
    CreateBooking,
    GetBooking,
    GetSoups,
    GetPackages,
    GetTableCapacity,

};