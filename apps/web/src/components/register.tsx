import React from "react";
import { Link } from "react-router-dom";

const RegisterForm = () => {
    return(
        <form className="flex flex-col gap-4">
            <input
            type="text"
            placeholder="Username"
            className="p-3 rounded-full border w-full outline-none focus:border-[#4b859e]"
            />
            <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-full border w-full outline-none focus:border-[#4b859e]"
            />

            <button
            type="submit"
            className="bg-[#4b859e] text-white p-3 rounded-full hover:bg-[#3a6a7f] transition font-medium"
            >
            Login
            </button>
        </form>
    )
}

export default RegisterForm;