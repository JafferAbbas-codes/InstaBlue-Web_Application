import React, { Component } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { listByUser } from "../post/apiPost";
import DefaultProfile from "../images/user_avatar.png";
import DefaultPost from "../images/post_avatar.jpg";
import { read } from "./apiUser";

class ShowPostsByUser extends Component {
    constructor() {
        super();
        this.state = {
            user: { following: [], followers: [] },
            redirectToSignin: false,
            following: false,
            error: "",
            posts: [],
        };
    }

    init = (userId) => {
        const token = isAuthenticated().token;
        read(userId, token).then((data) => {
            if (data.error) {
                this.setState({ redirectToSignin: true });
            } else {
                this.setState({ user: data });
                this.loadPosts(data._id);
            }
        });
    };

    loadPosts = (userId) => {
        const token = isAuthenticated().token;
        listByUser(userId, token).then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ posts: data });
            }
        });
    };

    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.init(userId);
    }

    componentWillReceiveProps(props) {
        const userId = props.match.params.userId;
        this.init(userId);
    }

    showuserPosts = posts => {
        return (
            <>
                <div>
                    <hr />
                    <h4
                        className="text-black"
                        style={{
                            marginLeft: "10px",
                            fontWeight: "bold",
                        }}
                    >
                        User Posts
                    </h4>
                    <hr />
                    <div className="row">
                        {posts.map((post, i) => {
                            const posterId = post.postedBy ? post.postedBy._id : "";
                            const posterName = post.postedBy ? post.postedBy.name : "Unknown";

                            return (
                                <div className="card col-md-4"
                                    style={{
                                        marginBottom: "30px",
                                        borderRadius: "10px",
                                        opacity: "0.9"
                                    }}
                                    key={i}>
                                    <div className="card-body">
                                        <Link to={`/user/${posterId}`}>
                                            <img
                                                style={{ borderRadius: "50%", border: "1px Solid black" }}
                                                className="float-left mr-1"
                                                height="30 px"
                                                width="30px"
                                                src={`http://localhost:8001/user/photo/${posterId}`}
                                                onError={i => (i.target.src = `${DefaultProfile}`)}
                                                alt={posterName}
                                            />
                                            <p
                                                style={{
                                                    color: "#00a3f0"
                                                }}
                                            >
                                                <h6>{posterName}</h6>
                                            </p>
                                        </Link>
                                        <br />
                                        <img
                                            src={`http://localhost:8001/post/photo/${post._id}`}
                                            alt={post.title}
                                            onError={i => (i.target.src = `${DefaultPost}`)}
                                            className="img-thumbnail mb-3"
                                            style={{ height: "150px", width: "auto" }}>
                                        </img>
                                        <h5 className="card-title">{post.title}</h5>
                                        <p className="card-text">{post.body.substring(0, 50)}</p>
                                        <Link
                                            to={`/post/${post._id}`}>
                                            <button
                                                style={{
                                                    backgroundColor: "#00a3f0",
                                                    borderRadius: "8px",
                                                    color: "white",
                                                    width: "120px",
                                                    height: "38px"
                                                }}
                                            >
                                                View Post{" "}
                                            </button>{" "}
                                        </Link>
                                        <p></p>
                                        <p> {new Date(post.created).toDateString()}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </>
        )

    }

    render() {
        return (
            <div className="container mt-5">
                {this.showuserPosts(this.state.posts)}
            </div>
        )
    }

};

export default ShowPostsByUser;