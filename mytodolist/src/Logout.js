export default function Logout({user, setUser}) {
    return (
        <form onSubmit={e => { e.preventDefault(); setUser('')}}>
            Logged in as: <b>{user}</b>
            <br />
            <br/>
    <input type="submit" value="Logout" />
    </form>
    )
}

    