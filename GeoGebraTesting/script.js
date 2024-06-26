const ggbContainer = document.querySelector("#ggb-element");
const submitButton = document.querySelector("#submit");
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

submitButton.addEventListener("click", () => {
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
