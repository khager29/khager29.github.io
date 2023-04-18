function ggbOnInit(name, ggbObject) {
    loadUtils().then(
        function (setupGGB) {
            const buttonClicks = defineButtonClickScripts();
            // you may replace the following function call with the name of your status text object as a string
            // if you do, you can delete the function defineStatusName
            const statusName = defineStatusName();
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
            } = setupGGB({
                name,
                ggbObject,
                defineKeyboardInstructions,
                buttonClicks,
                statusName,
            });
            const ggbcanvas = getCanvas(name);

            /*
             * IGNORE above
             * EDIT below
             */

            setAriaLabel(ggbcanvas, "Math Stories Interactive");
            //global-ish variables

            var storedImageName = "";
            var initList = determineImageOrder();
            var addedList = "";
            var enders = "ggbButton1";
            var scene =
                ggbObject.getValue("farmScene") === 1
                    ? "farm"
                    : ggbObject.getValue("marketScene") === 1
                    ? "market"
                    : ggbObject.getValue("dinoScene") === 1
                    ? "prehistoric"
                    : ggbObject.getValue("shipScene") === 1
                    ? "shipwreck"
                    : ggbObject.getValue("spaceScene") === 1
                    ? "space"
                    : "scene";
            const sceneObjects = {
                farm: {
                    cow: {
                        draggerName: "MovableCow",
                        activeName: "activeCow",
                        singularName: "cow",
                        pluralName: "cows",
                        countWord: "Moo. ",
                        toBeVerb: "is ",
                    },
                    pig: {
                        draggerName: "MovablePig",
                        activeName: "activePig",
                        singularName: "pig",
                        pluralName: "pigs",
                        countWord: "Oink. ",
                        toBeVerb: "is ",
                    },
                    sheep: {
                        draggerName: "MovableSheep",
                        activeName: "activeSheep",
                        singularName: "sheep",
                        pluralName: "sheep",
                        countWord: "Bah. ",
                        toBeVerb: "is ",
                    },
                    chicken: {
                        draggerName: "MovableChicken",
                        activeName: "activeChicken",
                        singularName: "chicken",
                        pluralName: "chickens",
                        countWord: "Cluck. ",
                        toBeVerb: "is ",
                    },
                    groupedTerm: "animals",
                    sceneName: "farm",
                    starterStatus: "A bin with four pictures; a cow, a pig, a sheep, and a chicken. ",
                },
                prehistoric: {
                    brontosaurus: {
                        draggerName: "MovableBrontosaurus",
                        activeName: "activeBrontosaurus",
                        singularName: "brontosaurus",
                        pluralName: "brontosauruses",
                        countWord: "Brontosaurus. ",
                        toBeVerb: "is ",
                    },
                    stegosaurus: {
                        draggerName: "MovableStegosaurus",
                        activeName: "activeStegosaurus",
                        singularName: "stegosaurus",
                        pluralName: "stegosauruses",
                        countWord: "Stegosaurus. ",
                        toBeVerb: "is ",
                    },
                    triceratops: {
                        draggerName: "MovableTriceratops",
                        activeName: "activeTriceratops",
                        singularName: "triceratops",
                        pluralName: "triceratopses",
                        countWord: "Triceratops. ",
                        toBeVerb: "is ",
                    },
                    groupedTerm: "dinosaurs",
                    sceneName: "jungle",
                    starterStatus: "A bin with three pictures; a brontosaurus, a stegosaurus, and a triceratops. ",
                },
                market: {
                    strawberry: {
                        draggerName: "MovableStrawberry",
                        activeName: "activeStrawberry",
                        singularName: "strawberry",
                        pluralName: "strawberries",
                        countWord: "Strawberry. ",
                        toBeVerb: "is ",
                    },
                    banana: {
                        draggerName: "MovableBanana",
                        activeName: "activeBanana",
                        singularName: "banana",
                        pluralName: "bananas",
                        countWord: "Banana. ",
                        toBeVerb: "is ",
                    },
                    blueberries: {
                        draggerName: "MovableBlueberries",
                        activeName: "activeBlueberries",
                        singularName: "blueberries",
                        pluralName: "blueberries",
                        countWord: "Blueberries. ",
                        toBeVerb: "are ",
                    },
                    grapes: {
                        draggerName: "MovableGrapes",
                        activeName: "activeGrapes",
                        singularName: "grapes",
                        pluralName: "grapes",
                        countWord: "Grapes. ",
                        toBeVerb: "are ",
                    },
                    apple: {
                        draggerName: "MovableApple",
                        activeName: "activeApple",
                        singularName: "apple",
                        pluralName: "apples",
                        countWord: "Apple. ",
                        toBeVerb: "is ",
                    },
                    orange: {
                        draggerName: "MovableOrange",
                        activeName: "activeOrange",
                        singularName: "orange",
                        pluralName: "oranges",
                        countWord: "Orange. ",
                        toBeVerb: "is ",
                    },
                    groupedTerm: "fruit",
                    sceneName: "market",
                    starterStatus: "A bin with six pictures: a strawberry, a banana, some blueberries, some grapes, an apple, and an orange. ",
                },
                shipwreck: {
                    scubaDiver: {
                        draggerName: "MovableScuba",
                        activeName: "activeScubaDiver",
                        singularName: "scuba diver",
                        pluralName: "scuba divers",
                        countWord: "Scuba diver. ",
                        toBeVerb: "is ",
                    },
                    shark: {
                        draggerName: "MovableShark",
                        activeName: "activeShark",
                        singularName: "shark",
                        pluralName: "sharks",
                        countWord: "Shark. ",
                        toBeVerb: "is ",
                    },
                    fish: {
                        draggerName: "MovableFish",
                        activeName: "activeFish",
                        singularName: "fish",
                        pluralName: "fish",
                        countWord: "Fish. ",
                        toBeVerb: "is ",
                    },
                    octopus: {
                        draggerName: "MovableOctopus",
                        activeName: "activeOctopus",
                        singularName: "octopus",
                        pluralName: "octopuses",
                        countWord: "Octopus. ",
                        toBeVerb: "is ",
                    },
                    crab: {
                        draggerName: "MovableCrab",
                        activeName: "activeCrab",
                        singularName: "crab",
                        pluralName: "crabs",
                        countWord: "Crab. ",
                        toBeVerb: "is ",
                    },
                    groupedTerm: "pictures",
                    sceneName: "ocean",
                    starterStatus: "A bin with five pictures: a diver, a shark, a fish, an octopus, and a crab. ",
                },
                space: {
                    alien: {
                        draggerName: "MovableAlien",
                        activeName: "activeAlien",
                        singularName: "alien",
                        pluralName: "aliens",
                        countWord: "Alien. ",
                        toBeVerb: "is ",
                    },
                    astronaut: {
                        draggerName: "MovableAstronaut",
                        activeName: "activeAstronaut",
                        singularName: "astronaut",
                        pluralName: "astronauts",
                        countWord: "Astronaut. ",
                        toBeVerb: "is ",
                    },
                    spaceship: {
                        draggerName: "MovableSpaceship",
                        activeName: "activeRocket",
                        singularName: "spaceship",
                        pluralName: "spaceships",
                        countWord: "Spaceship. ",
                        toBeVerb: "is ",
                    },
                    groupedTerm: "pictures",
                    sceneName: "outer space",
                    starterStatus: "A bin with three pictures: an alien, an astronaut, and a spaceship. ",
                },
            };
            var imageName = "";
            var picture =
                scene !== "scene"
                    ? Object.keys(sceneObjects[scene]).filter(function (element) {
                          if (sceneObjects[scene][element].draggerName === imageName) {
                              return element;
                          }
                      })[0]
                    : "";

            function appletStarter() {
                scene =
                    ggbObject.getValue("farmScene") === 1
                        ? "farm"
                        : ggbObject.getValue("marketScene") === 1
                        ? "market"
                        : ggbObject.getValue("dinoScene") === 1
                        ? "prehistoric"
                        : ggbObject.getValue("shipScene") === 1
                        ? "shipwreck"
                        : ggbObject.getValue("spaceScene") === 1
                        ? "space"
                        : "scene";
                imageName = "";
                picture = Object.keys(sceneObjects[scene]).filter(function (element) {
                    if (sceneObjects[scene][element].draggerName === imageName) {
                        return element;
                    }
                })[0];
                initList = determineImageOrder();
                addedList = ggbObject.getValueString("addedList");
                //creates the tabOrder list based off of the (rest of comment)
                setTabOrder(initList, addedList, enders);
                createConstrainingRegions(initList);
                setStatusText();
            }

            if (ggbObject.getValue("Length(tabOrder)") === 0 && scene !== "scene") {
                appletStarter();
            }

            registerSafeObjectUpdateListener("farmScene", appletStarter);
            registerSafeObjectUpdateListener("dinoScene", appletStarter);
            registerSafeObjectUpdateListener("marketScene", appletStarter);
            registerSafeObjectUpdateListener("shipScene", appletStarter);
            registerSafeObjectUpdateListener("spaceScene", appletStarter);

            function createConstrainingRegions(initList) {
                initList.split(",").forEach(function (element) {
                    let objectWidth = ggbObject.getValue("x(Corner(" + element + ",3))-x(Corner(" + element + ",1))");
                    let objectHeight = ggbObject.getValue("y(Corner(" + element + ",3))-y(Corner(" + element + ",1))");
                    ggbObject.evalCommand(
                        element +
                            "regionLeft=Polygon({corner1, corner2 - (" +
                            objectWidth +
                            ", 0), (x(corner3) - " +
                            objectWidth +
                            ", y(BackgroundTL) - " +
                            objectHeight +
                            "), (x(corner4), y(BackgroundTL) - " +
                            objectHeight +
                            ")})"
                    );
                    ggbObject.evalCommand(
                        element +
                            "regionRight=Polygon({corner1 + (" +
                            objectWidth +
                            ", 0), corner2, (x(corner3), y(BackgroundTL) - " +
                            objectHeight +
                            "), (x(corner4) + " +
                            objectWidth +
                            ", y(BackgroundTL) - " +
                            objectHeight +
                            ")})"
                    );
                    ggbObject.setVisible(element + "regionLeft", false);
                    ggbObject.setVisible(element + "regionRight", false);
                    ggbObject.setFixed(element + "regionLeft", true, false);
                    ggbObject.setFixed(element + "regionRight", true, false);
                    constrainPoints(element.replace("Movable", "") + "EndBL", objectWidth, objectHeight, "left");
                    constrainPoints(element.replace("Movable", "") + "EndBR", objectWidth, objectHeight, "right");
                });
            }

            function defineStatusName() {
                // put the name of your GGB status text object here
                return "AAppletStatus";
            }
            // listeners here; keep these, add your own as needed
            ggbObject.registerClientListener(function (a) {
                clientFunction(a);
                libClientFunction(a);
            });
            ggbObject.registerClickListener(function (a) {
                clickListenerFunction(a);
                libClickFunction(a);
            });

            ggbcanvas.addEventListener("keyup", function (event) {
                keyit(event);
                libKeyFunction(event);
            });
            // registerSafeObjectUpdateListener("displayedKeyboardInstructions", function () {
            // });
            function defineButtonClickScripts() {
                // defines button scripts
                // keep this function, but you can delete anything/everything inside it
                return {
                    ggbButton1: function () {
                        reset();
                    },
                    ggbButton2: function () {},
                    ggbButton3: function () {},
                    ggbButton4: function () {},
                    ggbButton5: function () {},
                };
            }

            function defineKeyboardInstructions(obj) {
                // takes a GGB object name as an argument, returns its keyboard text.
                if (ggbObject.getObjectType(obj) === "image") {
                    return "Use the arrow keys to move the picture.";
                }
                const keyboardInstructions = {
                    ggbButton1: ggbObject.getValue("ggbButton1Enabled") ? "Press space to reset the activity." : unavailableButtonText,
                    ggbButton2: ggbObject.getValue("ggbButton2Enabled") ? "Press space to ___." : unavailableButtonText,
                    ggbButton3: ggbObject.getValue("ggbButton3Enabled") ? "Press space to ___." : unavailableButtonText,
                    ggbButton4: ggbObject.getValue("ggbButton4Enabled") ? "Press space to ___." : unavailableButtonText,
                    ggbButton5: ggbObject.getValue("ggbButton5Enabled") ? "Press space to ___." : unavailableButtonText,
                };
                return keyboardInstructions[obj];
            }

            //client listener function that creates new images when they're pulled out of the bin and deletes them when they're put back in
            function clientFunction(event) {
                switch (event.type) {
                    case "select":
                        {
                            console.log("select", event.target);
                            imageName = event.target;
                            if (
                                ggbObject.getObjectType(imageName) != "button" &&
                                !imageName.includes("Icon") &&
                                !imageName.includes("Instructions") &&
                                !imageName.includes("tabOrder") &&
                                !imageName.includes("Status")
                            ) {
                                ggbObject.setLayer(imageName, 3);
                                if (imageName.includes("Movable")) {
                                    picture = Object.keys(sceneObjects[scene]).filter(function (element) {
                                        if (sceneObjects[scene][element].draggerName === imageName) {
                                            return element;
                                        }
                                    })[0];
                                    console.log(
                                        "Move the ".concat(
                                            sceneObjects[scene][picture].singularName,
                                            " to the right to move a new ",
                                            sceneObjects[scene][picture].singularName,
                                            " on to the ",
                                            sceneObjects[scene].sceneName,
                                            ". Press space to count the ",
                                            sceneObjects[scene][picture].pluralName,
                                            " on the ",
                                            sceneObjects[scene].sceneName,
                                            "."
                                        )
                                    );
                                    ggbReadText(
                                        "Move the ".concat(
                                            sceneObjects[scene][picture].singularName,
                                            " to the right to move a new ",
                                            sceneObjects[scene][picture].singularName,
                                            " on to the ",
                                            sceneObjects[scene].sceneName,
                                            ". Press space to count the ",
                                            sceneObjects[scene][picture].pluralName,
                                            " on the ",
                                            sceneObjects[scene].sceneName,
                                            "."
                                        )
                                    );
                                }
                            }
                        }
                        break;
                    // case "deselect":
                    case "dragEnd":
                        console.log("dragEnd", imageName);
                        //need to know if object is in the bin or not.
                        makeAndDeleteObjects(imageName, scene);
                        break;
                }
            }
            function findActiveNum(image) {
                let imageList = ggbObject.getAllObjectNames("image").filter(function (element) {
                    return element.includes(image.replace(/\d*/g, "")) && !element.includes("Movable") && !element.includes("Perma");
                });
                console.log(imageList);
                return imageList.length;
            }

            function clickListenerFunction(a) {
                // switch (a) {}
            }

            function keyit(event) {
                let imageShort = imageName.replace("Movable", "");
                console.log(event.code.includes("ArrowRight"), imageName.includes("Movable"), ggbObject.getValue("IsInRegion(" + imageShort + "EndBL, bin)"));
                switch (true) {
                    case event.code.includes("ArrowRight") &&
                        imageName.includes("Movable") &&
                        ggbObject.getValue("IsInRegion(" + imageShort + "EndBL, bin)") === 1:
                        {
                            picture = Object.keys(sceneObjects[scene]).filter(function (element) {
                                if (sceneObjects[scene][element].draggerName === imageName) {
                                    return element;
                                }
                            })[0];
                            let xAdjust = 40 * Math.random();
                            let yAdjust = 5 * Math.random();
                            ggbObject.setCoords(
                                imageShort + "EndBL",
                                ggbObject.getXcoord(imageShort + "EndBL") + 50 + xAdjust,
                                ggbObject.getYcoord(imageShort + "EndBL") + yAdjust
                            );
                            ggbObject.setCoords(
                                imageShort + "EndBR",
                                ggbObject.getXcoord(imageShort + "EndBR") + 50 + xAdjust,
                                ggbObject.getYcoord(imageShort + "EndBR") + yAdjust
                            );
                            makeAndDeleteObjects(imageName, scene);
                        }
                        break;
                    case event.code.includes("ArrowRight") &&
                        imageName.includes("Movable") &&
                        ggbObject.getValue("IsInRegion(" + imageShort + "EndBL, bin)") === 0:
                        {
                            picture = Object.keys(sceneObjects[scene]).filter(function (element) {
                                if (sceneObjects[scene][element].draggerName === imageName) {
                                    return element;
                                }
                            })[0];
                            makeAndDeleteObjects(imageName, scene);
                        }
                        break;
                    case !imageName.includes("Movable") && ggbObject.getXcoord(imageName + "Point1") < -5:
                        {
                            makeAndDeleteObjects(imageName, scene);
                        }
                        break;
                    case imageName.includes("Movable") && event.code.includes("Space"):
                        {
                            let countString = "";
                            for (let i = 0, L = ggbObject.getValue("active" + imageShort); i < L; i++) {
                                countString = countString.concat(sceneObjects[scene][picture].countWord);
                            }
                            console.log("Count the ".concat(sceneObjects[scene][picture].pluralName, ". ", countString));
                            ggbReadText("Count the ".concat(sceneObjects[scene][picture].pluralName, ". ", countString));
                        }
                        break;
                    default:
                        break;
                }
            }

            function associateImages(image, point1, point2) {
                //get XML of element as a string
                var xmlstring = ggbApplet.getXML(image);

                //convert XML string to XML document
                var parser = new DOMParser();
                var xmldom = parser.parseFromString(xmlstring, "application/xml");

                //naviagte the XML DOM to change the value of an attribute
                xmldom.getElementsByTagName("startPoint")[0].setAttribute("exp", point1);
                xmldom.getElementsByTagName("startPoint")[1].setAttribute("exp", point2);

                //convert the XML document back into a string
                var serializer = new XMLSerializer();
                xmlstring = serializer.serializeToString(xmldom);

                //evaluate XML string to update the element in Geogebra
                ggbApplet.evalXML(xmlstring);
            }

            function constrainPoints(myPoint, objectWidth, objectHeight, side = "left") {
                //get XML of element as a string
                var xmlstring = ggbObject.getXML(myPoint);
                //!!!! if the xmlstring above has an expression tag, uncomment the next line of code. This happens when the object is created after the applet is loaded.
                //xmlstring = xmlstring.slice(xmlstring.indexOf("/>") + 2);
                //convert XML string to XML document
                var parser = new DOMParser();
                var xmldom = parser.parseFromString(xmlstring, "application/xml");
                //create new node for ggbscript
                var node = xmldom.createElement("ggbscript");
                var element = xmldom.documentElement;
                var position = xmldom.getElementsByTagName("objColor")[0];
                element.insertBefore(node, position);
                //naviagte the XML DOM to change the value of an
                switch (side) {
                    case "left":
                        xmldom
                            .getElementsByTagName("ggbscript")[0]
                            .setAttribute(
                                "onUpdate",
                                "SetCoords(" +
                                    myPoint +
                                    ", If(x(" +
                                    myPoint +
                                    ") < xMinButtonBar, xMinButtonBar, If(x(" +
                                    myPoint +
                                    ") >= xMax-" +
                                    objectWidth +
                                    ", xMax-" +
                                    objectWidth +
                                    ", x(" +
                                    myPoint +
                                    "))), If(y(" +
                                    myPoint +
                                    ") < yMinButtonBar, yMinButtonBar, If(y(" +
                                    myPoint +
                                    ") >= yMaxButtonBar-buttonBarHeight-" +
                                    objectHeight +
                                    ", yMaxButtonBar-buttonBarHeight-" +
                                    objectHeight +
                                    ", y(" +
                                    myPoint +
                                    "))))"
                            );
                        break;
                    case "right":
                        xmldom
                            .getElementsByTagName("ggbscript")[0]
                            .setAttribute(
                                "onUpdate",
                                "SetCoords(" +
                                    myPoint +
                                    ", If(x(" +
                                    myPoint +
                                    ") < xMinButtonBar+" +
                                    objectWidth +
                                    ", xMinButtonBar+" +
                                    objectWidth +
                                    ", If(x(" +
                                    myPoint +
                                    ") >= xMax, xMax, x(" +
                                    myPoint +
                                    "))), If(y(" +
                                    myPoint +
                                    ") < yMinButtonBar, yMinButtonBar, If(y(" +
                                    myPoint +
                                    ") >= yMaxButtonBar-buttonBarHeight-" +
                                    objectHeight +
                                    ", yMaxButtonBar-buttonBarHeight-" +
                                    objectHeight +
                                    ", y(" +
                                    myPoint +
                                    "))))"
                            );
                        break;
                    default:
                        break;
                }
                //convert the XML document back into a string
                var serializer = new XMLSerializer();
                xmlstring = serializer.serializeToString(xmldom);
                //evaluate XML string to update the element in Geogebra
                ggbObject.evalXML(xmlstring);
            }

            //function that gets the vertical order of images on the screen if they contain the word "Movable"
            function determineImageOrder() {
                //gets all of the visible images with "Movable" in their name
                var allInits = ggbObject.getAllObjectNames("image").filter(function (element) {
                    return element.startsWith("Movable") && ggbObject.getVisible(element);
                });
                //sorts the images from the previous array based on their y-coordinate
                var sortedInits = allInits.sort(function (a, b) {
                    //cuts off the "Movable" part of the name so that we can find the coordinate of a related point
                    let aName = a.slice(7);
                    let bName = b.slice(7);
                    //determines which y-coord is bigger and returns a number accordingly to tell the sort which order they go in
                    if (ggbObject.getYcoord(aName + "StartBL") > ggbObject.getYcoord(bName + "StartBL")) {
                        return -1;
                    }
                    if (ggbObject.getYcoord(aName + "StartBL") < ggbObject.getYcoord(bName + "StartBL")) {
                        return 1;
                    }
                    // a must be equal to b
                    return 0;
                });
                var initList = sortedInits.join(",");
                return initList;
            }

            function reset() {
                console.log(
                    "The interactive is reset. All the ".concat(
                        sceneObjects[scene].groupedTerm,
                        " on the ",
                        sceneObjects[scene].sceneName,
                        " returned to the bin. There are no ",
                        sceneObjects[scene].groupedTerm,
                        " on the ",
                        sceneObjects[scene].sceneName,
                        ". "
                    )
                );
                ggbReadText(
                    "The interactive is reset. All the ".concat(
                        sceneObjects[scene].groupedTerm,
                        " on the ",
                        sceneObjects[scene].sceneName,
                        " returned to the bin. There are no ",
                        sceneObjects[scene].groupedTerm,
                        " on the ",
                        sceneObjects[scene].sceneName,
                        ". "
                    )
                );
                addedList = "";
                ggbObject.setTextValue("addedList", "");
                setTabOrder(initList, addedList, enders);
                let images = ggbObject.getAllObjectNames("image");
                for (let i = 0, L = images.length; i < L; i++) {
                    if (!images[i].includes("Movable") && !images[i].includes("Perma") && !images[i].includes("Scene") && !images[i].includes("Icon")) {
                        ggbObject.deleteObject(images[i]);
                    } else if (images[i].includes("Movable")) {
                        ggbObject.setCoords(
                            images[i].replace("Movable", "") + "EndBL",
                            ggbObject.getXcoord(images[i].replace("Movable", "") + "StartBL"),
                            ggbObject.getYcoord(images[i].replace("Movable", "") + "StartBL")
                        );
                        ggbObject.setCoords(
                            images[i].replace("Movable", "") + "EndBR",
                            ggbObject.getXcoord(images[i].replace("Movable", "") + "StartBR"),
                            ggbObject.getYcoord(images[i].replace("Movable", "") + "StartBR")
                        );
                    }
                }
                let activeList = ggbObject.getAllObjectNames();
                for (let i = 0, L = activeList.length; i < L; i++) {
                    if (activeList[i].includes("active")) {
                        ggbObject.setValue(activeList[i], 1);
                    }
                }
            }

            function setStatusText() {
                console.log("setStatusText running");
                let statusText = "";
                let countString = "";
                let activeList = [];
                Object.values(sceneObjects[scene]).forEach((element) => {
                    if (element.activeName) {
                        activeList.push(element);
                    }
                });
                console.log(activeList);
                activeList.forEach(function (element) {
                    for (let i = 0, L = ggbObject.getValue(element.activeName); i < L; i++) {
                        countString = countString.concat(element.countWord);
                    }
                });
                statusText = sceneObjects[scene].starterStatus.concat(
                    "Count the ",
                    sceneObjects[scene].groupedTerm,
                    ". ",
                    countString,
                    "Press the escape key to exit the interactive and return to the page."
                );
                console.log(statusText);
                ggbObject.setTextValue("AAppletStatus", statusText);
            }

            function makeAndDeleteObjects(imageName, scene) {
                console.log(imageName, scene);
                if (imageName.includes("Movable")) {
                    let newImageName = imageName.replace("Movable", "");
                    let picture = Object.keys(sceneObjects[scene]).filter(function (element) {
                        if (sceneObjects[scene][element].draggerName === imageName) {
                            return element;
                        }
                    })[0];
                    if (ggbObject.getXcoord(newImageName + "EndBL") > -1) {
                        //rename the Movable Chicken to chicken 1
                        var objectNumber = 1;
                        // var objectNumber = findActiveNum(newImageName) + 1;
                        ////////////////////  Numbering system to avoid bamfing here  ////////////////////
                        while (ggbObject.exists(newImageName + objectNumber)) {
                            objectNumber++;
                            console.log("yikes", newImageName + objectNumber);
                        }
                        ggbObject.evalCommand(newImageName + objectNumber + "Point1=PointIn(Movable" + newImageName + "regionLeft)");
                        ggbObject.setCoords(
                            newImageName + objectNumber + "Point1",
                            ggbObject.getXcoord(newImageName + "EndBL"),
                            ggbObject.getYcoord(newImageName + "EndBL")
                        );
                        ggbObject.evalCommand(newImageName + objectNumber + "Point2=PointIn(Movable" + newImageName + "regionRight)");
                        ggbObject.setCoords(
                            newImageName + objectNumber + "Point2",
                            ggbObject.getXcoord(newImageName + "EndBR"),
                            ggbObject.getYcoord(newImageName + "EndBR")
                        );
                        ggbObject.evalCommand(newImageName.concat(objectNumber) + "=CopyFreeObject(Movable" + newImageName + ")");
                        associateImages(newImageName.concat(objectNumber), newImageName + objectNumber + "Point1", newImageName + objectNumber + "Point2");
                        ggbObject.setLayer(newImageName + objectNumber, 2);
                        ggbObject.setVisible(newImageName + objectNumber + "Point1", false);
                        ggbObject.setVisible(newImageName + objectNumber + "Point2", false);
                        ggbObject.setValue("active" + newImageName, findActiveNum(newImageName));
                        addedList = manageAddedList(newImageName.concat(objectNumber), true);
                        setTabOrder(initList, addedList, enders);
                        setStatusText();
                    }
                    ggbObject.setLayer(newImageName, 2);
                    ggbObject.setCoords(newImageName + "EndBL", ggbObject.getXcoord(newImageName + "StartBL"), ggbObject.getYcoord(newImageName + "StartBL"));
                    ggbObject.setCoords(newImageName + "EndBR", ggbObject.getXcoord(newImageName + "StartBR"), ggbObject.getYcoord(newImageName + "StartBR"));
                    console.log(
                        "A new ".concat(
                            sceneObjects[scene][picture].singularName,
                            " ",
                            sceneObjects[scene][picture].toBeVerb,
                            "in the ",
                            sceneObjects[scene].sceneName,
                            ". Move the ",
                            sceneObjects[scene][picture].singularName,
                            " to the right to move a new ",
                            sceneObjects[scene][picture].singularName,
                            " on to the ",
                            sceneObjects[scene].sceneName,
                            ". Press space to count the ",
                            sceneObjects[scene][picture].pluralName,
                            " on the ",
                            sceneObjects[scene].sceneName,
                            "."
                        )
                    );
                    ggbReadText(
                        "A new ".concat(
                            sceneObjects[scene][picture].singularName,
                            " ",
                            sceneObjects[scene][picture].toBeVerb,
                            "in the ",
                            sceneObjects[scene].sceneName,
                            ". Move the ",
                            sceneObjects[scene][picture].singularName,
                            " to the right to move a new ",
                            sceneObjects[scene][picture].singularName,
                            " on to the ",
                            sceneObjects[scene].sceneName,
                            ". Press space to count the ",
                            sceneObjects[scene][picture].pluralName,
                            " on the ",
                            sceneObjects[scene].sceneName,
                            "."
                        )
                    );

                    newImageName = storedImageName;
                } else if (!imageName.includes("Movable") && ggbObject.getXcoord(imageName + "Point1") < -5) {
                    console.log(ggbObject.getValueString("addedList"), manageAddedList(imageName, false), "imageName", imageName);
                    setTabOrder(initList, manageAddedList(imageName, false), enders);
                    console.log(ggbObject.getDefinitionString("tabOrder"));
                    console.log("tabOrder");
                    setStatusText();
                    console.log("".concat(imageName, " ", sceneObjects[scene][picture].toBeVerb, "in the bin."));
                    ggbReadText("".concat(imageName, " ", sceneObjects[scene][picture].toBeVerb, "in the bin."));
                    ggbObject.deleteObject(imageName);
                    console.log("is there life after delete?");
                    ggbObject.setValue(sceneObjects[scene][picture].activeName, findActiveNum(imageName));
                    console.log(ggbObject.getValue(sceneObjects[scene][picture].activeName));
                }
            }
        }

        /*
         * IGNORE BELOW
         */
    );
    function loadUtils() {
        function parseJS(JSString) {
            return Function("" + JSString)();
        }
        if (!window.didUtils || !window.didUtils.setupGGB) {
            return fetch("https://cdn.digital.greatminds.org/did-utils/latest/index.js", {
                cache: "no-cache",
            })
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
