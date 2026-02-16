function loadxml() {
    let a = new XMLHttpRequest();
    a.onreadystatechange = () => {
        if (a.readyState === 4 && a.status === 200)
        {
            let b = a.responseXML;
            let c = b.getElementsByTagName("book");
            var o = `
            <table border="1" cellpadding="10">
            <tr>
                <th>TITLE</th>
                <th>ID</th>
                <th>AUTHOR</th>
                <th>STATUS</th>
            </tr>
            `;
            for (let i = 0; i < c.length; i++)
            {
                let title = c[i].getElementsByTagName("title")[0].textContent;
                let id = c[i].getElementsByTagName("id")[0].textContent;
                let author = c[i].getElementsByTagName("author")[0].textContent;
                let status = c[i].getElementsByTagName("status")[0].textContent;
                let u = (status === "Yes") ? "green" : "red";
                o += `
                <tr style="background-color:${u}">
                    <td>${title}</td>
                    <td>${id}</td>
                    <td>${author}</td>
                    <td>${status}</td>
                </tr>
                `;
            }
            o += `</table>`;
            document.getElementById("output").innerHTML = o;

        }
        else {
            o += "error in loading the xml file";
        }
    }
    a.open("GET", "lms.xml", true);
    a.send();
}