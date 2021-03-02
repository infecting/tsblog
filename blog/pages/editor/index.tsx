import {useState, useEffect, FormEvent} from 'react'
import { createBlog, refreshToken } from '../../api'
import {useRouter} from 'next/router'
import ReactMarkdown from 'react-markdown';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dracula} from 'react-syntax-highlighter/dist/cjs/styles/prism'

export default function index() {
    
    const history = useRouter();
    const [title, setTitle] = useState("");
    let init = `# ${title}\n## description`
    const [html, setHTML] = useState(init);
    const [skill, setSkill] = useState("programming");
    const [coverPicture, setCoverPicture] = useState("");
    const [token, setToken] = useState("");
    const [error, setError] = useState("")
    const submitHandler = async() => {
        refresh();
        try {
            const res = await createBlog(token, title, html, skill, coverPicture);
            console.log(res)
            history.push(`blogs/${res.newBlog._id}`)
        } catch(e) {
            setError(e.toString())
        }
    }

    let refresh = async() => {
        try {
            let token = await refreshToken();
            if (!token.accessToken) {
                throw new Error()
            } else {
                setToken(token.accessToken)
            }
        } catch(e) {
            history.push('/auth/login')
        }
    }

    let dispatch = (e: string) => {
        try {
            setTitle(e)
            setHTML(`# ${e}\n## description`)
        } catch(e) {

        }
    }

    useEffect(() => {
        refresh();
    }, [])
    const renderers = {
        code:({language,value})=>{
        var newCode = value
        var oldCode = value || oldCode
     
        return <SyntaxHighlighter style={dracula} language={language} children={newCode || "" } />
     }
     }

    return (
        <div className="edit">
            <div className="editor">
                {error ? <h1 color="white">{error}</h1>: null}
                <input type="text" onChange={e => dispatch(e.target.value)} placeholder="Title"/>
                <input type="text" onChange={e => setCoverPicture(e.target.value)} placeholder="Cover Picture"/>
                <select name="" id="" onChange={(e) => setSkill(e.target.value)} defaultValue="programming">
                    <option value="programming">Programming</option>
                    <option value="blackjack">Blackjack</option>
                    <option value="skateboarding">Skateboarding</option>
                    <option value="dunk">Dunk</option>
                    <option value="guitar">Guitar</option>
                </select>
                <textarea name="" id="" onChange={e => setHTML(e.target.value)} value={html}></textarea>
                <button onClick={() => submitHandler()}>Submit</button>
            </div>
            <div className="view">
                <div className="wrapper">
                    <ReactMarkdown children={html} renderers={renderers}/>
                </div>
            </div>
            
        </div>
    )
}
