const url = "http://localhost:3006/mecha"
const handleAPI = {
    async get(page = 1, limit = 2) {
        return fetch(`${url}?_page=${page}&_per_page=${limit}`)
            .then(response => response.json())
            .catch((error) => { if(error instanceof Error) console.error("Log client error: " + error) })
    },
    
    async delete(id) {
        return fetch(`${url}/${id}`, {method: "DELETE"}).then(response => response.json()).catch((error) => { if(error instanceof Error) console.error("Log client error: " + error) })
    }
}

export default handleAPI
