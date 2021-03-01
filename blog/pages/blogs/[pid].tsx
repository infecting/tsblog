import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getBlog, IBlog } from '../../api'

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

  return (
    <>
    {error ? <p>{error}</p>: null}
    {pid}
    {blogs ? <div dangerouslySetInnerHTML={{__html: blogs.text}}></div>: null}
    </>
  )
}

export default Blog;
