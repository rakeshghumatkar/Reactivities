import { Link } from 'react-router-dom'

const HomePage = () => {
    return (
        <>
            <h1>Home Page</h1>
            <h3>Go to the <Link to='/activities' >Activities</Link></h3>
        </>
    )
}

export default HomePage