function loadxml() {
    let a = new XMLHttpRequest();
    a.onreadystatechange = () => {
        if (a.readyState === 4 && a.status === 200) {
            let b = a.responseXML;
            let c = b.getElementsByTagName("books");
            let output = `<table border="5">
            <tr>
                <th>Title</th>
                <th>Id</th>
                <th>Author</th>
                <th>Cateogry</th>
                <th>Availability</th>
            </tr>
            `;
            for (let i = 0; i < c.length; i++) {
                let v = c[i].getElementsByTagName("Title")[0].textContent;
                let w = c[i].getElementsByTagName("Id")[0].textContent;
                let x = c[i].getElementsByTagName("Author")[0].textContent;
                let y = c[i].getElementsByTagName("cateogry")[0].textContent;
                let z = c[i].getElementsByTagName("Availability")[0].textContent;
                
                if (z === "Yes") {
                    output += `
                <tr class="Book">
                    <td>${v}</td>
                    <td>${w}</td>
                    <td>${x}</td>
                    <td>${y}</td>
                    <td>${z}</td>     
                </tr>
                `;
                }
                else {
                    output += `
                    <tr class="Book Unavailable">
                        <td>${v}</td>
                        <td>${w}</td>
                        <td>${x}</td>
                        <td>${y}</td>
                        <td>${z}</td>
                    </tr>

                    `
                }
            }
            document.getElementById("output").innerHTML = output;
        }
    }
    a.open("GET", "library.xml", true);
    a.send();
}