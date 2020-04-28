//create new post
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

//get all posts
export const list = () => {
    return fetch(`http://localhost:8001/posts`, {
        method:"GET"   
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

//show single post
export const singlePost = (postId,token) => {
    return fetch(`http://localhost:8001/post/${postId}`, {
        method:"GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`       //carry credentials 
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

//show posts of each user
export const listByUser = (userId,token) => {
    return fetch(`http://localhost:8001/posts/by/${userId}`, {
        method:"GET",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }  
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

//delete post
export const remove = (postId, token) => {
    return fetch(`http://localhost:8001/post/${postId}`, {
        method:"DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
} ;

//update post
export const update = (postId, token,post ) => {
    return fetch(`http://localhost:8001/post/${postId}`, {
        method:"PUT",
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

//like
export const like = (userId, token,postId) => {
    return fetch(`http://localhost:8001/post/like`, {
        method:"PUT",
        headers: {
            Accept: "application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId, postId})
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

//unlike
export const unlike = (userId, token,postId) => {
    return fetch(`http://localhost:8001/post/unlike`, {
        method:"PUT",
        headers: {
            Accept: "application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId, postId})
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

//do comment
export const comment= (userId, token,postId, comment) => {
    return fetch(`http://localhost:8001/post/comment`, {
        method:"PUT",
        headers: {
            Accept: "application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId, postId, comment})
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

//uncomment
export const uncomment = (userId, token,postId, comment) => {
    return fetch(`http://localhost:8001/post/uncomment`, {
        method:"PUT",
        headers: {
            Accept: "application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId, postId, comment})
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};
