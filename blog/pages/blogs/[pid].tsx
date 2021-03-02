import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown';
import { getBlog, IBlog } from '../../api'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dracula} from 'react-syntax-highlighter/dist/cjs/styles/prism'

export async function getServerSideProps(ctx) {
  const { pid } = ctx.query;
  return {
    props: {
      pid,
    },
  };
}

const Blog = () => {
  const router = useRouter()
  const [blogs, setBlogs] = useState<IBlog>();
  const [error, setError] = useState("")
  const [pid, setPID] = useState<string[] |string>(router.query.pid);
  
  

  const helper = async (id: string | string[]) => {
    try {
      const blog = await getBlog(router.query.pid);
      setBlogs(blog.blogs)
      console.log(blog)
    } catch(e) {
      setError(e.toString())
    }
  }
  useEffect(() => {
    let {pid} = router.query
    setPID(pid);
    helper(pid)
  }, [])

  const renderers = {
    code:({language,value})=>{
    var newCode = value
    var oldCode = value || oldCode
 
    return <SyntaxHighlighter style={dracula} language={language} children={newCode || "" } />
 }
 }
  return (
    <>
    {error ? <p>{error}</p>: null}
    {pid}
    {blogs ? <ReactMarkdown children={blogs.text} renderers={renderers}/>: null}
    
    </>
  )
}

export default Blog;
