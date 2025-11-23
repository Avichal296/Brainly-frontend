import { Input } from "../Components/Input";
import { Button } from "../Components/Button";
import { useRef } from "react";
import { BACKEND_URL } from "../Config";
import axios from "axios";

export function Signup() {
    const usernameref = useRef<HTMLInputElement | null>(null);
    const passwordref = useRef<HTMLInputElement | null>(null);

    async function signup() {
        try {
            const username = usernameref.current?.value;
            const password = passwordref.current?.value;

            const data = JSON.stringify({ username, password });

            await axios.post(
                BACKEND_URL + "/api/v1/signup",
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Content-Length": data.length.toString()
                    }
                }
            );

            alert("Signup successful!");
        } catch (error) {
            console.error(error);
            alert("Signup failed. Please check your input and try again.");
        }
    }

    return (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded-xl w-48 justify-center pt-4 ">
                <Input ref={usernameref} placeholder="Username" />
                <Input ref={passwordref} placeholder="Password" />

                <div className="flex justify-center pt-4">
                    <Button
                        variant="primary"
                        text="Signup"
                        fullWidth={true}
                        onClick={signup}
                    />
                </div>
            </div>
        </div>
    );
}

export default Signup;
