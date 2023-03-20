import React, { useEffect, useRef, useState } from 'react'
import { api } from '../api';

export type LinkData = { fullUrl: string; shortUrl: string }


function Home() {
    const [links, setLinks] = useState<LinkData[]>([])
    const [inputValue, setInputValue] = useState('');
    const fullUrlRef = useRef<HTMLInputElement>(null);
    const onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        api.post<LinkData>('/shorten-url', {
            fullUrl: fullUrlRef?.current?.value
        }).then(res => {
            setInputValue('')
            setLinks(prev => {
                return [...prev, res.data]
            })
        }).catch(e => console.log(e))
    }

    useEffect(() => {
        api.get<LinkData[]>('/shorten-url')
            .then((res) => {
                setLinks(res.data)
            })
    }, [])
    return (
        <div className='flex flex-col m-6'>
            <h2 className="text-2xl font-bold underline">Link Shortener</h2>
            <form className='mt-4' onSubmit={onSubmit}>
                <label className='mr-2' htmlFor="fullUrl">URL</label>
                <input value={inputValue} onChange={(e: React.SyntheticEvent<HTMLInputElement>) => { setInputValue(e.currentTarget.value) }} className='border  mr-2' ref={fullUrlRef} type="url" name="fullUrl" id="fullUrl" />
                <button className='btn btn-blue text-xs' type="submit">Shorten</button>
            </form>
            {links.length > 0 &&
                <table className='mt-4 text-xs'>
                    <thead>
                        <tr>
                            <th className='px-2 py-3 border border-black text-left text-sm'>Full</th>
                            <th className='px-2 py-3 border border-black text-left text-sm'>Short</th>
                        </tr>
                    </thead>

                    <tbody>
                        {links.map(((linkData: LinkData) => <tr key={linkData.shortUrl}>
                            <td className='px-2 py-3 border border-black text-left max-w-lg overflow-x-auto whitespace-nowrap'>{linkData.fullUrl}</td>
                            <td className='px-2 py-3 border border-black text-left'>{window.location.host + '/' + linkData.shortUrl}</td>
                        </tr>))}
                    </tbody>
                </table>

            }
        </div>
    )
}

export default Home