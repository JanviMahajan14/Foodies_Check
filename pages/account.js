import { parseCookies } from 'nookies'

const Account = () => {
    return (
        <div>
            This is your account page
        </div>
    );
}
 
export async function getServerSideProps(ctx){
    const { token } = parseCookies(ctx)
    if (!token) {
        const { res } = ctx
        res.writeHead(302, { Location: "/login" })
        res.end()
    }

    return {
        props : {}
    }
}

export default Account;