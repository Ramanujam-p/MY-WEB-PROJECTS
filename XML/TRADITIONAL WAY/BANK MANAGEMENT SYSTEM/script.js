function loadxml()
{
    let a = new XMLHttpRequest();
    a.onreadystatechange = () =>
    {
        if (a.readyState === 4 && a.status === 200)
        {
            let b = a.responseXML;
            let c = b.getElementsByTagName("user");
            let output = `<table border="1">
            <tr>
                <th>name</th>
                <th>deposit</th>
                <th>id</th>
            </tr>
            `;
            for (let i = 0; i < c.length; i++)
            {
                let d = c[i].getElementsByTagName("name")[0].textContent;
                let e = c[i].getElementsByTagName("deposit")[0].textContent;
                let f = c[i].getElementsByTagName("id")[0].textContent;
                output += `
                <tr>
                    <td>${d}</td>
                    <td>${e}</td>
                    <td>${f}</td>
                </tr>
                `;
                document.getElementById("output").innerHTML = output;
            }
        }
    }
    a.open("GET", "bank.xml", true);
    a.send();
}