import {FormEvent, useState} from 'react';
import { register } from '../../api';
import {useRouter} from 'next/router';

export default function Register() {
    const history = useRouter()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const submitHandle = async (e:FormEvent) => {
        e.preventDefault()
        try {
            await register(username, password);
            history.push("/auth/login")
        } catch(e) {
            setError(e.toString())
        }
    }
    return (
        <div>
            {error}
            <form onSubmit={(e) => submitHandle(e)}>
                <input type="text" onChange={(e) => setUsername(e.target.value)}/>
                <br/>
                <input type="password" onChange={(e) => setPassword(e.target.value)}/>
                <input type="submit"/>
            </form>
        </div>
    )
}