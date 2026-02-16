function loadjson() {
    let o = `
    <table border="1">
    <tr>
        <th>ID</th>
        <th>TITLE</th>
        <th>AUTHOR</th>
        <th>GENRE</th>
        <th>STATUS</th>
    </tr>
    `;
    fetch("data.json").then(a => a.json()).then(data => {
        let b = data.books;
        b.forEach(c => {
            o += `
                <tr>
                    <td>${c.id}</td>
                    <td>${c.title}</td>
                    <td>${c.author}</td>
                    <td>${c.genre}</td>
                    <td>${c.status}</td>
                </tr>`;
        });
        o += `</table >`;
        document.getElementById("output").innerHTML = o;
    })
        .catch(e => {
            console.log("error" + e);
        });
}