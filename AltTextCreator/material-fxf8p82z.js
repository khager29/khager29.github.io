function ggbOnInit(name, ggbObject) {
    function makeLoggingProxy(apiObj) {
        const log = [];

        const proxyApi = new Proxy(apiObj, {
            get(target, prop) {
                const origFn = target[prop];
                if (typeof origFn !== "function") return origFn;

                return function (...args) {
                    switch (prop) {
                        case "setValue": {
                            const [id, value] = args;
                            log.push(`Set value of ${id} to ${value}.`);
                            console.log(`Set value of ${id} to ${value}.`);
                            break;
                        }
                        case "setAnimating": {
                            const [id, boolean] = args;
                            log.push(
                                `${id} is${!!boolean ? "" : " not"} animating.`
                            );
                            console.log(
                                `${id} is${!!boolean ? "" : " not"} animating.`
                            );
                            break;
                        }
                        case "setColor": {
                            const [id, color] = args;
                            log.push(`Changed color of ${id} to ${color}.`);
                            console.log(`Changed color of ${id} to ${color}.`);
                            break;
                        }
                        case "setTextValue": {
                            const [id, text] = args;
                            log.push(
                                `${id} now reads "${text
                                    .replace(/\\text{/g, "")
                                    .replace(/\\/g, "")}"`
                            );
                            console.log(
                                `${id} now reads "${text
                                    .replace(/\\text{(.*)}/g, "$1")
                                    .replace(/\\/g, "")}"`
                            );
                            break;
                        }
                        default:
                            if (
                                !prop.includes("get") &&
                                !prop.includes("register")
                            ) {
                                log.push(
                                    `Called ${prop} with arguments: ${args}.`
                                );
                                console.log(
                                    `Called ${prop} with arguments: ${args}.`
                                );
                            }
                            break;
                    }

                    return origFn.apply(this, args);
                };
            },
        });

        return { proxyApi, getLog: () => log };
    }
    const { proxyApi: ggbWithLogging, getLog } = makeLoggingProxy(ggbObject);

    loadUtils().then(function (setupGGB) {
        const buttonClicks = defineButtonClickScripts();
        const {
            getCanvas,
            setAriaLabel,
            readKeyboardInstructions,
            updateKeyboardInstructions,
            ggbReadText,
            enableButton,
            libClientFunction,
            libClickFunction,
            libKeyFunction,
            registerSafeObjectUpdateListener,
            registerSafeObjectClickListener,
            registerHoverListener,
            unavailableButtonText,
            setTabOrder,
            manageAddedList,
            editXML,
            isPoly,
            selectedObject,
            validateGGBInput,
            displayGGBErrorMessage,
        } = setupGGB({
            name,
            ggbObject: ggbWithLogging,
            defineKeyboardInstructions,
            buttonClicks,
            statusName: "AAppletStatus",
            preventCustomFocusIndicators: false,
        });
        window.ggbAltLog = getLog;

        const ggbcanvas = getCanvas();

        /*
         * IGNORE above
         * EDIT below
         */

        setAriaLabel(ggbcanvas, "Building Prisms Interactive");

        // listeners here; keep these, add your own as needed
        ggbObject.registerClientListener(function (clientEvent) {
            clientFunction(clientEvent);
            libClientFunction(clientEvent);
        });
        ggbObject.registerClickListener(function (clickedName) {
            clickListenerFunction(clickedName);
            libClickFunction(clickedName);
        });
        ggbcanvas.addEventListener("keyup", function (keyEvent) {
            keyit(keyEvent);
            libKeyFunction(keyEvent);
        });

        // my listeners
        registerSafeObjectUpdateListener("time1", startTime2);
        registerSafeObjectUpdateListener("time2", startTime3);
        registerSafeObjectUpdateListener("viewSelected", updateView);
        registerSafeObjectUpdateListener(
            "tempHeight",
            stopAnimationAndUpdatePlayButton
        );
        registerSafeObjectUpdateListener(
            "tempWidth",
            stopAnimationAndUpdatePlayButton
        );
        registerSafeObjectUpdateListener(
            "tempLength",
            stopAnimationAndUpdatePlayButton
        );

        function defineButtonClickScripts() {
            // defines button scripts
            // keep this function, but you can delete anything/everything inside it
            return {
                ggbButton1() {
                    const cubeSize = ggbObject.getValue("cubeSize");
                    ggbObject.setValue("time2", cubeSize);
                    ggbObject.setValue("time3", cubeSize);
                    ggbObject.setValue("time1", cubeSize);
                    ggbObject.setAnimating("time1", true);
                    ggbObject.setAnimating("time2", false);
                    ggbObject.setAnimating("time3", false);

                    // needed if statement to start the next animation if the length input is 1
                    if (ggbObject.getValue("Length") !== 1) {
                        ggbObject.startAnimation();
                    } else {
                        startTime2();
                    }

                    ggbObject.setValue("play", !ggbObject.getValue("play"));

                    // read text - will be determined by the values for length, width, and height
                    const playLength = ggbObject.getValue("Length");
                    const playWidth = ggbObject.getValue("Width");
                    const playHeight = ggbObject.getValue("Height");
                    let readTextString = "";

                    switch (true) {
                        case playHeight === 1 &&
                            playLength === 1 &&
                            playWidth === 1:
                            readTextString = "playAllOne";
                            break;
                        case playLength === 1 &&
                            playWidth === 1 &&
                            playHeight !== 1:
                            readTextString = "playOnlyHeightGreaterThanOne";
                            break;
                        case (playLength === 1 &&
                            playHeight === 1 &&
                            playWidth !== 1) ||
                            (playLength !== 1 &&
                                playHeight === 1 &&
                                playWidth === 1):
                            readTextString = "playOnlyOneRow";
                            break;
                        case playLength === 1 &&
                            playWidth !== 1 &&
                            playHeight !== 1:
                            readTextString = "playOnlyLengthOne";
                            break;
                        case playLength !== 1 &&
                            playWidth === 1 &&
                            playHeight !== 1:
                            readTextString = "playOnlyWidthOne";
                            break;
                        case playLength !== 1 &&
                            playWidth !== 1 &&
                            playHeight === 1:
                            readTextString = "playOnlyHeightOne";
                            break;
                        default:
                            readTextString = "playAllGreaterThanOne";
                            break;
                    }
                    ggbReadText(readTextString, true);
                },

                ggbButton2() {
                    ggbObject.stopAnimation();
                    ggbObject.setAnimating("time1", false);
                    ggbObject.setAnimating("time2", false);
                    ggbObject.setAnimating("time3", false);

                    ggbObject.setValue("time1", 0);
                    ggbObject.setValue("cubeSize", 1);
                    ggbObject.setValue("play", !ggbObject.getValue("play"));

                    // set inputs back to all 10
                    ggbObject.setValue("tempLength", 10);
                    ggbObject.setValue("tempWidth", 10);
                    ggbObject.setValue("tempHeight", 10);
                    ggbObject.setValue("Length", 10);
                    ggbObject.setValue("Width", 10);
                    ggbObject.setValue("Height", 10);

                    // read text
                    ggbReadText("resetReadText", true);
                },
                ggbButton3() {},
                ggbButton4() {},
                ggbButton5() {},
            };
        }

        function defineKeyboardInstructions(obj) {
            // takes a GGB object name as an argument, returns its keyboard text.
            if (ggbObject.getObjectType(obj) === "textfield") {
                return "Enter a whole number from 1 to 10. Press enter to submit.";
            }

            const keyboardInstructions = {
                viewList:
                    "Press space to open. Press up arrow\\\\and down arrow to go to different\\\\options. Press enter to select.",
                ggbButton1: ggbObject.getValue("ggbButton1Enabled")
                    ? "Press space to play."
                    : unavailableButtonText,
                ggbButton2: ggbObject.getValue("ggbButton2Enabled")
                    ? "Press space to reset."
                    : unavailableButtonText,
                ggbButton3: ggbObject.getValue("ggbButton3Enabled")
                    ? "Press space to ___."
                    : unavailableButtonText,
                ggbButton4: ggbObject.getValue("ggbButton4Enabled")
                    ? "Press space to ___."
                    : unavailableButtonText,
                ggbButton5: ggbObject.getValue("ggbButton5Enabled")
                    ? "Press space to ___."
                    : unavailableButtonText,
            };
            return keyboardInstructions[obj];
        }

        function clientFunction(clientEvent) {
            // const { type, target } = clientEvent;
        }

        function clickListenerFunction(clickedName) {
            // clickedName is a string
        }

        function keyit(keyEvent) {
            // feel free to delete key or code depending on your preferences
            // const { key, code } = keyEvent;
        }

        function startTime2() {
            if (ggbObject.getValue("time1") === ggbObject.getValue("Length")) {
                ggbObject.setAnimating("time1", false);
                ggbObject.setAnimating("time2", true);

                // needed if statement here because time2 starts at 1. If the width is 1, it never ran.
                if (ggbObject.getValue("Width") !== 1) {
                    ggbObject.startAnimation();
                } else {
                    startTime3();
                }
            }
        }

        function startTime3() {
            if (ggbObject.getValue("time2") === ggbObject.getValue("Width")) {
                ggbObject.setAnimating("time2", false);
                ggbObject.setAnimating("time3", true);
                ggbObject.startAnimation();
            }
        }

        function updateView() {
            const viewNum = ggbObject.getValue("viewSelected");
            let descTextName = "";
            // I tried to grab viewName from GGB, but it was always one behind
            let viewName = "";
            switch (viewNum) {
                case 1:
                    // Home
                    ggbObject.evalCommand("SetViewDirection(homeVec)");
                    descTextName = "prismDesc";
                    viewName = "Home";
                    break;
                case 2:
                    // Top
                    ggbObject.evalCommand("SetViewDirection(topVec)");
                    descTextName = "topViewDesc";
                    viewName = "Top";
                    break;
                case 3:
                    // Side
                    ggbObject.evalCommand("SetViewDirection(sideVec)");
                    descTextName = "sideViewDesc";
                    viewName = "Side";
                    break;
                case 4:
                    // Front
                    ggbObject.evalCommand("SetViewDirection(frontVec)");
                    descTextName = "frontViewDesc";
                    viewName = "Front";
                    break;
            }

            const viewUpdateReadString = "The ".concat(
                viewName,
                " view is shown. ",
                ggbObject.getValueString(descTextName)
            );

            ggbReadText(viewUpdateReadString);
        }

        function stopAnimationAndUpdatePlayButton() {
            // stop animation
            ggbObject.stopAnimation();
            ggbObject.setAnimating("time1", false);
            ggbObject.setAnimating("time2", false);
            ggbObject.setAnimating("time3", false);

            ggbObject.setValue("time1", 0);
            ggbObject.setValue("cubeSize", 1);
            ggbObject.setValue("play", !ggbObject.getValue("play"));

            ggbObject.evalCommand("SetViewDirection(homeVec)");
            ggbObject.setValue("viewList", 1);

            // update actual length, width, and height using validateGGBInput
            const checkLength = validateGGBInput({
                input: "tempLength",
                types: ["integer", "nonnegative"],
                range: [1, 10],
            });
            const checkWidth = validateGGBInput({
                input: "tempWidth",
                types: ["integer", "nonnegative"],
                range: [1, 10],
            });
            const checkHeight = validateGGBInput({
                input: "tempHeight",
                types: ["integer", "nonnegative"],
                range: [1, 10],
            });

            displayGGBErrorMessage({
                ...checkLength,
                inputBoxName: "InputBox3",
            });
            displayGGBErrorMessage({
                ...checkWidth,
                inputBoxName: "InputBox4",
            });
            displayGGBErrorMessage({
                ...checkHeight,
                inputBoxName: "InputBox5",
            });

            if (!checkLength.hasError) {
                ggbObject.setValue("Length", ggbObject.getValue("tempLength"));
            }
            if (!checkWidth.hasError) {
                ggbObject.setValue("Width", ggbObject.getValue("tempWidth"));
            }
            if (!checkHeight.hasError) {
                ggbObject.setValue("Height", ggbObject.getValue("tempHeight"));
            }

            // update play button
            enableButton(
                1,
                !checkLength.hasError &&
                    !checkWidth.hasError &&
                    !checkHeight.hasError
            );
        }

        // add new stuff above this line
    });

    /*
     * IGNORE BELOW
     */
    function loadUtils() {
        function parseJS(JSString) {
            return Function("" + JSString)();
        }
        if (!window.didUtils || !window.didUtils.setupGGB) {
            return fetch(
                "https://cdn.digital.greatminds.org/did-utils/latest/index.js",
                {
                    cache: "no-cache",
                }
            )
                .then(function (response) {
                    return response.text();
                })
                .then(function (codingText) {
                    parseJS(codingText);
                })
                .then(function () {
                    return window.didUtils.setupGGB;
                });
        }
        return Promise.resolve(window.didUtils.setupGGB);
    }
}

