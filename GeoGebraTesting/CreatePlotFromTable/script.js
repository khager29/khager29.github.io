const ggbContainer = document.querySelector("#ggb-element");
const submitButton = document.querySelector("#submit");
const addButton = document.querySelector("#add");
const removeButton = document.querySelector("#remove");
const tableBody = document.querySelector("tbody");
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
};
// @ts-expect-error
const applet = new GGBApplet(params, true);
applet.inject("ggb-element");

addButton.addEventListener("click", () => {
    const newRow = document.createElement("tr");
    const rowGuts = `<td><input type="number" required /></td><td><input type="number" required /></td>`;
    newRow.innerHTML = rowGuts;
    document.querySelector("tbody").appendChild(newRow);
});

removeButton.addEventListener("click", () => {
    const lastChild = tableBody.lastElementChild;
    const childCount = tableBody.childElementCount;
    if (childCount >= 3) {
        tableBody.removeChild(lastChild);
    }
});

submitButton.addEventListener("click", () => {
    ggb1.getAllObjectNames("point").forEach((objName) => {
        ggb1.deleteObject(objName);
    });
    const inputList = document.querySelectorAll("input");
    inputList.forEach((item, index) => {
        if (
            index % 2 == 1 &&
            inputList[index - 1].value !== "" &&
            inputList[index].value !== ""
        ) {
            ggb1.evalCommand(
                "(".concat(
                    inputList[index - 1].value,
                    ",",
                    inputList[index].value,
                    ")"
                )
            );
        }
    });
});
