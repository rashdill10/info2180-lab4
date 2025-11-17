document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("searchBtn");
    const input = document.getElementById("searchInput");
    const resultDiv = document.getElementById("result");

    btn.addEventListener("click", () => {
        const query = input.value.trim();
        const encodedQuery = encodeURIComponent(query);

        let url = "superheroes.php";
        if (encodedQuery !== "") {
            url += `?query=${encodedQuery}`;
        }

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                resultDiv.innerHTML = "";

                // FIGURE 5 — No superhero found
                if (Array.isArray(data) && data.length === 0) {
                    resultDiv.innerHTML = "<p>SUPERHERO NOT FOUND</p>";
                    return;
                }

                // One superhero — FIGURE 4
                if (data.length === 1) {
                    const hero = data[0];
                    resultDiv.innerHTML = `
                        <h3>${sanitize(hero.alias)}</h3>
                        <h4>A.K.A ${sanitize(hero.name)}</h4>
                        <p>${sanitize(hero.biography)}</p>
                    `;
                    return;
                }

                // Multiple superheroes — FIGURE 3
                let listHTML = "<ul>";
                data.forEach(hero => {
                    listHTML += `<li>${sanitize(hero.alias)}</li>`;
                });
                listHTML += "</ul>";
                resultDiv.innerHTML = listHTML;
            })
            .catch(error => {
                console.error("Fetch error:", error);
                resultDiv.innerHTML = "<p>Error fetching superhero data.</p>";
            });
    });

    // Allow Enter key to trigger search
    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            btn.click();
        }
    });

    // Prevent XSS by escaping HTML
    function sanitize(str) {
        return str.replace(/[&<>"']/g, function (match) {
            return {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            }[match];
        });
    }
});
