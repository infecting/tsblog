import {useState, useEffect} from 'react'
import { getBlogs, IBlog } from '../../api'

export default function Stats() {
    const [blogs, setBlogs] = useState<IBlog[]>([]);
    const [error, setError] = useState("")

    let helper = async() => {
        try {
            let res = await getBlogs();
            setBlogs(res.blogs)
        } catch (e) {
            setError(e.toString)
        }
    }

    useEffect(() => {
        helper()
    }, [])
    return (
        <div>
            {blogs.map((stat) => (
                <div key={stat._id} className="stats">
                    <p>{stat.title} - {stat.views}</p>
                </div>
            ))}
        </div>
    )
}
