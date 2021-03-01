import {useState} from 'react'
import { createBlog, refreshToken } from '../../api'
import {useRouter} from 'next/router'

export default function index() {
    const history = useRouter();
    const [title, setTitle] = useState("");
    const [html, setHTML] = useState("<div class='wrapper'><h1>title</h1></div>");
    const [skill, setSkill] = useState("programming");
    const [coverPicture, setCoverPicture] = useState("");
    const [token, setToken] = useState("");
    const [error, setError] = useState("")
    const submitHandler = async() => {
        try {
            let token = await refreshToken();
            if (!token.accessToken) {
                throw new Error()
            } else {
                setToken(token.accessToken)
            }
        } catch(e) {
            history.push("/auth/login")
        }
        try {
            const res = await createBlog(token, title, html, skill, coverPicture);
            console.log(res)
            history.push(`blogs/${res.newBlog._id}`)
        } catch(e) {
            setError(e.toString())
        }
        

        
    }

    return (
        <div className="edit">
            <div className="editor">
                {error ? <h1 color="white">{error}</h1>: null}
                <input type="text" onChange={e => setTitle(e.target.value)} placeholder="Title"/>
                <input type="text" onChange={e => setCoverPicture(e.target.value)} placeholder="Cover Picture"/>
                <select name="" id="" onChange={(e) => setSkill(e.target.value)} defaultValue="programming">
                    <option value="programming">Programming</option>
                    <option value="blackjack">Blackjack</option>
                    <option value="skateboarding">Skateboarding</option>
                    <option value="dunk">Dunk</option>
                    <option value="guitar">Guitar</option>
                </select>
                <textarea name="" id="" onChange={e => setHTML(e.target.value)} defaultValue="<div class='wrapper'><h1 class='title'>title</h1></div>"></textarea>
                <button onClick={() => submitHandler()}>Submit</button>
            </div>
            <div className="view" dangerouslySetInnerHTML={{__html: html}}>

            </div>
        </div>
    )
}
