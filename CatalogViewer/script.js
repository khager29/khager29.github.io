window.addEventListener("load", () => {
    const dropdownList1 = document.querySelector("#func-tags");
    const dropdownList2 = document.querySelector("#peda-tags");
    const links = document.querySelectorAll("li");
    const andChosen = document.querySelector("#and");
    const orChosen = document.querySelector("#or");

    function updateVisibility() {
        const bothChoices = [
            ...Array.from(dropdownList1.selectedOptions),
            ...Array.from(dropdownList2.selectedOptions),
        ];
        const selected = bothChoices.map((opt) => opt.value);

        links.forEach((link) => {
            if (andChosen.checked) {
                const hasMatch = selected.every((className) =>
                    link.classList.contains(className)
                );
                if ((link.style.display = hasMatch)) {
                    link.classList.remove("hidden");
                } else {
                    link.classList.add("hidden");
                }
            } else if (orChosen.checked) {
                const hasMatch = selected.some((className) =>
                    link.classList.contains(className)
                );
                if ((link.style.display = hasMatch)) {
                    link.classList.remove("hidden");
                } else {
                    link.classList.add("hidden");
                }
            } else {
                throw new Error("nothing checked!");
            }
        });
    }

    dropdownList1.addEventListener("change", updateVisibility);
    dropdownList2.addEventListener("change", updateVisibility);

    andChosen.addEventListener("change", updateVisibility);
    orChosen.addEventListener("change", updateVisibility);

    updateVisibility();
});
