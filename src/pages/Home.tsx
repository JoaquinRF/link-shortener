import React, { useRef } from 'react'
import { api } from '../api';


function Home() {

    const fullUrlRef = useRef<HTMLInputElement>(null);
    const onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        console.log(fullUrlRef)
        api.post('/shorten-url', {
            fullUrl: fullUrlRef?.current?.value
        })
    }
    return (
        <div>
            <h1 className="text-3xl font-bold underline">Link Shortener</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor="fullUrl">URL</label>
                <input ref={fullUrlRef} type="url" name="fullUrl" id="fullUrl" />
                <button className='btn btn-blue' type="submit">Shorten</button>
            </form>
        </div>
    )
}

export default Home