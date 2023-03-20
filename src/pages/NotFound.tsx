import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { LinkData } from "./Home";

function NotFound() {
    const navigate = useNavigate();
    const fullUrlRef = useRef<HTMLInputElement>(null);
    const onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        api.post<LinkData>('/shorten-url', {
            fullUrl: fullUrlRef?.current?.value
        }).then(_res => {
            navigate("/")
        }).catch(e => console.log(e))
    }

    return (
        <>
            <h2 className="mt-8 text-2xl font-bold underline">404 No link found</h2>
            <form className='mt-4' onSubmit={onSubmit}>
                <label className='mr-2' htmlFor="fullUrl">URL</label>
                <input className='border  mr-2' ref={fullUrlRef} type="url" name="fullUrl" id="fullUrl" />
                <button className='btn btn-blue text-xs' type="submit">Shorten</button>
            </form>
        </>
    )
}

export default NotFound