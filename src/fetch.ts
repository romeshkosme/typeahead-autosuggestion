export const get = (query: string) => {
    return new Promise((resolve, reject) => {
        try {
            fetch(`https://dummyjson.com/products/search?q=${query}&limit=5`)
                .then(res => res.json())
                .then(res => resolve(res.products));
        } catch (error) {
            console.log("error - ", error);
            reject(error);
        }
    })
}