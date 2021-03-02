import {FormEvent, useState} from 'react'
import { login } from '../../api'
import {NextRouter, useRouter} from 'next/router'

export default function Login() {
    const history: NextRouter = useRouter();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const submitHandle = async (e: FormEvent) => {
        e.preventDefault()
        try {
            let res = await login(username, password)
            if (res.accessToken) {
                localStorage.setItem("id", res.user._id)
                history.push("/")
            }
        } catch(e) {
            setError(e.toString())
        }
        
    }
    return (
        <div className="wrapper">
            {error ? <p>{error}</p>: null}
            <form onSubmit={(e) => submitHandle(e)}>
                <label htmlFor="username">Username</label>
                <input id="username" type="username" onChange={(e) => setUsername(e.target.value)}/>
                <br/>
                <label htmlFor="password">Password:</label>
                <input id="password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                <br/>
                <input type="submit" />
            </form>
        </div>
    )
}
