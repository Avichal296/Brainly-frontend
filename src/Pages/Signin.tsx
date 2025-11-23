import { useRef } from "react";
import { Input } from "../Components/Input";
import { Button } from "../Components/Button";
import axios from "axios";
import { BACKEND_URL } from "../Config";

export function Signin() {

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    async function signin() {
        try {
            const username = usernameRef.current?.value;
            const password = passwordRef.current?.value;

            const response = await axios.post<{ token: string }>(
                BACKEND_URL + "/api/v1/signin",
                { username, password },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            localStorage.setItem("token", response.data.token);

            alert("Logged in successfully!");
            window.location.href = "/dashboard";
        } catch (e) {
            alert("Invalid username or password");
            console.log(e);
        }
    }

    return (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded-xl h-[200px] p-4">
                <Input ref={usernameRef} placeholder="Username" />
                <Input ref={passwordRef} placeholder="Password" />

                <div className="flex justify-center pt-4">
                    <Button
                        variant="primary"
                        text="Signin"
                        fullWidth={true}
                        onClick={signin}
                    />
                </div>
            </div>
        </div>
    );
}

export default Signin;
