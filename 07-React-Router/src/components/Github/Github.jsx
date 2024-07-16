import React from 'react'
import { useLoaderData } from 'react-router-dom'

function Github() {
    // const [data, setData] = useState([]);

    // useEffect(() => {
    //     fetch('https://api.github.com/users/sufiyanak')
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data)
    //             setData(data)
    //         })
    // }, [])

    const data = useLoaderData()

    return (
        <div className='text-center m-4 bg-gray-500 text-white p-4 text-3xl'>
            Github Followers: {data?.followers}
            <img src={data?.avatar_url} width={300} alt="Github Picture" />
        </div>
    )
}

export default Github

export const githubInfoLoader = async () => {
    const response = await fetch('https://api.github.com/users/sufiyanak');
    return response.json()
}