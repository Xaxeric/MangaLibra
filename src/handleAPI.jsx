const url = "https://api.jikan.moe/v4"

const handleError = (error) => { if(error instanceof Error) throw new Error("Log client error: " + error) }
const handleAPI = {
    async getTopManga(page = 1, limit = 5, type = "manga", category = "bypopularity") {
        return fetch(`${url}/top/manga?page=${page}&limit=${limit}&type=${type}&filter=${category}`)
            .then(response => response.json())
            .catch(handleError)
    },

    async getMangaSearch(query, sfw = true, type = "manga"){
        return fetch(`${url}/manga?q=${query}&sfw=${sfw}&type=${type}`)
            .then(response => response.json())
            .catch(handleError)
    },

    async getMangaById(id) {
        return fetch(`${url}/manga/${id}`)
            .then(response => response.json())
            .catch(handleError)
    },

    async getMangaCharacters(id) {
        return fetch(`${url}/manga/${id}/characters`)
            .then(response => response.json())
            .catch(handleError)
    }
}

export default handleAPI
