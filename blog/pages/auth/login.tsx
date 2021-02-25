import {FormEvent, useState} from 'react'
import { login } from '../../api'
import {NextRouter, useRouter} from 'next/router'

export default function Login() {
    const history: NextRouter = useRouter();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const submitHandle = async (e: FormEvent) => {
        e.preventDefault()
        try {
            let res = await login(email, password)
            if (res.accessToken) {
                localStorage.setItem("id", res.user._id)
                history.push("/movies")
            }
        } catch(e) {
            console.error(e)
        }
        
    }
    return (
        <div className="wrapper">
            <form onSubmit={(e) => submitHandle(e)}>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" onChange={(e) => setEmail(e.target.value)}/>
                <br/>
                <label htmlFor="password">Password:</label>
                <input id="password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                <br/>
                <input type="submit" />
            </form>
        </div>
    )
}
