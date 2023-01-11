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

const {REACT_APP_BACKEND_PATH} = process.env;

const APIRoutes = {
	THOUGHTS: `${REACT_APP_BACKEND_PATH}thoughts`,
	NEWTHOUGHT: `${REACT_APP_BACKEND_PATH}newThought`,
	LOGIN: `${REACT_APP_BACKEND_PATH}auth/login`,
	SIGNUP: `${REACT_APP_BACKEND_PATH}auth/signup`,

};

export { appRoutes, APIRoutes };