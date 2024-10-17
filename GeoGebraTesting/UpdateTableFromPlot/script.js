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
        for (let i = 9; i > 0; i--) {
            ggb1.evalCommand(`Point${i}=(0,0)`);
        }
        ggb1.registerUpdateListener((updated) => {
            document.querySelector(`#${updated.concat("-x")}`).innerText =
                Math.round(10 * ggb1.getXcoord(updated)) / 10;
            document.querySelector(`#${updated.concat("-y")}`).innerText =
                Math.round(10 * ggb1.getYcoord(updated)) / 10;
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
