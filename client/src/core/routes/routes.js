const appRoutes = {
    HOMEPAGE: '/',
    ALLTHOUGHTS: '/allthoughts',
    NEWTHOUGHT: '/newthought',
    THOUGHTDETAILS: '/thoughtdetails/:id',
}

const URLRoutes = {
    THOUGHTS_URL: 'http://localhost:5000/api/thoughts',
    NEWTHOUGHT_URL: 'http://localhost:5000/api/thoughts/newThought',

}

export { appRoutes, URLRoutes }