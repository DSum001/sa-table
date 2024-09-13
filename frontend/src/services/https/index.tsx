import { UsersInterface } from "../../interfaces/IUser";
import { SignInInterface } from "../../interfaces/SignIn";
import { BookingInterface } from "../../interfaces/Booking";
import { BookingSoupInterface } from "../../interfaces/BookingSoup";
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

// User functions
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

// Booking functions
async function GetBooking() {
    return await axios
    .get(`${apiUrl}/booking`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function CreateBooking(data: BookingInterface) {
    try {
        const response = await axios.post(`${apiUrl}/booking`, data, requestOptions);
        return response.data; // ส่งกลับข้อมูลที่ต้องการ
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // ตรวจสอบว่าข้อผิดพลาดเป็น AxiosError หรือไม่
            return error.response; // ส่งกลับข้อมูลตอบกลับที่มีข้อผิดพลาด
        }
        // ถ้าไม่ใช่ AxiosError
        console.error("An unexpected error occurred:", error);
        return { error: "An unexpected error occurred" };
    }
}


async function GetBookingByID(id: string) {
    return await axios
    .get(`${apiUrl}/booking/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function UpdateBooking(id: string | undefined, data: BookingInterface) {
    return await axios
    .patch(`${apiUrl}/booking/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function DeleteBookingByID(id: string | undefined) {
    return await axios
    .delete(`${apiUrl}/booking/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

// Table functions
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

// Soup functions
async function GetSoups() {
    return await axios
    .get(`${apiUrl}/soups`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

// Package functions
async function GetPackages() {
    return await axios
    .get(`${apiUrl}/packages`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function CreateBookingSoup(data: BookingSoupInterface) {
    return await axios
    .post(`${apiUrl}/booking_soups`, data, requestOptions)
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
    GetTables,
    GetTableStatus,
    CreateBooking,
    GetBooking,
    GetSoups,
    GetPackages,
    GetTableCapacity,
    GetBookingByID,
    UpdateBooking,
    DeleteBookingByID,
    CreateBookingSoup,
};
