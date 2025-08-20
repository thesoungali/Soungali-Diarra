let posts = [];

function addPost() {
    const text = document.getElementById('new-post').value;
    if(text.trim() === "") return alert("Écris quelque chose !");
    
    const post = {
        id: Date.now(),
        content: text,
        likes: 0,
        comments: []
    };

    posts.unshift(post);
    renderPosts();
    document.getElementById('new-post').value = '';
}

function renderPosts() {
    const container = document.getElementById('posts-container');
    container.innerHTML = '';

    posts.forEach(post => {
        const postEl = document.createElement('div');
        postEl.className = 'post';
        postEl.innerHTML = `
            <p>${post.content}</p>
            <button onclick="likePost(${post.id})">👍 ${post.likes}</button>
            <button onclick="commentPost(${post.id})">💬 Commenter</button>
            <div id="comments-${post.id}"></div>
        `;
        container.appendChild(postEl);
        renderComments(post);
    });
}

function likePost(id) {
    const post = posts.find(p => p.id === id);
    post.likes++;
    renderPosts();
}

function commentPost(id) {
    const comment = prompt("Votre commentaire:");
    if(comment) {
        const post = posts.find(p => p.id === id);
        post.comments.push(comment);
        renderPosts();
    }
}

function renderComments(post) {
    const container = document.getElementById(`comments-${post.id}`);
    container.innerHTML = '';
    post.comments.forEach(comment => {
        const div = document.createElement('div');
        div.style.marginLeft = '10px';
        div.innerText = comment;
        container.appendChild(div);
    });
}
