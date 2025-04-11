const base64StringInput = document.querySelector("#string");
const input = document.querySelector("#filename");
const submitButton = document.querySelector("#submit");
const errorParagraph = document.querySelector("#error");

submitButton.addEventListener("click", () => {
    // change this from hardcoded string to textarea input to fetch or whatever
    let fetchedString = "";
    const token = prompt("Enter your Github PAT here.");
    const filename = input.value.replace(".ggb", "");
    console.log("filename", filename);
    fetch(
        `https://api.github.com/repos/emDIDs/geogebra-backup/contents/GGB%20Files/${filename}.ggb`,
        {
            headers: {
                Authorization: `token ${token}`,
                Accept: "application/vnd.github.v3.raw",
            },
        }
    )
        .then((res) => {
            if (res.status === 200) {
                return res.text();
            } else {
                throw new Error("File not found.", res.statusText);
            }
        })
        .then((data) => {
            fetchedString = data;
            let base64String =
                base64StringInput && base64StringInput.value !== ""
                    ? base64StringInput.value
                    : fetchedString !== ""
                    ? fetchedString
                    : undefined;

            if (base64String) {
                errorParagraph.textContent = "";
                const parameters = {
                    id: "ggbApplet",
                    width: 1210,
                    height: 650,
                    showMenuBar: false,
                    showAlgebraInput: false,
                    showToolBar: false,
                    customToolBar:
                        "0 39 73 62 | 1 501 67 , 5 19 , 72 75 76 | 2 15 45 , 18 65 , 7 37 | 4 3 8 9 , 13 44 , 58 , 47 | 16 51 64 , 70 | 10 34 53 11 , 24  20 22 , 21 23 | 55 56 57 , 12 | 36 46 , 38 49  50 , 71  14  68 | 30 29 54 32 31 33 | 25 17 26 60 52 61 | 40 41 42 , 27 28 35 , 6",
                    showToolBarHelp: false,
                    showResetIcon: false,
                    enableLabelDrags: false,
                    enableShiftDragZoom: false,
                    enableRightClick: false,
                    errorDialogsActive: false,
                    useBrowserForJS: false,
                    allowStyleBar: false,
                    preventFocus: false,
                    showZoomButtons: false,
                    capturingThreshold: 3,
                    // add code here to run when the applet starts
                    appletOnLoad: function (api) {
                        /* api.evalCommand('Segment((1,2),(3,4))');*/
                        console.log("applet started");
                    },
                    showFullscreenButton: false,
                    scale: 1,
                    disableAutoScale: false,
                    allowUpscale: false,
                    clickToLoad: false,
                    appName: "classic",
                    buttonRounding: 0.7,
                    buttonShadows: false,
                    language: "en",
                    // use this instead of ggbBase64 to load a material from geogebra.org
                    // "material_id":"RHYH3UQ8",
                    // use this instead of ggbBase64 to load a .ggb file
                    // "filename":"myfile.ggb",
                    ggbBase64: base64String,
                };
                // is3D=is 3D applet using 3D view, AV=Algebra View, SV=Spreadsheet View, CV=CAS View, EV2=Graphics View 2, CP=Construction Protocol, PC=Probability Calculator DA=Data Analysis, FI=Function Inspector, macro=Macros
                var views = {
                    is3D: 0,
                    AV: 0,
                    SV: 0,
                    CV: 0,
                    EV2: 0,
                    CP: 0,
                    PC: 0,
                    DA: 0,
                    FI: 0,
                    macro: 0,
                };
                var applet = new GGBApplet(parameters, "5.2", views);
                console.log("parameters", parameters);

                applet.inject("ggbApplet");
                console.log("loaded and injected");

                applet.setPreviewImage(
                    "data:image/gif;base64,R0lGODlhAQABAAAAADs=",
                    "https://www.geogebra.org/images/GeoGebra_loading.png",
                    "https://www.geogebra.org/images/applet_play.png"
                );
            } else {
                errorParagraph.textContent =
                    "Please enter a valid base64 string.";
            }
        })
        .catch((error) => console.error(error));
});
