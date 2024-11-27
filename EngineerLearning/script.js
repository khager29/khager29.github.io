const colors = [
    "--sherbert-orange",
    "--beachy-teal",
    "--navy-blue",
    "--focused-blue",
];
const squares = document.querySelectorAll(".cell");

squares.forEach((square, index) => {
    const colorVar = colors[index % colors.length];
    square.style.backgroundColor = getComputedStyle(
        document.documentElement
    ).getPropertyValue(colorVar);
});
