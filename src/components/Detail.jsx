import { useParams } from "react-router-dom";
import handleAPI from "../handleAPI"
import { useEffect } from "react";
import { useState } from "react";
import { Loading } from "./Utils";
import { Link } from "react-router-dom";

export const Detail = () => {
    const [manga, setMangaData] = useState({})
    const [characters, setCharactersData] = useState([])
    const [loading, setLoading] = useState(false)
    const { id } = useParams(); // Extract project ID from URL params
     
    useEffect(() => {
        const loadPage = async() => {
            setLoading(true)
            try {
                const response = await handleAPI.getMangaById(id);
                const response2 = await handleAPI.getMangaCharacters(id);
                setCharactersData(response2.data);
                setMangaData(response.data);
            } catch(error) {
                if(error instanceof Error) setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        loadPage()
    }, [id])
    return ( // JSX rendering
        <>
            {!loading && (
                <>
                    <img src={manga.images != undefined ? manga.images.jpg.image_url : null} className="absolute w-screen h-screen bg-left bg-cover brightness-75 -z-10" />
                    <div className="w-screen h-screen backdrop-blur-3xl absolute brightness-[.25] bg-gradient-to-b from-transparent to-black -z-10" />
                    <div className="flex flex-col w-screen h-screen z-20 py-36 px-5 md:px-10 lg:px-[10%]">
                        <div className="flex flex-col lg:flex-row w-full h-auto justify-left items-center lg:items-start gap-5">
                            {manga.images != undefined && (
                                <div className="w-[75%] lg:w-[25%] h-auto relative flex flex-col rounded-3xl my-5">
                                    <img src={manga.images.jpg.image_url} className="w-full h-full rounded-3xl border-2 border-stone-500/10 z-20" />
                                    <img src={manga.images.jpg.image_url} className="w-full h-full rounded-3xl blur-lg opacity-50 absolute" />
                                </div>
                            )}
                            <div className="flex flex-col py-8 gap-2 transition-all text-wrap w-full h-auto">
                                <div className="flex flex-row justify-between">
                                    <div className="flex flex-row items-center justify-center gap-1">
                                        {manga.approved && ( <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m-2 19.59l-5-5L10.59 15L14 18.41L21.41 11l1.596 1.586Z"/><path fill="none" d="m14 21.591l-5-5L10.591 15L14 18.409L21.41 11l1.595 1.585z"/></svg>)}
                                        <Link to={manga.url}> <h1 className="text-l font-bold">{manga.title}</h1> </Link>
                                    </div>
                                    <div className="flex flex-row justify-center items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275z"/></svg>
                                        <p className="text-l font-bold italic">{manga.score}</p>
                                    </div>
                                </div>
                                {manga.title_synonyms != undefined && (<p className="tracking-wide text-sm"><b>{manga.title_japanese}</b> {manga.title_synonyms.length ? manga.title_synonyms.join(",") : ''}</p>)}
                                {manga.authors != undefined && (<i>{manga.authors.length ? manga.authors.map((author) => author.name).join(",") : "-"}</i>)}
                                <p className="tracking-wide text-sm text-justify">{manga.synopsis == null ? "none" : manga.synopsis}</p>
                                {manga.favorites != undefined && (
                                    <div className="text-base text-wrap w-full gap-3 flex flex-col">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 tracking-wide">
                                            <div>
                                                <p><b>Status:</b> <i>{manga.status}</i></p>
                                                <p><b>Favorites:</b> {manga.favorites.toLocaleString()}</p>
                                                <p><b>Rank:</b> {manga.rank}</p>
                                                <p><b>Popularity:</b> {manga.popularity}</p>
                                                <p><b>Members:</b> {manga.members.toLocaleString()}</p>
                                                {manga.scored_by != null && (<p><b>Scored:</b> {manga.scored_by.toLocaleString()}</p>) }
                                            </div>
                                            <div>
                                                <p><b>Themes:</b> {manga.themes.length ? manga.themes.map((theme) => theme.name).join(", ") : "-"}</p>
                                                <p><b>Demographics:</b> {manga.demographics.length ? manga.demographics.map((demographic) => demographic.name).join(",") : "-"}</p>
                                                <p><b>Published:</b> {manga.published.string}</p>
                                                <p><b>Volumes:</b> {manga.volumes == null ? '-' : manga.volumes }</p>
                                                <p><b>Chapters:</b> {manga.chapters == null ? '-' : manga.chapters}</p>
                                                {manga.serializations.length != 0 && (
                                                    <div className="flex flex-row gap-1">
                                                        <b>Serializations:</b>
                                                        {manga.serializations.map((serialization, id) => (
                                                            <Link key={id} to={serialization.url} className="underline italic">
                                                                <p>{serialization.name}</p>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="text-l font-bold">Background</h1>
                            <p className="tracking-wide text-sm">{manga.background == null ? "none" : manga.background}</p>
                            <h1 className="text-l font-bold">Characters</h1>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-10 my-10 container-character relative transition-all duration-[400ms]">
                                {characters != undefined && characters.map((character, id) => (
                                    <Link key={id} to={character.character.url} className="relative character-box transition-all flex flex-col justify-center items-center group">
                                        <img src={character.character.images.jpg.image_url} className="w-full h-full rounded-xl lg:rounded-3xl border-2 border-stone-500/10" />
                                        <img src={character.character.images.jpg.image_url} className="w-full h-full rounded-xl lg:rounded-3xl blur-lg opacity-50 absolute -z-10" />
                                        <div className="absolute bottom-10 rounded-3xl opacity-0 group-hover:opacity-100 backdrop-blur-xl bg-black/[.098] py-5 px-6 text-wrap">
                                            <p className="leading-[1px] tracking-widest text-sm uppercase font-bold text-shadow">{character.character.name}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
            <Loading state={loading} />
        </>
    )
}
