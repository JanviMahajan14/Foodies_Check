import Link from 'next/link'

const About = () => {
    return (
        <div>
            <h1>About Page </h1>
            <p>Lorem Text</p>
            <Link href="/"><a>Move to home page</a></Link>
        </div>
    );
}
 
export default About;