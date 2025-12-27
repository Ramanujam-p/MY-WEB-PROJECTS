async function loadxml()
{
    try {
        let a = await fetch("student.xml");
        let b = await a.text();
        let c = new DOMParser();
        let d = c.parseFromString(b, "application/xml");
        let e = d.getElementsByTagName("student");
        let f = `<table border="5",cell-padding="0",cell-spacing="0">
            <tr>
                <th>Name</th>
                <th>Dept</th>
                <th>Marks</th>
            </tr>
        `;
        for (let g = 0; g < e.length; g++)
        {
            let h = e[g].getElementsByTagName("name")[0].textContent;
            let i = e[g].getElementsByTagName("dept")[0].textContent;
            let j = e[g].getElementsByTagName("marks")[0].textContent;
            f +=
            `<tr>
            <td>${h}</td>
            <td>${i}</td>
            <td>${j}</td>
            </tr>`;
        }
        document.getElementById("output").innerHTML = f;
    }
    catch (error)
    {
        console.error("Error loading xml!", error);
    }
}