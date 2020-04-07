//signup auth
export const signup = user => {
  return fetch("http://localhost:8001/signup", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

//sign auth
export const signin = (user) => {
  return fetch("http://localhost:8001/signin", {
       method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
   };

   //authentication of user on signin
export const authenticate=(jwt,next) => {
      if(typeof window !== "undefined"){
          localStorage.setItem("jwt", JSON.stringify(jwt));
          next();
      }
  };

  //do signout
  export const signout = (next) => {
      if(typeof window !== "undefined") localStorage.removeItem("jwt")
      next()
      return fetch("http://localhost:8001/signout", {
           method: "GET"
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
       };
   
  //authentication check
  export const isAuthenticated = () => {
    if(typeof window === "undefined"){
      return false;
    }
  
    if(localStorage.getItem("jwt")){
      return JSON.parse(localStorage.getItem("jwt"))
      }
      else {
        return false;
      }
    }