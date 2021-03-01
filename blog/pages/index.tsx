import Link from "next/link";
import {useEffect, useState} from 'react';
import { getRecentBlogs, IBlog } from "../api";
import data from '../config.json'

export default function Home() {
  const [error, setError] = useState("");
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const helper = async() => {
    try {
      const res = await getRecentBlogs();
      console.log(res.blogs)
      setBlogs(res.blogs)
    } catch(e) {
      setError("Oops we hit an error fetching that data :(")
    }
  }
  useEffect(() => {
    helper()
  }, [])
  return (
    <div>
      <h1>Skills</h1>
      {data.skills.map((skill) => (
        <div key={skill} className="link">
          <Link key={skill} href={"/" + skill.toLowerCase()}>{skill}</Link>
          <br/>
        </div>
      ))}
      <h1>Recent Posts</h1>
      {error ? <p>{error}</p>: null}
      {blogs.map((blog) => (
        <div key={blog._id} className="blog">
            <Link href={`/blogs/${blog._id}`}>{blog.title}</Link>
            <br/>
        </div>
      ))}
    </div>
  );
}
