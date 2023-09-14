import { useLoaderData } from "react-router-dom"
import LetsTalk from "./LetsTalk"
import NewsLetter from "./NewsLetter"
import Tags from "./Tags"
import Topics from "./Topics"

const Aside = () => {
    const user = useLoaderData();
    const token = localStorage.getItem('TOKEN')
    return (
        <div className="aside">
            <Topics />
            <Tags />
            {user && token && <LetsTalk />}
            <NewsLetter />
        </div>
    )
}

export default Aside