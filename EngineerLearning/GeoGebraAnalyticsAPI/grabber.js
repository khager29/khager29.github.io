function makeGetGGBAnalytics({ name, ggbObject, getCanvas }) {
    return function () {
        const startTime = new Date(Date.now());
        const analyticsData = {
            materialID: "grqabgaq",
            usedKeyboardInstructions: false,
            usedArrows: false,
            openedInstructions: false,
            pressedButtons: "",
            mouseUsed: false,
            timeStart: startTime.toUTCString(),
            timeInApplet: 0,
        };

        const ggbCanvas = getCanvas(name);
        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "hidden") {
                passData();
            }
        });
        if (ggbCanvas) {
            ggbCanvas.addEventListener("mouseout", passData);

            ggbCanvas.addEventListener("mousedown", () => {
                analyticsData.mouseUsed = true;
            });
            ggbCanvas.addEventListener("keyup", keyit);
        }

        ggbObject.registerClickListener(clickListenerFunction);

        function passData() {
            analyticsData.timeInApplet = (Date.now() - startTime) / 1000;
            console.log("started data push");
            fetch("http://localhost:4200/logData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify(analyticsData),
            })
                .then((res) => res.json())
                .then((data) => console.log("Data:", data))
                .catch((err) => console.error("Error:", err));
        }

        function clickListenerFunction(clickedName) {
            if (clickedName === "instructionsIcon") {
                analyticsData.openedInstructions = true;
            } else if (clickedName.includes("ggbButton")) {
                analyticsData.pressedButtons =
                    analyticsData.pressedButtons.concat(clickedName, ",");
            }
        }

        function keyit(event) {
            // feel free to use event.key instead
            switch (true) {
                case event.key === "k": {
                    analyticsData.usedKeyboardInstructions = true;
                    break;
                }
                case event.key === "Escape": {
                    passData();
                    break;
                }
                case event.key === "ArrowUp":
                case event.key === "ArrowDown":
                case event.key === "ArrowLeft":
                case event.key === "ArrowRight": {
                    analyticsData.usedArrows = true;
                    break;
                }
            }
        }
    };
}

window.makeGetGGBAnalytics = makeGetGGBAnalytics;

