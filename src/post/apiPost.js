export const create = (userId, token,post ) => {
    return fetch(`http://localhost:8001/post/new/${userId}`, {
        method:"POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: post
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
} ;

export const list = () => {
    return fetch(`http://localhost:8001/posts`, {
        method:"GET"
        
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}