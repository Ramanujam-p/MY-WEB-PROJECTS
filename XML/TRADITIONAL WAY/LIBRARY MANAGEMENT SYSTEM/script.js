function loadxml()
{
    let a = new XMLHttpRequest();
    a.onreadystatechange=()=>{
        if(a.readyState===4 && a.status===200)
        {
            let b = a.responseXML;
            let c = b.getElementsByTagName("book");
            let output=`<table border="1" cellpadding="10">
            <tr>
                <th>ID</th>
                <th>TITLE</th>
                <th>AUTHOR</th>
                <th>YEAR</th>
                <th>GENRE</th>
                <th>AVAILABLE</th>
            </tr>
            `;
            for(let i=0;i<c.length;i++)
            {
                let p = c[i].getElementsByTagName("id")[0].textContent;
                let q = c[i].getElementsByTagName("title")[0].textContent;
                let r = c[i].getElementsByTagName("author")[0].textContent;
                let s = c[i].getElementsByTagName("year")[0].textContent;
                let t = c[i].getElementsByTagName("genre")[0].textContent;
                let u = c[i].getElementsByTagName("available")[0].textContent;
                let col = (u==="Yes")?"green":"red";
                output+=`
                <tr style="background-color:${col}">
                    <td>${p}</td>
                    <td>${q}</td>
                    <td>${r}</td>
                    <td>${s}</td>
                    <td>${t}</td>
                    <td>${u}</td>
                </tr>
                `;
            }
            output+=`</table>`;
            document.getElementById("output").innerHTML = output;   
            alert("Book details loaded successfully");
        }
        else {
            alert("Error in loading book details");
        }
    }
    a.open("GET","lms.xml",true);
    a.send();
}