import Link from "next/link";
import { config } from "process";
import data from '../config.json'

export default function Home() {
  return (
    <div>
      <h1>Skills</h1>
      {data.skills.map((skill) => (
        <Link href={skill.toLowerCase()}>{skill}</Link>
      ))}
      <h1>Recent Posts</h1>
    </div>
  );
}
