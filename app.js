document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("searchBtn");

    btn.addEventListener("click", () => {

        fetch("superheroes.php")
            .then(response => response.text())
            .then(data => {
                alert(data);
            })
            .catch(error => {
                alert("Error fetching superheroes.");
                console.error(error);
            });

    });
});
