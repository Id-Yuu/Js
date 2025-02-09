const recentPost = ({idApi, key, label, maxRes, orderby}) => {
    const url = `https://www.googleapis.com/blogger/v3/blogs/${idApi}/posts`;
    const label = `${label}`;
    const key = `${key}`;
    const maxResults = `${maxRes}`;
    const orderBy = `${orderby}`;
    const fields = 'items(title, published, url)';
    const request = `${url}?key=${key}&labels=${label}&maxResults=${maxResults}&orderBy=${orderBy}&fields=${fields}`;
    fetch(request)
        .then(response => response.json())
        .then(data => {
            const posts = data.items;
            posts.forEach(post => {
                const title = post.title;
                const published = post.published;
                const url = post.url;
                console.log(`Title: ${title}, Published: ${published}, URL: ${url}`);
            });
        });
};
export default recentPost;
