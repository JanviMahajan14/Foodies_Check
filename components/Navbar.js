import Link from 'next/link'

const Navbar = () => {
    return (
        <nav>
            <div>
                <h1> Janvi List</h1>
                <Link href="/"><a>Home </a></Link>
                <Link href="/about"><a>About </a></Link>
                <Link href="/contact"><a>Contact </a></Link>
            </div>
        </nav>
    );
}

export default Navbar;