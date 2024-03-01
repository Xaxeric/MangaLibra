import { useState } from "react"
import { useEffect } from "react"
import handleAPI from "../handleAPI"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { Loading, tailwindStyle } from "./Utils"
import { useNavigate } from "react-router-dom"

export const Explore = () => {
    const navigate = useNavigate();
    const category = ["manga", "novel", "manhwa", "lightnovel", "manhua", "oneshot"]

    const { query } = useParams()
    const [searchQuery, setSearchQuery] = useState("")
    const [mangaData, setMangaData] = useState([])
    const [categoryType, setCategoryType] = useState("manga")
    const [currentPage, setCurrentPage] = useState(1)
    const [nextPage, setNextPage] = useState(true)
    const [loading, setLoading] = useState(false)

    const handleMoreClick = () => setCurrentPage((current) => nextPage ? current + 1 : current);

    const handleSubmit = (event) => {
        event.preventDefault() // Prevent the default behavior of the click event (e.g., navigating to the link)
        navigate("/explore/query/" + searchQuery)
    }
    const handleChange = (event) => {
        const {value} = event.target;
        setSearchQuery(value)
    }

    useEffect(() => {
        const loadPage = async() => {
            setLoading(true)
            try {
                console.log(query)
                if(query != undefined) {
                    const response = await handleAPI.getMangaSearch(query, true, categoryType)
                    console.log(response);
                    setNextPage(response.pagination.has_next_page);
                    setMangaData(response.data);
                } else {
                    const response = await handleAPI.getTopManga(currentPage, 20, categoryType);
                    console.log(response);
                    setNextPage(response.pagination.has_next_page);
                    setMangaData((prevData) => (currentPage === 1 ? response.data : [...prevData, ...response.data]));
                }
            } catch(error) {
                if(error instanceof Error) console.error(error.message)
            } finally {
                setLoading(false);
            }
        }
        loadPage()
    }, [currentPage, categoryType, query])

    return (
        <>
            <div className="absolute inset-0 overflow-hidden -z-[12]">
                <div className="jumbo absolute -inset-[10px] opacity-100" />
            </div>
            <div className="absolute w-screen h-full backdrop-blur-lg bg-black/[.5] -z-[10]" />
            <form className="hidden md:flex lg:flex mx-auto my-0 backdrop-blur-xl flex-row fixed z-10 items-center w-[300px] h-[50px] py-0 px-5 right-44 top-[15%] rounded-[200px] border-[1px] border-white/[.06] bg-white/[.05]" onSubmit={handleSubmit}>
                <input className="focus:outline-none placeholder-gray-100/[.09] text-white no-underline leading-[1px] tracking-widest text-[0.55rem] lg:text-xs uppercase bg-transparent" type="text" name="query" placeholder="Search..." onChange={handleChange}/>
            </form>
            {!loading && (
                <div className="flex overflow overflow-hidden lg:w-screen flex-col justify-center items-center">
                    <div className="mt-20 lg:mt-48 w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 lg:gap-10 p-5 lg:p-10">
                        {mangaData.map((manga, id) => (
                            <Link key={id} to={"/explore/" + manga.mal_id} className="w-auto h-auto relative flex flex-col rounded-3xl group lg:my-5 content-evenly">
                                <img src={manga.images.jpg.image_url} className="w-full h-full rounded-3xl border-2 border-stone-500/10 shadow-2xl" />
                                <img src={manga.images.jpg.image_url} className="w-full h-full rounded-3xl blur-lg opacity-50 absolute -z-10" />
                                <div className="w-full h-full rounded-3xl lg:group-hover:backdrop-blur-lg absolute brightness-75  transition-colors duration-75" />
                                <div className="w-[inherit] opacity-0 lg:group-hover:opacity-100 absolute m-3 gap-2 flex flex-col text-shadow transition-all">
                                    <div className="flex flex-row justify-between">
                                        <h1 className="text-l font-bold">{id + 1}. {manga.title}</h1>
                                        <div className="flex flex-row justify-center items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275z"/></svg>
                                            <p className="text-l font-bold italic">{manga.score}</p>
                                        </div>
                                    </div>
                                    <p className="tracking-wide text-sm"><b>{manga.title_japanese}</b> {manga.title_synonyms.length ? manga.title_synonyms.join(",") : ''}</p>
                                    <p className="tracking-wide text-sm">{manga.synopsis == null ? "none" : manga.synopsis.substring(0, 170)}...</p>
                                    <div className="text-base text-wrap w-full gap-1 flex flex-col">
                                        <div className="grid grid-cols-2">
                                            <p className="font-semibold tracking-wide">Status: {manga.status}</p>
                                            <p className="tracking-wide"><b>Favorites:</b> {manga.favorites.toLocaleString()}</p>
                                            <p className="tracking-wide"><b>Rank:</b> {manga.rank}</p>
                                            <p className="tracking-wide"><b>Popularity:</b> {manga.popularity}</p>
                                            <p className="tracking-wide"><b>Members:</b> {manga.members.toLocaleString()}</p>
                                            {manga.scored_by != null && (<p className="tracking-wide"><b>Scored:</b> {manga.scored_by.toLocaleString()}</p>) }
                                        </div>
                                        <div>
                                            <p className="tracking-wide text-sm"><b>Themes:</b> {manga.themes.length ? manga.themes.map((theme) => theme.name).join(", ") : "-"}</p>
                                            <p className="tracking-wide text-sm"><b>Demographics:</b> {manga.demographics.length ? manga.demographics.map((demographic) => demographic.name).join(",") : "-"}</p>
                                            <p className="tracking-wide text-sm"><b>Published:</b> {manga.published.string}</p>
                                            <p className="tracking-wide text-sm"><b>Volumes:</b> {manga.volumes == null ? '-' : manga.volumes }</p>
                                            <p className="tracking-wide text-sm"><b>Chapters:</b> {manga.chapters == null ? '-' : manga.chapters}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
            <Loading state={loading} />
            <div className="block md:hidden lg:hidden">
                <button onClick={handleMoreClick} className="mx-auto backdrop-blur-xl flex flex-row fixed z-10 justify-center items-center w-auto h-[50px] px-4 py-8 right-5 bottom-[12%] rounded-[200px] border-[1px] border-white/[.06] bg-white/[.05]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 24 24"><path fill="currentColor" d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6z"/></svg>
                </button>
            </div>
            <div className={tailwindStyle.subNavigation}>
                <span />
                <button onClick={handleMoreClick} className="hidden md:block lg:block">
                    <p className={tailwindStyle.paragraph}>More</p>
                </button>
                <span className="w-[2px] h-6 rounded-xl bg-white/[.06] hidden md:block lg:block" />
                <div className="flex flex-row gap-3 md:gap-5 lg:gap-10 items-center justify-evenly">
                    {category.map((item, id) => (
                        <button key={id} onClick={() => {setCategoryType(item); setCurrentPage(1)}}>
                            <p className={tailwindStyle.paragraph}>{item}</p>
                        </button>
                    ))}
                </div>
                <span />
            </div>
        </>
    )
}
