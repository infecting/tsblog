import Link from 'next/link';
import { useRouter } from 'next/router';
import {useEffect, useState} from 'react';
import { getSkillsBlogs, IBlog } from '../api';
import config from '../config.json';
import {capitalizeFirstLetter} from '../utils'


export async function getServerSideProps(ctx) {
    let { skills } = ctx.query;
    const {res} = ctx;
    skills = capitalizeFirstLetter(skills);
    if (!config.skills.includes(skills)) {
        res.statusCode = 404
        return {
            props: {
              error: "this skill does not exist quite yet :)",
            },
          };
    } else {
        
        return {
            props: {
              skills,
            },
          };
    }
    
  }

export default function Skills({error}) {
    const router = useRouter();
    const skills:string = router.query.skills as string;
    const [blogs, setBlogs] = useState<IBlog[]>([])
    let helper = async() => {
        let res = await getSkillsBlogs(skills)
        setBlogs(res.blogs)
    }

    useEffect(() => {
        if (error) return;
        else helper();
    }, [skills])
    if (error) {
        return (
            <div className="error">
                <p>{error}</p>
                <Link href="/">Go back Home</Link>
            </div>
            
        )
    }
    return (
        <div>
            {blogs.map((blog) => (
                <div key={blog._id}>
                    <img src={blog.coverPicture} alt="" height="150" width="300"/>
                    <p>{blog.title}</p>
                    <Link href={`/blogs/${blog._id}`}>Click here</Link>
                </div>
                
            ))}
        </div>
    )
}
