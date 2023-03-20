import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api';
function Redirect() {
    const { shortUrl } = useParams();
    const navigate = useNavigate()
    useEffect(() => {
        if (shortUrl) {
            api.get<{ url: string }>(`/shorten-url/${shortUrl}`)
                .then((res) => {
                    console.log(res);
                    window.location.replace(res.data.url)
                })
                .catch(e => { console.log(e); navigate("/404") })
        }
    }, [navigate, shortUrl])
    return (
        <h2 className="mt-8 text-2xl font-bold underline">Loading...</h2>
    )
}

export default Redirect