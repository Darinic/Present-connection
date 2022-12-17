const appRoutes = {
	HOMEPAGE: "/",
	ALLTHOUGHTS: "/allthoughts",
	NEWTHOUGHT: "/newthought",
	THOUGHTDETAILS: "/thoughtdetails/:id",
	AUTH: "/auth",
	SIGNUP: "/signup",
	TOP9LIST: "/top9list",
	INCORRECTROUTE: "*"
};

const URLRoutes = {
	THOUGHTS_URL: "http://localhost:5000/api/thoughts",
	NEWTHOUGHT_URL: "http://localhost:5000/api/thoughts/newThought",
	LOGIN_URL: "http://localhost:5000/api/auth/login",
	SIGNUP_URL: "http://localhost:5000/api/auth/signup",

};

export { appRoutes, URLRoutes };