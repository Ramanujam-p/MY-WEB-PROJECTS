async function loadXml() {
    try {
        let response = await fetch("d.xml");
        let xmlText = await response.text();

        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(xmlText, "application/xml");

        let students = xmlDoc.getElementsByTagName("student");
        let output = "";

        for (let i = 0; i < students.length; i++) {
            let name = students[i].getElementsByTagName("name")[0].textContent;
            let dept = students[i].getElementsByTagName("dept")[0].textContent;
            let marks = students[i].getElementsByTagName("marks")[0].textContent;

            output += `
                <div class="student">
                    <b>Name:</b> ${name}<br>
                    <b>Department:</b> ${dept}<br>
                    <b>Marks:</b> ${marks}
                </div>
            `;
        }

        document.getElementById("output").innerHTML = output;

    } catch (error) {
        console.error("Error loading XML:", error);
    }
}
