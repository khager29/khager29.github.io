const ggbContainer = document.querySelector("#ggb-element");
const resetButton = document.querySelector("#reset");

const params = {
    // eslint-disable-next-line camelcase
    material_id: "wqprnejw",
    appName: "classic",
    width: 590,
    height: 590,
    showToolBar: false,
    showAlgebraInput: false,
    showMenuBar: false,
    enableRightClick: false,
    language: "en",
    borderColor: "#000000",
    id: "ggb1",
    appletOnLoad: () => {
        ggb1.registerClientListener((clientEvent) => {
            const { type, x, y } = clientEvent;
            console.log(clientEvent);
            if (type === "mouseDown") {
                ggb1.evalCommand(`Point${count}=(${x},${y})`);
                count++;
                const newRow = document.createElement("tr");
                const tableRowInfo = `<tr><td>${Math.round(10 * x) / 10}</td><td>${Math.round(10 * y) / 10}</td></tr>`;
                newRow.innerHTML = tableRowInfo;
                document.querySelector("tbody").appendChild(newRow);
            }
        });
    },
};

// @ts-expect-error
const applet = new GGBApplet(params, true);
applet.inject("ggb-element");

let count = 1;

resetButton.addEventListener("click", () => {
    count = 1;
    ggb1.getAllObjectNames("point").forEach((objName) => {
        ggb1.deleteObject(objName);
    });
    const tableBody = document.querySelector("tbody");
    const tdList = document.querySelectorAll("tr");
    tdList.forEach((tr, index) => {
        if (index !== 0) {
            tableBody.removeChild(tr);
        }
    });
});
