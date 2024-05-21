"use strict";
(() => {
    var __defProp = Object.defineProperty;
    var __defProps = Object.defineProperties;
    var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
    var __getOwnPropSymbols = Object.getOwnPropertySymbols;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __propIsEnum = Object.prototype.propertyIsEnumerable;
    var __defNormalProp = (obj, key, value) =>
        key in obj
            ? __defProp(obj, key, {
                  enumerable: true,
                  configurable: true,
                  writable: true,
                  value,
              })
            : (obj[key] = value);
    var __spreadValues = (a, b) => {
        for (var prop in b || (b = {}))
            if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
        if (__getOwnPropSymbols)
            for (var prop of __getOwnPropSymbols(b)) {
                if (__propIsEnum.call(b, prop))
                    __defNormalProp(a, prop, b[prop]);
            }
        return a;
    };
    var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
    var __export = (target, all) => {
        for (var name in all)
            __defProp(target, name, { get: all[name], enumerable: true });
    };

    // utils/src/health/index.js
    var health_exports = {};
    __export(health_exports, {
        showHealth: () => showHealth_default,
    });

    // utils/src/health/showHealth.js
    function showHealth_default() {
        console.log("The library synced v1.20.0");
        console.log("Library is working v1.20.0");
    }

    // utils/src/index.js
    var src_exports = {};
    __export(src_exports, {
        arrayEquals: () => arrayEquals_default,
        cD: () => cD_default,
        carousel: () => carousel_default,
        changeScreaderLabel: () => changeScreaderLabel_default,
        disappear: () => disappear_default,
        displayErrorMessage: () => displayErrorMessage_default,
        fakeSubmit: () => fakeSubmit_default,
        fakeSubmitFIB: () => fakeSubmitFIB_default,
        fakeSubmitInput: () => fakeSubmitInput_default,
        fakeSubmitRTE: () => fakeSubmitRTE_default,
        fakeSubmitSelect: () => fakeSubmitSelect_default,
        fakeSubmitTable: () => fakeSubmitTable_default,
        getData: () => getData_default,
        getDocument: () => getDocument_default,
        getPrevComp: () => getPrevComp_default,
        getText: () => getText_default,
        hide: () => hide_default,
        makeBlockQuote: () => makeBlockQuote_default,
        makeEditXML: () => editXML_default,
        makeEnableButton: () => enableButton_default,
        makeGetCanvas: () => getCanvas_default,
        makeGgbReadText: () => ggbReadText_default,
        makeIsPoly: () => isPoly_default,
        makeLibClickFunction: () => libClickFunction_default,
        makeLibClientFunction: () => libClientFunction_default,
        makeLibDefineKeyboardInstructions: () =>
            libDefineKeyboardInstructions_default,
        makeLibKeyFunction: () => libKeyFunction_default,
        makeManageAddedList: () => manageAddedList_default,
        makePointIncrement: () => pointIncrement_default,
        makeReadKeyboardInstructions: () => readKeyboardInstructions_default,
        makeRegisterHoverListener: () => registerHoverListener_default,
        makeRegisterSafeObjectClickListener: () =>
            registerSafeObjectClickListener_default,
        makeRegisterSafeObjectUpdateListener: () =>
            registerSafeObjectUpdateListener_default,
        makeSetAriaLabel: () => setAriaLabel_default,
        makeSetTabOrder: () => setTabOrder_default,
        makeShowSelection: () => showSelection_default,
        makeUpdateKeyboardInstructions: () =>
            updateKeyboardInstructions_default,
        newFunction: () => newFunction_default,
        onInit: () => onInit_default,
        round: () => round_default,
        saveData: () => saveData_default,
        setupGGB: () => setupGGB_default,
        show: () => show_default,
        showHideAndReset: () => showHideAndReset_default,
        textResizer: () => textResizer_default,
        undoLaTeX: () => undoLaTeX_default,
        validateNum: () => validateNum_default,
    });

    // utils/src/saveData.js
    function saveData_default(dataObj = {}, component) {
        var _a;
        if (!component) {
            console.error(
                "saveData error: Be sure to pass a component to use for storage!"
            );
            return;
        }
        (_a = component.storage) != null ? _a : (component.storage = {});
        const tempStorage = JSON.parse(JSON.stringify(component.storage));
        const tempDataObj = JSON.parse(JSON.stringify(dataObj));
        component.storage = __spreadValues(
            __spreadValues({}, tempStorage),
            tempDataObj
        );
    }

    // utils/src/getData.js
    function getData_default(dataName, component) {
        var _a;
        if (!component) {
            console.error(
                "getData error: Be sure to pass the component you used for storage!"
            );
            return;
        }
        return (_a = component == null ? void 0 : component.storage) == null
            ? void 0
            : _a[dataName];
    }

    // utils/src/setVis.js
    function setVis_default(bool, ...args) {
        const nopeTypes = [
            "select",
            "categorization",
            "fillblank",
            "complextable",
        ];
        for (let i = 0, L = args.length; i < L; i++) {
            const current = args[i];
            if (nopeTypes.includes(current.type)) {
                current.setVisible(bool);
            } else if (current.type === "separator") {
                if (!getData_default("saveSize", current)) {
                    saveData_default({ saveSize: current.data.size }, current);
                }
                const pix = bool ? getData_default("saveSize", current) : "0px";
                current.updateData({ size: pix, flex: false });
            } else {
                current.updateData({ visible: bool });
            }
        }
    }

    // utils/src/show.js
    function show_default(...args) {
        setVis_default(true, ...args);
    }

    // utils/src/setVisBehavior.js
    function setVisBehavior_default(vb, ...args) {
        const nopeTypes = [
            "categorization",
            "select",
            "fillblank",
            "separator",
        ];
        const behavior = ["none", "hide"][vb];
        for (let i = 0, L = args.length; i < L; i++) {
            const current = args[i];
            if (nopeTypes.includes(current.type)) {
                if (current.type !== "separator") {
                    console.error(
                        `Can't update visibility behavior for ${current.type}.`
                    );
                }
                continue;
            } else if (current.type === "complextable") {
                current.setVisibilityBehavior(behavior);
            } else {
                current.updateData({ visibilityBehavior: behavior });
            }
        }
    }

    // utils/src/hide.js
    function hide_default(...args) {
        setVisBehavior_default(1, ...args);
        setVis_default(false, ...args);
    }

    // utils/src/disappear.js
    function disappear_default(...args) {
        setVisBehavior_default(0, ...args);
        setVis_default(false, ...args);
    }

    // utils/src/getText.js
    function getText_default(obj) {
        var _a, _b, _c, _d;
        if (obj.math) {
            const tempText =
                (_b = (_a = obj.text) == null ? void 0 : _a.toString()) == null
                    ? void 0
                    : _b.trim();
            const tempTextOrValue =
                tempText !== void 0
                    ? tempText
                    : (_d =
                            (_c = obj.value) == null
                                ? void 0
                                : _c.toString()) == null
                      ? void 0
                      : _d.trim();
            if (tempTextOrValue === void 0) {
                console.warn(
                    "Error in getText; unexpected object passed; object logged below"
                );
                console.log(obj);
                return "";
            }
            const tempStrLength = tempTextOrValue.length;
            return tempTextOrValue === ""
                ? ""
                : (tempTextOrValue.charAt(0) === "$" &&
                        tempTextOrValue.charAt(tempStrLength - 1) === "$") ||
                    (tempTextOrValue.substring(0, 5) === "<math" &&
                        tempTextOrValue.substring(
                            tempStrLength - 7,
                            tempStrLength
                        ) === "</math>")
                  ? tempTextOrValue
                  : `$${tempTextOrValue}$`;
        }
        switch (true) {
            case typeof obj.text === "string": {
                return obj.text.trim();
            }
            case typeof obj.value === "string": {
                return obj.value.trim();
            }
            default: {
                console.warn(
                    "Error in getText; unexpected object passed; object logged below"
                );
                console.log(obj);
                return "";
            }
        }
    }

    // utils/src/getPrevComp.js
    function getPrevComp_default(obj) {
        var _a, _b, _c, _d;
        if (typeof obj !== "object") {
            console.warn(
                "Error in getPrevComp DID Library function: Be sure argument for getPrevComp is a single object."
            );
            console.warn("argument passed to getPrevComp: %o", obj);
            console.warn(
                "typeof argument passed to getPrevComp: %o",
                typeof obj
            );
            return;
        }
        const { slideID, compName, compType, utils, components } = obj;
        if (
            typeof slideID !== "string" ||
            typeof compName !== "string" ||
            typeof compType !== "string"
        ) {
            console.warn(
                "Error in getPrevComp DID Library function: Be sure argument for getPrevComp is a single object containing keys for slideID, compName and compType. Each of the values should be strings."
            );
            console.warn("argument passed to getPrevComp: %o", obj);
            return;
        }
        const compTypeToLower = compType.toLowerCase();
        const slideNum = utils.getSlideNum(slideID);
        const goBackString = returnGoBackString();
        const goBackStringKatex = returnGoBackString("katex");
        switch (compTypeToLower) {
            case "complextable":
            case "tablecomplex": {
                const defComplexTable = {
                    data: {
                        rows: [],
                    },
                    isDefault: true,
                    type: "complextable",
                };
                const defCell = {
                    alignment: "center",
                    ariaLabel: "Please add text",
                    className: "",
                    colSpan: 1,
                    editable: true,
                    inputType: "text",
                    math: true,
                    merged: false,
                    mixedText: [
                        {
                            type: "paragraph",
                            children: [
                                {
                                    text: "",
                                },
                            ],
                        },
                    ],
                    numberOfLines: "1",
                    rowSpan: 1,
                    scope: "col",
                    showAreaToolTip: true,
                    type: "singleline",
                    value: "",
                };
                const numDefRows = 12;
                for (let i = 0; i < numDefRows; i++) {
                    const singleRow = [];
                    for (let j = 0; j < numDefRows / 2; j++) {
                        singleRow.push(defCell);
                    }
                    defComplexTable.data.rows.push([...singleRow]);
                }
                const prevComplexTable = jsonParseAndStringify(
                    utils.getFromSlide(slideID, compName, defComplexTable) ||
                        defComplexTable
                );
                const tempArray = [];
                for (
                    let i = 0, L = prevComplexTable.data.rows.length;
                    i < L;
                    i++
                ) {
                    for (
                        let j = 0, Lj = prevComplexTable.data.rows[i].length;
                        j < Lj;
                        j++
                    ) {
                        tempArray.push(prevComplexTable.data.rows[i][j]);
                    }
                }
                const isDefault = setIsDefault(prevComplexTable);
                prevComplexTable.data.hasData = isDefault
                    ? false
                    : tempArray.some((cell) => {
                          return typeof cell.scope !== "undefined"
                              ? false
                              : getText_default(cell);
                      });
                prevComplexTable.data.isComplete = isDefault
                    ? false
                    : tempArray.every((cell) => {
                          return cell.merged ||
                              typeof cell.scope !== "undefined"
                              ? true
                              : getText_default(cell);
                      });
                addStandardProps(prevComplexTable);
                prevComplexTable.getCell = returnGetCellFunction();
                prevComplexTable.getCellKatex = returnGetCellFunction("katex");
                prevComplexTable.fillCells = returnFillCellsFunction();
                prevComplexTable.fillCellsKatex =
                    returnFillCellsFunction("katex");
                return __spreadValues({}, prevComplexTable);
            }
            case "fib":
            case "fillblank": {
                const defFib = {
                    data: { values: [] },
                    isDefault: true,
                    type: "fillblank",
                };
                const prevFib = jsonParseAndStringify(
                    utils.getFromSlide(slideID, compName, defFib) || defFib
                );
                const isDefault = setIsDefault(prevFib);
                prevFib.data.hasData = isDefault
                    ? false
                    : prevFib.data.values.some((blank) =>
                          getText_default(blank)
                      );
                prevFib.data.isComplete = isDefault
                    ? false
                    : prevFib.data.values.every((blank) =>
                          getText_default(blank)
                      );
                addStandardProps(prevFib);
                prevFib.getInput = returnFibGetInputFunction();
                prevFib.getInputKatex = returnFibGetInputFunction("katex");
                prevFib.data.processedInputs = fibProcessedInputs(prevFib);
                prevFib.data.processedInputsKatex = fibProcessedInputs(
                    prevFib,
                    "katex"
                );
                return __spreadValues({}, prevFib);
            }
            case "ggb":
            case "geogebra": {
                const { ggbInnerDataDefault } = obj;
                const storageComp = (function () {
                    const allComps = Object.keys(components).sort();
                    const firstComp = allComps[0];
                    if (!firstComp) {
                        console.warn(
                            "Error in getPrevComp DID Library function: No components found on slide."
                        );
                        return;
                    }
                    return firstComp;
                })();
                const defGGB = {
                    data: {},
                    innerData: ggbInnerDataDefault,
                    isDefault: true,
                    type: "geogebra",
                };
                if (typeof ggbInnerDataDefault !== "object") {
                    console.warn(
                        "Error in getPrevComp DID Library function: Be sure argument for getPrevComp includes property of ggbInnerDataDefault and that it is an object that includes your desired innerData."
                    );
                    console.warn("argument passed to getPrevComp: %o", obj);
                    console.warn(
                        "ggbInnerDataDefault passed to getPrevComp: %o",
                        ggbInnerDataDefault
                    );
                    console.warn(
                        "typeof ggbInnerDataDefault passed to getPrevComp: %o",
                        typeof ggbInnerDataDefault
                    );
                    return;
                }
                let prevGGB = jsonParseAndStringify(
                    utils.getFromSlide(slideID, compName, defGGB) || defGGB
                );
                const isDefault = setIsDefault(prevGGB);
                const hasData = !(
                    isDefault ||
                    !Object.keys(prevGGB).includes("innerData") ||
                    !Object.keys(prevGGB.innerData).length
                );
                if (typeof prevGGB.innerData === "undefined") {
                    prevGGB.innerData = ggbInnerDataDefault;
                }
                prevGGB.data.hasData = hasData;
                addStandardProps(prevGGB);
                const existingData = getData_default(
                    `oldData${slideID + compName}`,
                    components[storageComp]
                );
                const hadData =
                    hasData ||
                    ((_a = existingData == null ? void 0 : existingData.data) ==
                    null
                        ? void 0
                        : _a.hadData) ||
                    false;
                if (hasData) {
                    prevGGB.data.hadData = hadData;
                    const newData = {};
                    newData[`oldData${slideID + compName}`] = __spreadValues(
                        {},
                        prevGGB
                    );
                    saveData_default(newData, components[storageComp]);
                } else if (
                    (_b = existingData == null ? void 0 : existingData.data) ==
                    null
                        ? void 0
                        : _b.hasData
                ) {
                    prevGGB = __spreadValues({}, existingData);
                }
                return __spreadValues({}, prevGGB);
            }
            case "input": {
                const defInput = {
                    data: {
                        text: "",
                        inputType: "text",
                    },
                    isDefault: true,
                    type: "input",
                };
                const prevInput = jsonParseAndStringify(
                    utils.getFromSlide(slideID, compName, defInput) || defInput
                );
                const isDefault = setIsDefault(prevInput);
                prevInput.data.hasData = isDefault
                    ? false
                    : !!getText_default(prevInput.data);
                if (!prevInput.data.hasData) {
                    prevInput.data.text = goBackString;
                    prevInput.data.textKatex = goBackStringKatex;
                }
                addStandardProps(prevInput);
                return __spreadValues({}, prevInput);
            }
            case "rte":
            case "richtexteditor": {
                const defRTE = {
                    data: {
                        text: "",
                    },
                    isDefault: true,
                    type: "richtexteditor",
                };
                const prevRTE = jsonParseAndStringify(
                    utils.getFromSlide(slideID, compName, defRTE) || defRTE
                );
                const isDefault = setIsDefault(prevRTE);
                const noLocalData =
                    typeof ((_c =
                        prevRTE == null ? void 0 : prevRTE.localData) == null
                        ? void 0
                        : _c.inputs) === "undefined";
                prevRTE.data.inputs = rteProcessedInputs(prevRTE, noLocalData);
                prevRTE.data.inputsKatex = rteProcessedInputs(
                    prevRTE,
                    noLocalData,
                    "katex"
                );
                const tempInputs =
                    (_d = prevRTE == null ? void 0 : prevRTE.localData) == null
                        ? void 0
                        : _d.inputs;
                prevRTE.data.hasData =
                    noLocalData || isDefault
                        ? false
                        : tempInputs.length === 0
                          ? true
                          : tempInputs.some((input) => getText_default(input));
                prevRTE.data.isComplete =
                    noLocalData || isDefault
                        ? false
                        : tempInputs.length === 0
                          ? true
                          : tempInputs.every((input) => getText_default(input));
                addStandardProps(prevRTE);
                return __spreadValues({}, prevRTE);
            }
            case "select": {
                const defSelect = {
                    data: {
                        selected: [],
                        options: [{ label: "", value: "0" }],
                    },
                    isDefault: true,
                    type: "select",
                };
                const prevSelect = jsonParseAndStringify(
                    utils.getFromSlide(slideID, compName, defSelect) ||
                        defSelect
                );
                setIsDefault(prevSelect);
                prevSelect.data.hasData = !!prevSelect.data.selected.length;
                const selLabels = prevSelect.data.options
                    .map(({ value, label }) => {
                        if (prevSelect.data.selected.includes(value)) {
                            return label;
                        }
                        return void 0;
                    })
                    .filter((returnedLabel) => !!returnedLabel);
                prevSelect.data.chosenLabels = selectChosenLabels(selLabels);
                prevSelect.data.chosenLabelsKatex = selectChosenLabels(
                    selLabels,
                    "katex"
                );
                addStandardProps(prevSelect);
                return __spreadValues({}, prevSelect);
            }
            case "table":
            case "tableorig": {
                const defTable = {
                    data: { rows: [], columns: [] },
                    isDefault: true,
                    type: "table",
                };
                const defRow = {
                    value: "",
                    editable: true,
                    className: "",
                    math: true,
                    inputType: "text",
                    type: "singleline",
                    numberOfLines: "1",
                    ariaLabel: "Please add text",
                    mixedText: [
                        {
                            type: "paragraph",
                            children: [
                                {
                                    text: "",
                                },
                            ],
                        },
                    ],
                    alignment: "center",
                };
                const defColumn = {
                    value: "",
                    editable: true,
                    type: "singleline",
                    numberOfLines: "1",
                    alignment: "center",
                    ariaLabel: "Please add text",
                };
                defTable.data.columns.push(defColumn);
                defTable.data.rows.push([defRow]);
                const prevTable = jsonParseAndStringify(
                    utils.getFromSlide(slideID, compName, defTable) || defTable
                );
                const isDefault = setIsDefault(prevTable);
                prevTable.data.hasData = isDefault
                    ? false
                    : prevTable.data.rows.some((row) =>
                          row.some((cell) => getText_default(cell))
                      ) ||
                      (obj.studentsCanEditTableHeaders
                          ? prevTable.data.columns.some(({ value }) => value)
                          : false);
                prevTable.data.isComplete = isDefault
                    ? false
                    : prevTable.data.rows.every((row) =>
                          row.every((cell) => getText_default(cell))
                      );
                addStandardProps(prevTable);
                prevTable.getCell = returnGetCellFunction();
                prevTable.getCellKatex = returnGetCellFunction("katex");
                prevTable.fillCells = returnFillCellsFunction();
                prevTable.fillCellsKatex = returnFillCellsFunction("katex");
                return __spreadValues({}, prevTable);
            }
            default: {
                console.warn(
                    'Error in getPrevComp DID Library function: Please enter a valid component type for compType. These include "complextable", "fillblank", "geogebra", "input", "rte", "select", and "table".'
                );
                console.warn("argument passed to getPrevComp: %o", obj);
                console.warn(
                    "component type passed to getPrevComp: %s",
                    compType
                );
                return;
            }
        }
        function returnGoBackString(type = "") {
            switch (type) {
                case "katex": {
                    return `$\\color{707070}\\text{[no input yet on slide ${slideNum}]}$`;
                }
                default: {
                    return `<math xmlns="http://www.w3.org/1998/Math/MathML"><mtext color="#707070"><mi style="font-style: normal;">[</mi>no input yet on slide ${slideNum}<mi style="font-style: normal;">]</mi></mtext></math>`;
                }
            }
        }
        function jsonParseAndStringify(obj2) {
            return JSON.parse(JSON.stringify(obj2));
        }
        function setIsDefault(tempComp) {
            const defaultUndefined = typeof tempComp.isDefault === "undefined";
            if (defaultUndefined) {
                tempComp.isDefault = false;
            }
            return !defaultUndefined;
        }
        function addStandardProps(tempComp) {
            const tempType = tempComp.type;
            const emptyFlagText =
                tempComp.data.isComplete ||
                (tempComp.data.hasData &&
                    (tempType === "geogebra" ||
                        tempType === "input" ||
                        tempType === "select"));
            tempComp.data.goBackString = goBackString;
            tempComp.data.goBackStringKatex = goBackStringKatex;
            tempComp.data.slideNum = slideNum;
            tempComp.data.flagText = emptyFlagText ? "" : goBackString;
            tempComp.data.flagTextKatex = emptyFlagText
                ? ""
                : goBackStringKatex;
        }
        function returnGetCellFunction(type = "") {
            return function (row, col, leaveBlanks = false) {
                var _a2, _b2, _c2;
                const getCellGoBackString =
                    type === "katex" ? goBackStringKatex : goBackString;
                const tempCell =
                    (_c2 =
                        (_b2 =
                            (_a2 = this == null ? void 0 : this.data) == null
                                ? void 0
                                : _a2.rows) == null
                            ? void 0
                            : _b2[row]) == null
                        ? void 0
                        : _c2[col];
                switch (tempCell) {
                    case void 0: {
                        console.warn(
                            "Error in getCell from getPrevComp. Check row: %s and column: %s.",
                            row,
                            col
                        );
                        return {
                            value: leaveBlanks ? "" : getCellGoBackString,
                        };
                    }
                    default: {
                        const returnCell = jsonParseAndStringify(tempCell);
                        const cellContents = getText_default(returnCell);
                        returnCell.value =
                            cellContents !== "" || leaveBlanks
                                ? cellContents
                                : getCellGoBackString;
                        return returnCell;
                    }
                }
            };
        }
        function returnFillCellsFunction(type = "") {
            return function (
                tableName,
                rowStart = 0,
                colStart = 0,
                leaveBlanks = false,
                cellUpdates = {}
            ) {
                const emptyVal = leaveBlanks
                    ? ""
                    : type === "katex"
                      ? goBackStringKatex
                      : goBackString;
                for (
                    let col = 0, colLength = this.data.rows[0].length;
                    col < colLength;
                    col++
                ) {
                    for (
                        let row = 0, rowLength = this.data.rows.length;
                        row < rowLength;
                        row++
                    ) {
                        const tempCellValue = getText_default(
                            this.data.rows[row][col]
                        );
                        const cellVal =
                            tempCellValue === "" ? emptyVal : tempCellValue;
                        components[tableName].updateCell(
                            row + rowStart,
                            col + colStart,
                            __spreadProps(__spreadValues({}, cellUpdates), {
                                value: cellVal,
                            })
                        );
                    }
                }
            };
        }
        function returnFibGetInputFunction(type = "") {
            return function (position, leaveBlanks = false) {
                var _a2, _b2, _c2;
                const emptyVal = leaveBlanks
                    ? ""
                    : type === "katex"
                      ? goBackStringKatex
                      : goBackString;
                const text = (
                    (_c2 =
                        (_b2 =
                            (_a2 = this.data) == null ? void 0 : _a2.values) ==
                        null
                            ? void 0
                            : _b2[position]) == null
                        ? void 0
                        : _c2.text
                )
                    ? this.data.values[position].text
                    : emptyVal;
                return __spreadProps(
                    __spreadValues({}, this.data.values[position]),
                    { text }
                );
            };
        }
        function fibProcessedInputs(tempComp, type = "") {
            return tempComp.data.values.map((val) => {
                const tempVal = getText_default(val);
                return tempVal === ""
                    ? type === "katex"
                        ? goBackStringKatex
                        : goBackString
                    : tempVal;
            });
        }
        function rteProcessedInputs(tempComp, localDataBool, type = "") {
            return localDataBool
                ? []
                : tempComp.localData.inputs.map((blank) => {
                      const tempVal = getText_default(blank);
                      return tempVal
                          ? tempVal
                          : type === "katex"
                            ? goBackStringKatex
                            : goBackString;
                  });
        }
        function selectChosenLabels(selectedLabels, type = "") {
            return selectedLabels.length
                ? [...selectedLabels]
                : [type === "katex" ? goBackStringKatex : goBackString];
        }
    }

    // utils/src/onInit.js
    function onInit_default(callback, component) {
        if (!getData_default("initializedOnce", component)) {
            callback();
            saveData_default({ initializedOnce: true }, component);
        }
    }

    // utils/src/round.js
    function round_default(value, decimals) {
        return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
    }

    // utils/src/validateNum.js
    function validateNum_default(
        {
            input,
            types = [],
            range = [],
            rangeType = "inclusive",
            isCloze = false,
            statementType = "statement",
            utils,
        } = { input: "" }
    ) {
        var _a;
        if (!utils) {
            console.error("utils needed for validateNum!");
            return;
        }
        const isEmpty = !input;
        const evalResult = utils.math.evaluateLatex(input);
        let { value } = evalResult;
        if (value < 1e5) {
            value = round_default(value, 14);
        }
        if (!value && value !== 0) {
            value = NaN;
        }
        let { error } = evalResult;
        const useRange = range.length === 2;
        if (useRange) {
            const isInRange =
                rangeType === "inclusive"
                    ? range[0] <= value && value <= range[1]
                    : range[0] < value && value < range[1];
            if (!isInRange) {
                error = true;
            }
        }
        let title = "";
        let message = "";
        const modTypes = [];
        let mainType = "input";
        const typeChecks = [
            {
                type: "number",
                check: (value2) => !isNaN(value2) && isFinite(value2),
                modOrMain: "main",
            },
            {
                type: "integer",
                check: Number.isInteger,
                modOrMain: "main",
            },
            {
                type: "fraction",
                check: () => input.includes("\\frac"),
                modOrMain: "main",
            },
            {
                type: "decimal",
                check: (value2) => {
                    return (
                        (Number.isInteger(value2) || input.includes(".")) &&
                        !input.includes("\\frac")
                    );
                },
                modOrMain: "main",
            },
            {
                type: "positive",
                check: (value2) => value2 > 0,
                modOrMain: "mod",
            },
        ];
        typeChecks.forEach(({ type, check, modOrMain }) => {
            if (types.includes(type)) {
                if (modOrMain === "main") {
                    mainType = type;
                } else {
                    modTypes.push(type);
                }
                if (!check(value)) {
                    error = true;
                }
            }
        });
        if (error) {
            if (!modTypes.length && mainType === "input") {
                modTypes.push("valid");
            }
            const language = "english";
            const translations = {
                english: {
                    input: {
                        article: "an",
                    },
                    valid: {
                        article: "a",
                    },
                    integer: {
                        article: "an",
                    },
                    positive: {
                        article: "a",
                    },
                    number: {
                        article: "a",
                    },
                    fraction: {
                        article: "a",
                    },
                    decimal: {
                        article: "a",
                    },
                    inRange: useRange ? ` from ${range[0]} to ${range[1]}` : "",
                    createErrorMessage() {
                        const firstModifier = modTypes[0];
                        const useForArticle = firstModifier || mainType;
                        const { article } = this[useForArticle];
                        const modifiers = modTypes.length
                            ? " " + modTypes.join(" ")
                            : "";
                        const verb = isCloze
                            ? `Complete the ${statementType} by using`
                            : "Enter";
                        return {
                            title: "Input error",
                            message: `${verb} ${article}${modifiers} ${mainType}${this.inRange}.`,
                        };
                    },
                },
                spanish: {
                    input: {
                        word: "entrada",
                        gender: "feminine",
                    },
                    integer: {
                        word: "entero",
                        gender: "masculine",
                    },
                    statement: {
                        word: "declaraci\xF3n",
                        gender: "feminine",
                    },
                    equation: {
                        word: "ecuaci\xF3n",
                        gender: "feminine",
                    },
                    expression: {
                        word: "expresi\xF3n",
                        gender: "feminine",
                    },
                    number: {
                        word: "n\xFAmero",
                        gender: "masculine",
                    },
                    fraction: {
                        word: "fracci\xF3n",
                        gender: "feminine",
                    },
                    decimal: {
                        word: "decimal",
                        gender: "masculine",
                    },
                    valid: {
                        feminine: "v\xE1lida",
                        masculine: "v\xE1lido",
                    },
                    positive: {
                        feminine: "positiva",
                        masculine: "positivo",
                    },
                    inRange: useRange ? ` del ${range[0]} al ${range[1]}` : "",
                    createErrorMessage() {
                        const { word, gender } = this[mainType];
                        const article = gender === "feminine" ? "una" : "un";
                        const translatedModifiers = modTypes.map(
                            (modifier) => this[modifier][gender]
                        );
                        if (translatedModifiers.length > 1) {
                            translatedModifiers[
                                translatedModifiers.length - 1
                            ] =
                                "y " +
                                translatedModifiers[
                                    translatedModifiers.length - 1
                                ];
                        }
                        const joiner =
                            translatedModifiers.length > 2 ? ", " : " ";
                        const modifiers = translatedModifiers.length
                            ? " " + translatedModifiers.join(joiner)
                            : "";
                        const { word: statement, gender: statementGender } =
                            this[statementType];
                        const verbArticle =
                            statementGender === "feminine" ? "la" : "el";
                        const verb = isCloze
                            ? `Completa ${verbArticle} ${statement} usando`
                            : "Entra";
                        return {
                            title: "Error de entrada",
                            message: `${verb} ${article} ${word}${modifiers}${this.inRange}.`,
                        };
                    },
                },
            };
            ({ title, message } = ((_a = translations[language]) == null
                ? void 0
                : _a.createErrorMessage()) || {
                title: "Input error",
                message: "Enter a valid input.",
            });
        }
        return {
            error,
            value,
            title,
            message,
            isEmpty,
        };
    }

    // utils/src/newFunction.js
    function newFunction_default(
        components = components,
        utils = utils,
        slide = slide
    ) {
        console.log(
            `the value of components is ${components}, ${typeof components}`
        );
        console.log(`the value of components is ${utils}, ${typeof utils}`);
        console.log(`the value of components is ${slide}, ${typeof slide}`);
    }

    // utils/src/fakeSubmitTable.js
    function fakeSubmitTable_default({
        comp: table,
        button,
        filled,
        preClickText,
        postClickText,
    }) {
        table.on("change", () => {
            const entries = table.data.rows
                .map((row) => row.map((cell) => cell.value))
                .flat();
            button.updateData({
                text: preClickText,
                disabled: filled
                    ? !entries.every((value) => !!value)
                    : !entries.some((value) => !!value),
            });
        });
        button.on("click", () => {
            button.updateData({ text: postClickText, disabled: true });
        });
    }

    // utils/src/fakeSubmitSelect.js
    function fakeSubmitSelect_default({
        comp: select,
        button,
        preClickText,
        postClickText,
    }) {
        select.on("change", ({ selected }) => {
            button.updateData({
                text: preClickText,
                disabled: !selected.length,
            });
        });
        button.on("click", () => {
            button.updateData({ text: postClickText, disabled: true });
        });
    }

    // utils/src/fakeSubmitInput.js
    function fakeSubmitInput_default({
        comp: input,
        button,
        preClickText,
        postClickText,
    }) {
        input.on("change", () => {
            if (input.data.text !== getData_default("last", input)) {
                button.updateData({
                    text: preClickText,
                    disabled: !input.data.text,
                });
                saveData_default({ last: input.data.text }, input);
            }
        });
        button.on("click", () => {
            button.updateData({ text: postClickText, disabled: true });
        });
    }

    // utils/src/arrayEquals.js
    function arrayEquals_default(first, second) {
        return (
            Array.isArray(first) &&
            Array.isArray(second) &&
            first.length === second.length &&
            first.every((val, index) => val === second[index])
        );
    }

    // utils/src/fakeSubmitFIB.js
    function fakeSubmitFIB_default(fib, button, filled = true) {
        fib.on("change", ({ values }) => {
            const inputs = values.map((inputField) => inputField.text);
            if (!arrayEquals_default(inputs, getData_default("inputs", fib))) {
                button.updateData({
                    text: "Submit",
                    disabled: filled
                        ? !inputs.every((value) => !!value)
                        : !inputs.some((value) => !!value),
                });
                saveData_default({ inputs }, fib);
            }
            button.updateData({
                text: "Submit",
                disabled: filled
                    ? !values.every(({ text }) => !!text)
                    : !values.some(({ text }) => !!text),
            });
        });
        button.on("click", () => {
            button.updateData({ text: "Submitted", disabled: true });
        });
    }

    // utils/src/fakeSubmitRTE.js
    function fakeSubmitRTE_default({
        comp: rte,
        button,
        filled,
        preClickText,
        postClickText,
    }) {
        rte.on("change", ({ values }) => {
            const inputs = rte.localData.inputs.map(
                (inputField) => inputField.text
            );
            if (!arrayEquals_default(inputs, getData_default("inputs", rte))) {
                button.updateData({
                    text: preClickText,
                    disabled: filled
                        ? !inputs.every((value) => !!value)
                        : !inputs.some((value) => !!value),
                });
                saveData_default({ inputs }, rte);
            }
            button.updateData({
                disabled: filled
                    ? !values.every((val) => !!val.text)
                    : !values.some((val) => !!val.text),
            });
        });
        button.on("click", () => {
            button.updateData({ text: postClickText, disabled: true });
        });
    }

    // utils/src/fakeSubmit.js
    function fakeSubmit_default(mysteryObj, button, filled = true) {
        const passObj =
            typeof arguments[1] === "undefined"
                ? mysteryObj
                : { comp: mysteryObj, button, filled };
        passObj.preClickText = passObj.preClickText || "Submit";
        passObj.postClickText = passObj.postClickText || "Submitted";
        const fakeComps = [
            "select",
            "input",
            "table",
            "complextable",
            "fillblank",
            "richtexteditor",
        ];
        if (!fakeComps.includes(passObj.comp.type)) {
            console.error(
                `fakeSubmit not supported for component type: ${passObj.comp.type}`
            );
            return;
        }
        compInit(() => {
            passObj.button.updateData({
                text: passObj.preClickText,
                disabled: true,
                align: "right",
            });
        }, passObj.button);
        switch (passObj.comp.type) {
            case "table":
            case "complextable":
                fakeSubmitTable_default(passObj);
                break;
            case "select":
                fakeSubmitSelect_default(passObj);
                break;
            case "input":
                fakeSubmitInput_default(passObj);
                break;
            case "fillblank":
                fakeSubmitFIB_default(passObj.comp, button, filled);
                break;
            case "richtexteditor":
                fakeSubmitRTE_default(passObj);
                break;
        }
        function compInit(callback, component) {
            const dataName = "initialized-" + component.name;
            if (!getData_default(dataName, component)) {
                callback();
                const saveObj = {};
                saveObj[dataName] = true;
                saveData_default(saveObj, component);
            }
        }
    }

    // utils/src/undoLaTeX.js
    function undoLaTeX_default(input) {
        const frac = input.replace(/\\frac{/g, "(");
        const fracMid = frac.replace(/\}\{/g, ")/(");
        const leftParen = fracMid.replace(/\\left/g, "");
        const rightParen = leftParen.replace(/\\right/g, "");
        const squirtLeft = rightParen.replace(/\\sqrt\{/, "sqrt(");
        const cbrtLeft = squirtLeft.replace(/\\sqrt\[3\]\{/, "cbrt(");
        const brackRight = cbrtLeft.replace(/\}/g, ")");
        const brackLeft = brackRight.replace(/\{/g, "(");
        const lessThan = brackLeft.replace(/\\le/g, "<=");
        const greaterThan = lessThan.replace(/\\ge/g, ">=");
        const cDot = greaterThan.replace(/\\cdot/g, "*");
        const fixExps = cDot.replace(/\^\((.*)\)/g, "^($1)");
        const noSpace = fixExps.replace(/\s/g, "");
        const finalAnswer = noSpace.replace(/\\pi/g, "(pi)");
        return finalAnswer;
    }

    // utils/src/carousel.js
    function carousel_default({
        componentNameRoot,
        buttonDisablingAllowed = true,
        showMoreThanOne = false,
        components,
    }) {
        const storageComp = components[componentNameRoot + "1"];
        const componentType = storageComp.type;
        const componentList = [];
        const buttonGroup = components.buttonGroup1;
        for (const el in components) {
            if (components[el].type === componentType) {
                componentList.push(el);
            }
        }
        onInit_default(() => {
            for (const el in components) {
                if (componentList.includes(el)) {
                    handleVisibility(components[el]);
                }
            }
            show_default(storageComp);
            if (buttonDisablingAllowed) {
                buttonGroup.updateSingleButton({ disabled: true }, 1);
            }
        }, storageComp);
        function getVisibleNum() {
            let desiredIndex = 0;
            if (showMoreThanOne) {
                componentList.every((currentEl, index) => {
                    var _a, _b;
                    if (
                        !((_b =
                            (_a = components[currentEl]) == null
                                ? void 0
                                : _a.data) == null
                            ? void 0
                            : _b.visible)
                    ) {
                        desiredIndex = index;
                        return false;
                    }
                    return true;
                });
            } else {
                componentList.every((currentEl, index) => {
                    var _a, _b;
                    if (
                        (_b =
                            (_a = components[currentEl]) == null
                                ? void 0
                                : _a.data) == null
                            ? void 0
                            : _b.visible
                    ) {
                        desiredIndex = index + 1;
                        return false;
                    }
                    return true;
                });
            }
            return desiredIndex;
        }
        function handleButtons(buttonNumber, compNum) {
            buttonGroup.updateSingleButton({ disabled: false }, 1);
            buttonGroup.updateSingleButton({ disabled: false }, 2);
            if (buttonDisablingAllowed) {
                switch (true) {
                    case buttonNumber === 1 &&
                        compNum === 1 &&
                        !showMoreThanOne:
                    case buttonNumber === 1 && compNum === 2 && showMoreThanOne:
                        buttonGroup.updateSingleButton({ disabled: true }, 1);
                        break;
                    case buttonNumber === 2 && compNum === componentList.length:
                        if (compNum === componentList.length) {
                            buttonGroup.updateSingleButton(
                                { disabled: true },
                                2
                            );
                        }
                        break;
                }
            }
        }
        function handleVisibility(input) {
            if (showMoreThanOne) {
                hide_default(input);
            } else {
                disappear_default(input);
            }
        }
        buttonGroup.on("click:1", () => {
            const visibleNum = getVisibleNum();
            if (!showMoreThanOne) {
                componentList.forEach((element) => {
                    handleVisibility(components[element]);
                });
            }
            const addOnNum = showMoreThanOne ? 0 : 1;
            const compNum =
                (visibleNum % componentList.length) - addOnNum < 1
                    ? componentList.length +
                      (visibleNum % componentList.length) -
                      addOnNum
                    : (visibleNum % componentList.length) - addOnNum;
            const compName = componentNameRoot + compNum;
            if (showMoreThanOne && visibleNum === 1) {
                componentList.forEach((element) => {
                    show_default(components[element]);
                });
            } else if (showMoreThanOne) {
                handleVisibility(components[compName]);
            } else {
                show_default(components[compName]);
            }
            handleButtons(1, compNum);
        });
        buttonGroup.on("click:2", () => {
            const visibleNum = getVisibleNum();
            if (showMoreThanOne && visibleNum === 0) {
                componentList.forEach((element) => {
                    handleVisibility(components[element]);
                });
            } else if (!showMoreThanOne) {
                componentList.forEach((element) => {
                    disappear_default(components[element]);
                });
            }
            const compNum = (visibleNum % componentList.length) + 1;
            const compName = componentNameRoot + compNum;
            handleButtons(2, compNum);
            show_default(components[compName]);
        });
    }

    // utils/src/cD.js
    function cD_default({ components, utils, autorun }) {
        const returnObj = {};
        if (components) {
            const allComps = Object.keys(components).sort();
            const firstComp = components[allComps[0]];
            const tempSaveData = function (dataObj = {}, component) {
                const tarComp = component ? component : firstComp;
                saveData_default(dataObj, tarComp);
            };
            const tempGetData = function (dataName, component) {
                const tarComp = component ? component : firstComp;
                return getData_default(dataName, tarComp);
            };
            const tempOnInit = function (callback) {
                onInit_default(callback, firstComp);
            };
            returnObj.saveData = tempSaveData;
            returnObj.getData = tempGetData;
            returnObj.onInit = tempOnInit;
        }
        if (utils) {
            const tempValidateNum = function (passedObj) {
                return validateNum_default(
                    __spreadProps(__spreadValues({}, passedObj), { utils })
                );
            };
            returnObj.validateNum = tempValidateNum;
        }
        if (autorun) {
            const tempFakeSubmit = function (...passedArgs) {
                fakeSubmit_default(...passedArgs, autorun);
            };
            returnObj.fakeSubmit = tempFakeSubmit;
        }
        return returnObj;
    }

    // utils/src/showHideAndReset.js
    function showHideAndReset_default({
        componentNameRoots,
        exclusionList = [],
        componentsPerClick = 1,
        components,
    }) {
        if (!components) {
            console.error("Add components before running code.");
            return;
        }
        if (typeof componentsPerClick !== "number") {
            console.error("Please enter an integer for componentsPerClick.");
            return;
        }
        if (
            !Array.isArray(componentNameRoots) ||
            !Array.isArray(exclusionList)
        ) {
            console.error(
                'Please enter your argument as an array. Example: ["rte","image"] or ["table1"]'
            );
            return;
        }
        if (
            !componentNameRoots.map(
                (element) =>
                    components[
                        Object.keys(components).find((el) =>
                            el.includes(element)
                        )
                    ].type
            )
        ) {
            console.error("Check your component names.");
        }
        const componentTypes = componentNameRoots.map(
            (element) =>
                components[
                    Object.keys(components).find((el) => el.includes(element))
                ].type
        );
        const componentList = [];
        const buttonGroup = components.buttonGroup1;
        for (const el in components) {
            if (
                componentTypes.includes(components[el].type) &&
                !exclusionList.includes(el)
            ) {
                componentList.push(el);
            }
        }
        onInit_default(() => {
            handleVisibility(0, "show");
            handleButtons(0);
        }, components[Object.keys(components).sort()[0]]);
        function getVisibleNum() {
            var _a, _b;
            let desiredIndex = 0;
            componentList.every((currentEl, index) => {
                var _a2, _b2;
                if (
                    (_b2 =
                        (_a2 = components[currentEl]) == null
                            ? void 0
                            : _a2.data) == null
                        ? void 0
                        : _b2.visible
                ) {
                    desiredIndex = index + 1;
                    return false;
                }
                return true;
            });
            for (let i = 0; i < componentsPerClick; i++) {
                (
                    (_b =
                        (_a = components[componentList[desiredIndex + i]]) ==
                        null
                            ? void 0
                            : _a.data) == null
                        ? void 0
                        : _b.visible
                )
                    ? desiredIndex++
                    : desiredIndex;
            }
            return desiredIndex;
        }
        function handleButtons(compNum) {
            buttonGroup.updateSingleButton({ disabled: false }, 1);
            buttonGroup.updateSingleButton({ disabled: false }, 2);
            if (compNum + componentsPerClick === componentList.length) {
                buttonGroup.updateSingleButton({ disabled: true }, 1);
                buttonGroup.updateSingleButton({ disabled: false }, 2);
            } else if (compNum === 0) {
                buttonGroup.updateSingleButton({ disabled: false }, 1);
                buttonGroup.updateSingleButton({ disabled: true }, 2);
            }
        }
        function handleVisibility(input, type = "disappear") {
            if (type === "disappear") {
                disappear_default(input);
            } else if (type === "hide") {
                hide_default(input);
            } else if (type === "show") {
                componentList.forEach((element) => {
                    disappear_default(components[element]);
                });
                for (let i = 0; i < componentsPerClick; i++) {
                    const compName = componentList[input];
                    show_default(components[compName]);
                    input++;
                }
            }
        }
        buttonGroup.on("click:1", () => {
            const visibleNum = getVisibleNum();
            handleVisibility(visibleNum, "show");
            handleButtons(visibleNum);
        });
        buttonGroup.on("click:2", () => {
            handleVisibility(0, "show");
            handleButtons(0);
        });
    }

    // utils/src/ggbCode/editXML.js
    function editXML_default({ ggbObject }) {
        return function (objName, tagName, attributeName = "val", value) {
            let xmlstring = ggbObject
                .getXML(objName)
                .replace(/<expression.*>\n*/g, "");
            const parser = new DOMParser();
            const xmldom = parser.parseFromString(xmlstring, "application/xml");
            const targetNodeList = xmldom.getElementsByTagName(tagName);
            if (!targetNodeList.length) {
                const node = xmldom.createElement(tagName);
                const element = xmldom.documentElement;
                const allNodes = xmldom.getElementsByTagName("*");
                const lastNode = allNodes[allNodes.length - 1];
                element.insertBefore(node, lastNode);
            }
            xmldom
                .getElementsByTagName(tagName)[0]
                .setAttribute(attributeName, value);
            const serializer = new XMLSerializer();
            xmlstring = serializer.serializeToString(xmldom);
            ggbObject.evalXML(xmlstring);
        };
    }

    // utils/src/ggbCode/enableButton.js
    function enableButton_default({ ggbObject }) {
        return function (buttonNum, boolean) {
            ggbObject.setValue("ggbButton" + buttonNum + "Enabled", boolean);
            const color = boolean
                ? "0/255, 11/255, 92/255"
                : "118/255, 118/255, 118/255";
            ggbObject.evalCommand(
                "SetBackgroundColor(ggbButton" + buttonNum + ", " + color + ")"
            );
        };
    }

    // utils/src/ggbCode/getCanvas.js
    var Canvases = {
        View1: "GraphicsView1",
        View2: "GraphicsView2",
        View3D: "3DView",
    };
    function getCanvas_default({ name }) {
        return function ({ label = Canvases.View1 } = {}) {
            if (name) {
                return document.querySelector(`canvas#canvas${name}${label}`);
            }
            const ggbDiv = document
                .querySelector("canvas")
                .closest("div.appletParameters,div.notranslate");
            let parameterID = "";
            if (ggbDiv) {
                parameterID = ggbDiv.getAttribute("id");
            }
            return document.querySelector(
                `canvas#canvas${parameterID}${label}`
            );
        };
    }

    // utils/src/ggbCode/ggbReadText.js
    function ggbReadText_default({ ggbObject }) {
        return function (readString, isGGBTextObj = false) {
            const addQuotes = isGGBTextObj ? "" : '"';
            ggbObject.evalCommand(
                "ReadText(" + addQuotes + readString + addQuotes + ")"
            );
        };
    }

    // utils/src/ggbCode/isPoly.js
    function isPoly_default({ ggbObject }) {
        return function (thing) {
            const polyTypes = [
                "polygon",
                "triangle",
                "quadrilateral",
                "pentagon",
                "hexagon",
            ];
            return polyTypes.includes(ggbObject.getObjectType(thing));
        };
    }

    // utils/src/ggbCode/libClickFunction.js
    function libClickFunction_default({
        readKeyboardInstructions,
        updateKeyboardInstructions,
        ggbObject,
        barButtons,
        buttonClicks,
    }) {
        return function (clickedName, instructionsText = "") {
            const closeWord =
                ggbObject.getValueString("defaultGGBLanguage") === "Spanish"
                    ? "Cerrar"
                    : "Close";
            switch (clickedName) {
                case "instructionsIcon": {
                    const dialog = document.querySelector(
                        "dialog[id='instructions']"
                    );
                    const instructionsTextRaw =
                        instructionsText ||
                        ggbObject.getValueString("instructionsText") ||
                        ggbObject.getValueString("instructions");
                    const instructionsTextFormatted = instructionsTextRaw
                        .replace(/\\text{/g, "")
                        .replace(
                            /\\\\\\\\/g,
                            '</p><p class="InRey" style="max-width: 800px;">'
                        )
                        .replace(/[{}\\]+/g, " ");
                    if (dialog) {
                        dialog.innerHTML =
                            '<p class="InRey" style="max-width: 800px;">' +
                            instructionsTextFormatted +
                            `</p><br><button type="button" style="font-family: sans-serif" class="sc-ftvSNZ sc-jOhDba ButtonGroup__ButtonComponent-sc-mx6qqe-0 dbpEkD dgdoyD hiHsfP btn btn-primary" onclick="instructions.close();">${closeWord}</button>`;
                        dialog.showModal();
                    }
                    break;
                }
                case "xIcon":
                    ggbObject.setValue("showInstructions", false);
                    updateKeyboardInstructions(clickedName);
                    ggbObject.evalCommand("SelectObjects(instructionsIcon)");
                    break;
                default:
                    if (barButtons.includes(clickedName)) {
                        if (
                            buttonClicks[clickedName] &&
                            ggbObject.getValue(`${clickedName}Enabled`)
                        ) {
                            buttonClicks[clickedName]();
                        } else {
                            readKeyboardInstructions(clickedName);
                        }
                    }
                    updateKeyboardInstructions(clickedName);
            }
        };
    }

    // utils/src/ggbCode/libClientFunction.js
    function libClientFunction_default({
        updateKeyboardInstructions,
        showSelection,
        readKeyboardInstructions,
        ggbObject,
        statusName,
        barButtons,
        preventCustomFocusIndicators,
        selectedObject,
        pointIncrement,
    }) {
        return function ({ type, target }) {
            switch (type) {
                case "select": {
                    selectedObject.name = target;
                    updateKeyboardInstructions(target);
                    if (!preventCustomFocusIndicators) {
                        showSelection(target);
                    }
                    const typesToForceKI = ["textfield"];
                    const namesToForceKI = [statusName];
                    if (
                        typesToForceKI.includes(
                            ggbObject.getObjectType(target)
                        ) ||
                        namesToForceKI.includes(target)
                    ) {
                        ggbObject.setValue(
                            "showKeyboardInstructionsTemporarily",
                            true
                        );
                    }
                    switch (target) {
                        default:
                            if (barButtons.includes(target)) {
                                readKeyboardInstructions(target);
                            }
                    }
                    break;
                }
                case "deselect":
                    if (target && target !== selectedObject.name) {
                        break;
                    }
                    selectedObject.name = "";
                    ggbObject.setValue(
                        "showKeyboardInstructionsTemporarily",
                        false
                    );
                    updateKeyboardInstructions();
                    if (!preventCustomFocusIndicators) {
                        showSelection();
                    }
                    break;
                case "dragEnd":
                    pointIncrement(target, true);
                    break;
            }
        };
    }

    // utils/src/ggbCode/libDefineKeyboardInstructions.js
    function libDefineKeyboardInstructions_default({
        defineKeyboardInstructions,
        statusName,
        ggbObject,
    }) {
        return function (obj) {
            const language =
                ggbObject.getValueString("defaultGGBLanguage") || "English";
            const keyboardInstructions = {
                English: {
                    instructionsIcon: "Press space to open instructions.",
                    xIcon: "Press space to close instructions.",
                },
                Spanish: {
                    instructionsIcon:
                        "Presiona la barra de espacio para abrir las instrucciones.",
                    xIcon: "Presiona la barra de espacio para cerrar las instrucciones.",
                },
            };
            keyboardInstructions.English[statusName] =
                "Press tab to select next object. Press escape to exit.";
            keyboardInstructions.Spanish[statusName] =
                "Presiona la tecla tab para seleccionar el siguiente objeto. \\\\Presiona la tecla de escape para salir de la actividad interactiva y regresar a la p\xE1gina. ";
            function defineDefault(language2) {
                switch (language2) {
                    case "English": {
                        return "Keyboard instructions on. Press tab to select next object.";
                    }
                    case "Spanish": {
                        return "Instrucciones de teclado habilitadas. \\\\Presiona la tecla tab para seleccionar el siguiente objeto.";
                    }
                    default: {
                        return "Keyboard instructions on. Press tab to select next object.";
                    }
                }
            }
            return (
                keyboardInstructions[language][obj] ||
                defineKeyboardInstructions(obj) ||
                defineDefault(language)
            );
        };
    }

    // utils/src/ggbCode/libKeyFunction.js
    function libKeyFunction_default({
        ggbReadText,
        ggbObject,
        statusName,
        selectedObject,
        updateKeyboardInstructions,
        pointIncrement,
    }) {
        return function (event) {
            switch (event.code) {
                case "KeyK": {
                    let KIText = "";
                    const KIBool = ggbObject.getValue(
                        "showKeyboardInstructions"
                    );
                    if (
                        ggbObject.getValueString("defaultGGBLanguage") ===
                        "Spanish"
                    ) {
                        KIText =
                            "Las instrucciones de teclado se " +
                            (KIBool ? "ocultan" : "muestran") +
                            ".";
                    } else {
                        KIText =
                            "Keyboard instructions " +
                            (KIBool ? "hidden" : "shown") +
                            ".";
                    }
                    ggbReadText(KIText);
                    ggbObject.setValue("showKeyboardInstructions", !KIBool);
                    break;
                }
                case "KeyX":
                    ggbObject.evalCommand(`SelectObjects(${statusName})`);
                    break;
                case "Space": {
                    const libSelectedObject = selectedObject.name;
                    if (
                        ggbObject.getObjectType(libSelectedObject) === "boolean"
                    ) {
                        updateKeyboardInstructions(libSelectedObject);
                    } else {
                        pointIncrement(libSelectedObject);
                    }
                    break;
                }
            }
        };
    }

    // utils/src/ggbCode/manageAddedList.js
    function manageAddedList_default({ ggbObject }) {
        return function (objectChanged, added = true) {
            let addedList = ggbObject.getValueString("addedList");
            if (added) {
                if (addedList === "") {
                    ggbObject.setTextValue(
                        "addedList",
                        addedList.concat(objectChanged)
                    );
                } else {
                    ggbObject.setTextValue(
                        "addedList",
                        addedList.concat(",", objectChanged)
                    );
                }
            } else {
                if (addedList.includes(objectChanged.concat(","))) {
                    ggbObject.setTextValue(
                        "addedList",
                        addedList.replace(objectChanged.concat(","), "")
                    );
                } else if (addedList.includes(",".concat(objectChanged))) {
                    ggbObject.setTextValue(
                        "addedList",
                        addedList.replace(",".concat(objectChanged), "")
                    );
                } else if (addedList.includes(objectChanged)) {
                    ggbObject.setTextValue(
                        "addedList",
                        addedList.replace(objectChanged, "")
                    );
                }
            }
            addedList = ggbObject.getValueString("addedList");
            return addedList;
        };
    }

    // utils/src/ggbCode/pointIncrement.js
    function pointIncrement_default({
        ggbObject,
        pointIncrements,
        updateKeyboardInstructions,
    }) {
        return function (pointName, forceMin = false, readUpdate = true) {
            var _a, _b, _c, _d;
            const pointParams = pointIncrements[pointName];
            const isRelevantPoint = !!pointParams;
            if (!isRelevantPoint) return;
            const { xStepName, xSteps, captureText = "" } = pointParams;
            let { yStepName, ySteps } = pointParams;
            const yIsDifferent = !!yStepName;
            if (!yIsDifferent) {
                yStepName = xStepName;
                ySteps = xSteps;
            }
            const currentXIndex = xSteps.indexOf(ggbObject.getValue(xStepName));
            const nextXValue = forceMin
                ? Math.min(...xSteps)
                : (_a = xSteps[currentXIndex + 1]) != null
                  ? _a
                  : xSteps[0];
            const currentYIndex = ySteps.indexOf(ggbObject.getValue(yStepName));
            const nextYValue = forceMin
                ? Math.min(...ySteps)
                : (_b = ySteps[currentYIndex + 1]) != null
                  ? _b
                  : ySteps[0];
            ggbObject.setValue(xStepName, Number(nextXValue));
            ggbObject.setValue(yStepName, Number(nextYValue));
            const newXIndex = xSteps.indexOf(nextXValue);
            const subsequentXValue =
                (_c = xSteps[newXIndex + 1]) != null ? _c : xSteps[0];
            const newYIndex = ySteps.indexOf(nextYValue);
            const subsequentYValue =
                (_d = ySteps[newYIndex + 1]) != null ? _d : ySteps[0];
            const currentLanguage = "English";
            const baseText = {
                English: yIsDifferent
                    ? `Current x movement increment is ${nextXValue} and y movement increment is ${nextYValue}.\\\\Press space to increment x by ${subsequentXValue} and y by ${subsequentYValue}.`
                    : `Current movement increment is ${nextXValue}. Press space to increment by ${subsequentXValue}.`,
            };
            const textToRead = baseText[currentLanguage];
            const shouldCaptureText = !!captureText;
            if (shouldCaptureText)
                ggbObject.setTextValue(captureText, textToRead);
            if (readUpdate) {
                ggbObject.evalCommand(`ReadText("${textToRead}")`);
                updateKeyboardInstructions(pointName);
            }
        };
    }

    // utils/src/ggbCode/readKeyboardInstructions.js
    function readKeyboardInstructions_default({
        ggbReadText,
        libDefineKeyboardInstructions,
    }) {
        return function (obj) {
            const readIt = libDefineKeyboardInstructions(obj);
            ggbReadText(readIt);
        };
    }

    // utils/src/ggbCode/registerHoverListener.js
    function registerHoverListener_default({ name, ggbObject, getCanvas }) {
        return function ({
            pointName = "Follow",
            corner4 = "corner4",
            xd = "xd",
            yd = "yd",
            callback,
        } = {}) {
            const ggbcanvas = getCanvas(name);
            function hover(event) {
                const boundingbox = ggbcanvas.getBoundingClientRect();
                const boxleft = boundingbox.left;
                const boxtop = boundingbox.top;
                const boxwidth = boundingbox.width;
                const boxheight = boundingbox.height;
                const xLocationPixel = event.clientX - boxleft;
                const yLocationPixel = event.clientY - boxtop;
                ggbObject.setCoords(
                    pointName,
                    ggbObject.getXcoord(corner4) +
                        (xLocationPixel * ggbObject.getValue(xd)) / boxwidth,
                    ggbObject.getYcoord(corner4) -
                        (yLocationPixel * ggbObject.getValue(yd)) / boxheight
                );
            }
            if (ggbcanvas) {
                ggbcanvas.addEventListener(
                    "mousemove",
                    function (pointerEvent) {
                        hover(pointerEvent);
                        if (typeof callback === "function") {
                            callback();
                        }
                    }
                );
                ggbcanvas.addEventListener(
                    "touchmove",
                    function (pointerEvent) {
                        const touch = pointerEvent.touches[0];
                        const mouseEvent = new MouseEvent("mousemove", {
                            clientX: touch.clientX,
                            clientY: touch.clientY,
                        });
                        ggbcanvas.dispatchEvent(mouseEvent);
                    },
                    false
                );
            }
        };
    }

    // utils/src/ggbCode/registerSafeObjectClickListener.js
    function registerSafeObjectClickListener_default({ ggbObject }) {
        return function (objName, callback = function () {}) {
            ggbObject.registerObjectClickListener(objName, callback);
            ggbObject.registerAddListener(function (addedName) {
                if (addedName === objName) {
                    ggbObject.registerObjectClickListener(objName, callback);
                }
            });
        };
    }

    // utils/src/ggbCode/registerSafeObjectUpdateListener.js
    function registerSafeObjectUpdateListener_default({ ggbObject }) {
        return function (objName, callback = function () {}) {
            ggbObject.registerObjectUpdateListener(objName, callback);
            ggbObject.registerAddListener(function (addedName) {
                if (addedName === objName) {
                    setTimeout(function () {
                        ggbObject.registerObjectUpdateListener(
                            objName,
                            callback
                        );
                    });
                }
            });
        };
    }

    // utils/src/ggbCode/setAriaLabel.js
    function setAriaLabel_default() {
        return function (canvas, arialabel) {
            if (canvas) {
                canvas.setAttribute("aria-label", arialabel);
            }
        };
    }

    // utils/src/ggbCode/setScreenReaderParameter.js
    function setScreenReaderParameter_default() {
        return function (parameter = "ASCII") {
            const ggbContainer = document.querySelector(
                ".appletParameters,.notranslate "
            );
            ggbContainer.setAttribute("data-param-screenReaderMode", parameter);
        };
    }

    // utils/src/ggbCode/setTabOrder.js
    function setTabOrder_default({ ggbObject, statusName }) {
        return function (
            initList = "",
            addedList = "",
            enders = "",
            starters = statusName.concat(",instructionsIcon")
        ) {
            const scopedInitList = initList ? ",".concat(initList) : "";
            const scopedAddedList = addedList ? ",".concat(addedList) : "";
            const scopedEnders = enders ? ",".concat(enders) : "";
            const string = "{".concat(
                starters,
                scopedInitList,
                scopedAddedList,
                scopedEnders,
                "}"
            );
            const xmlstring = ggbObject.getXML();
            const parser = new DOMParser();
            const xmldom = parser.parseFromString(xmlstring, "application/xml");
            const tabOrderNode =
                xmldom.querySelectorAll('[label="tabOrder"]')[0];
            tabOrderNode.setAttribute("exp", string);
            const serializer = new XMLSerializer();
            const tabOrderString = serializer.serializeToString(tabOrderNode);
            ggbObject.evalXML(tabOrderString);
        };
    }

    // utils/src/ggbCode/showSelection.js
    function showSelection_default({ ggbObject, isPoly, editXML }) {
        return function (target) {
            const thingsToIgnore = ["instructionsIcon", "xIcon"];
            if (thingsToIgnore.includes(target)) {
                return;
            }
            const allObjects = ggbObject.getAllObjectNames();
            for (let i = 0, L = allObjects.length; i < L; i++) {
                const obj = allObjects[i];
                if (ggbObject.getCaption(obj) === "selectionIndicator") {
                    ggbObject.deleteObject(obj);
                }
            }
            if (!target) {
                return;
            }
            if (isPoly(target)) {
                const vertString = ggbObject.evalCommandGetLabels(
                    "Vertex(" + target + ")"
                );
                const vertArr = vertString.split(",");
                hidePieces(vertArr);
                const selPoly = ggbObject.evalCommandGetLabels(
                    "Polygon({" + vertString + "})"
                );
                const underPoly = ggbObject.evalCommandGetLabels(
                    "Polygon({" + vertString + "})"
                );
                styleSelection(selPoly, target);
                styleSelection(underPoly, target, true);
            } else if (ggbObject.getObjectType(target) === "circle") {
                const newName = target.concat("selection");
                const newName2 = target.concat("selection2");
                ggbObject.evalCommand(newName + " = " + target);
                ggbObject.evalCommand(newName2 + " = " + target);
                styleSelection(newName, target);
                styleSelection(newName2, target, true);
            }
            function styleSelection(obj, originalObj, secondaryBool) {
                const color = secondaryBool ? [255, 255, 255] : [0, 0, 0];
                ggbObject.setColor(obj, ...color);
                ggbObject.setFilling(obj, 0);
                const thickness = secondaryBool ? 20 : 8;
                ggbObject.setLineThickness(obj, thickness);
                const origLayer = ggbObject.getLayer(originalObj);
                const newLayer = secondaryBool ? origLayer : origLayer + 1;
                ggbObject.setLayer(obj, newLayer);
                ggbObject.setCaption(obj, "selectionIndicator");
                setLineOpacity(obj, 1);
                editXML(obj, "selectionAllowed", "val", "false");
                function setLineOpacity(obj2, opacity = 1) {
                    let xmlstring = ggbObject.getXML(obj2);
                    const parser = new DOMParser();
                    const xmldom = parser.parseFromString(
                        xmlstring,
                        "application/xml"
                    );
                    const GGBopacity = String(Math.ceil(255 * opacity));
                    xmldom
                        .getElementsByTagName("lineStyle")[0]
                        .setAttribute("opacity", GGBopacity);
                    const serializer = new XMLSerializer();
                    xmlstring = serializer.serializeToString(xmldom);
                    ggbObject.evalXML(xmlstring);
                }
            }
            function hidePieces(arr) {
                for (let i = 0, L = arr.length; i < L; i++) {
                    const obj = arr[i];
                    ggbObject.setVisible(obj, false);
                    ggbObject.setCaption(obj, "selectionIndicator");
                }
            }
        };
    }

    // utils/src/ggbCode/textResizer.js
    function textResizer_default({ name, ggbObject }) {
        return function textResizer() {
            const parentdiv = document.getElementById(name);
            if (parentdiv !== null) {
                const oldWidth = parentdiv.offsetWidth;
                const cut = 480;
                const resize = function (currentWidth) {
                    const isWideEnough = currentWidth >= cut;
                    const idealSize = isWideEnough
                        ? "18"
                        : Math.round((3 * currentWidth) / 80).toString();
                    let xmlstring = ggbObject.getXML();
                    const parser = new DOMParser();
                    const xmldom = parser.parseFromString(
                        xmlstring,
                        "application/xml"
                    );
                    if (!isWideEnough) {
                        xmldom
                            .getElementsByTagName("font")[0]
                            .setAttribute("size", idealSize);
                        const serializer = new XMLSerializer();
                        xmlstring = serializer.serializeToString(xmldom);
                        ggbObject.setXML(xmlstring);
                    } else if (isWideEnough) {
                        xmldom
                            .getElementsByTagName("font")[0]
                            .setAttribute("size", idealSize);
                        const serializer = new XMLSerializer();
                        xmlstring = serializer.serializeToString(xmldom);
                        ggbObject.setXML(xmlstring);
                    }
                };
                resize(oldWidth);
                const resizeObserver = new MutationObserver(function (
                    mutations
                ) {
                    mutations.forEach(function checkMutations(mutation) {
                        const currentWidth = mutation.target.offsetWidth;
                        resize(currentWidth);
                    });
                });
                resizeObserver.observe(parentdiv, {
                    attributes: true,
                    attributeFilter: ["data-scalex"],
                    attributeOldValue: true,
                });
            }
        };
    }

    // utils/src/ggbCode/updateKeyboardInstructions.js
    function updateKeyboardInstructions_default({
        libDefineKeyboardInstructions,
        ggbObject,
    }) {
        return function (obj = "", overrideText = "") {
            const showIt = overrideText || libDefineKeyboardInstructions(obj);
            ggbObject.setTextValue(
                "keyboardInstructions",
                "\\text{" + showIt + "}"
            );
        };
    }

    // utils/src/ggbCode/setupGGBCanvases.js
    function setupGGBCanvases_default() {
        const ggbCanvases = Array.from(document.querySelectorAll("canvas"));
        const curatedCanvases = ggbCanvases.filter(function (canvas) {
            const ggbDiv = canvas.closest(
                "div.appletParameters,div.notranslate"
            );
            const hasDataId = canvas.hasAttribute("data-id");
            const isReady = ggbDiv && !hasDataId;
            if (isReady) {
                const ariaLabelOrig = canvas.getAttribute("aria-label");
                if (ariaLabelOrig !== null) {
                    const ariaLabelNew = ariaLabelOrig
                        .replace(/Geogebra component:\s*/g, "")
                        .replace(/\s/g, "");
                    const canvasID =
                        "canvas" + ggbDiv.getAttribute("id") + ariaLabelNew;
                    canvas.setAttribute("id", canvasID);
                    canvas.setAttribute("data-id", canvasID);
                }
            }
            return isReady;
        });
        return curatedCanvases;
    }

    // utils/src/ggbCode/libUnavailableButtonText.js
    function libUnavailableButtonText_default({ ggbObject }) {
        return function () {
            const language =
                ggbObject.getValueString("defaultGGBLanguage") || "English";
            function defineButtonUnavailable(language2) {
                switch (language2) {
                    case "English": {
                        return "This button can't be used right now.";
                    }
                    case "Spanish": {
                        return "Este bot\xF3n no est\xE1 disponible en este momento.";
                    }
                    default: {
                        return "This button can't be used right now.";
                    }
                }
            }
            return defineButtonUnavailable(language);
        };
    }

    // utils/src/setupGGB.js
    function setupGGB_default({
        name = "",
        ggbObject,
        defineKeyboardInstructions = function () {},
        buttonClicks = {},
        statusName = "AAppletStatus",
        preventCustomFocusIndicators = false,
        pointIncrements = {},
    } = {}) {
        function logError(funcName) {
            return function (...args) {
                console.error(`Tried to call ${funcName} with args ${args}`);
            };
        }
        function setAtStart() {
            textResizer();
            const curatedCanvases = setupGGBCanvases_default();
            curatedCanvases.forEach(function (element) {
                const div = element.closest(
                    "div[class^='Appletstyled__StyledGeoGebraContainer']"
                );
                if (div) {
                    if (!div.hasAttribute("style")) {
                        div.setAttribute("style", "");
                    }
                    if (div.style) {
                        div.style.setProperty("overflow", "visible");
                        const originalStyle = div.getAttribute("style") || "";
                        element.addEventListener("blur", function () {
                            div.setAttribute("style", originalStyle);
                        });
                        element.addEventListener("focus", function () {
                            div.style.setProperty(
                                "box-shadow",
                                "0 0 0 5px hsl(48, 10%, 100%),0 0 0 7px hsl(48, 10%, 40%)"
                            );
                        });
                    }
                }
            });
            ggbObject.setErrorDialogsActive(false);
            const dialog =
                document.getElementById("instructions") ||
                document.createElement("dialog");
            if (![...document.body.children].includes(dialog)) {
                document.body.appendChild(dialog);
                dialog.setAttribute("id", "instructions");
            }
        }
        const returnObj = {};
        returnObj.selectedObject = { name: "" };
        returnObj.unavailableButtonText = ggbObject
            ? libUnavailableButtonText_default({ ggbObject })()
            : logError("unavailableButtonText");
        returnObj.isPoly = ggbObject
            ? isPoly_default({ ggbObject })
            : logError("isPoly");
        returnObj.getCanvas = name
            ? getCanvas_default({ name })
            : logError("getCanvas");
        returnObj.setAriaLabel = setAriaLabel_default();
        returnObj.setScreenReaderParameter = setScreenReaderParameter_default();
        returnObj.ggbReadText = ggbObject
            ? ggbReadText_default({ ggbObject })
            : logError("ggbReadText");
        const libDefineKeyboardInstructions =
            libDefineKeyboardInstructions_default({
                defineKeyboardInstructions,
                statusName,
                ggbObject,
            });
        returnObj.readKeyboardInstructions = ggbObject
            ? readKeyboardInstructions_default({
                  ggbReadText: returnObj.ggbReadText,
                  libDefineKeyboardInstructions,
              })
            : logError("readKeyboardInstructions");
        returnObj.updateKeyboardInstructions = ggbObject
            ? updateKeyboardInstructions_default({
                  libDefineKeyboardInstructions,
                  ggbObject,
              })
            : logError("updateKeyboardInstructions");
        const pointIncrement = pointIncrement_default({
            ggbObject,
            pointIncrements,
            updateKeyboardInstructions: returnObj.updateKeyboardInstructions,
        });
        returnObj.enableButton = ggbObject
            ? enableButton_default({ ggbObject })
            : logError("enableButton");
        returnObj.registerSafeObjectUpdateListener = ggbObject
            ? registerSafeObjectUpdateListener_default({ ggbObject })
            : logError("registerSafeObjectUpdateListener");
        returnObj.registerSafeObjectClickListener = ggbObject
            ? registerSafeObjectClickListener_default({ ggbObject })
            : logError("registerSafeObjectClickListener");
        returnObj.registerHoverListener =
            name && ggbObject
                ? registerHoverListener_default({
                      name,
                      ggbObject,
                      getCanvas: returnObj.getCanvas,
                  })
                : logError("registerHoverListener");
        returnObj.editXML = ggbObject
            ? editXML_default({ ggbObject })
            : logError("editXML");
        const showSelection = ggbObject
            ? showSelection_default({
                  ggbObject,
                  isPoly: returnObj.isPoly,
                  editXML: returnObj.editXML,
              })
            : logError("showSelection");
        const barButtons = [
            "ggbButton1",
            "ggbButton2",
            "ggbButton3",
            "ggbButton4",
            "ggbButton5",
        ];
        returnObj.libClientFunction = ggbObject
            ? libClientFunction_default({
                  updateKeyboardInstructions:
                      returnObj.updateKeyboardInstructions,
                  showSelection,
                  readKeyboardInstructions: returnObj.readKeyboardInstructions,
                  ggbObject,
                  statusName,
                  barButtons,
                  preventCustomFocusIndicators,
                  selectedObject: returnObj.selectedObject,
                  pointIncrement,
              })
            : logError("libClientFunction");
        returnObj.libClickFunction = ggbObject
            ? libClickFunction_default({
                  ggbReadText: returnObj.ggbReadText,
                  readKeyboardInstructions: returnObj.readKeyboardInstructions,
                  updateKeyboardInstructions:
                      returnObj.updateKeyboardInstructions,
                  ggbObject,
                  barButtons,
                  buttonClicks,
              })
            : logError("libClickFunction");
        returnObj.libKeyFunction = ggbObject
            ? libKeyFunction_default({
                  ggbReadText: returnObj.ggbReadText,
                  ggbObject,
                  statusName,
                  selectedObject: returnObj.selectedObject,
                  updateKeyboardInstructions:
                      returnObj.updateKeyboardInstructions,
                  pointIncrement,
              })
            : logError("libKeyFunction");
        returnObj.manageAddedList = ggbObject
            ? manageAddedList_default({ ggbObject })
            : logError("manageAddedList");
        returnObj.setTabOrder = ggbObject
            ? setTabOrder_default({ ggbObject, statusName })
            : logError("setTabOrder");
        const textResizer = ggbObject
            ? textResizer_default({ ggbObject })
            : logError("textResizer");
        setAtStart();
        return returnObj;
    }

    // utils/src/getDocument.js
    function getDocument_default() {
        return document;
    }

    // utils/src/makeBlockQuote.js
    function makeBlockQuote_default(str) {
        return `<blockquote style="font-style:normal;"> <p>${str}</p></blockquote>`;
    }

    // utils/src/displayErrorMessage.js
    function displayErrorMessage_default({
        display = true,
        component,
        title,
        message,
        row,
        col,
        inputIndex = 0,
        mode = "validate",
    } = {}) {
        if (!component) {
            throw new Error(
                "displayErrorMessage is missing required parameters!"
            );
        }
        const id = `${component == null ? void 0 : component.name}${row || ""}${col || ""}${mode}${inputIndex}`;
        const data = { id, messageId: id, title, message };
        const showOrHide = display
            ? component == null
                ? void 0
                : component.showErrorMessage
            : component == null
              ? void 0
              : component.hideErrorMessage;
        showOrHide(
            __spreadProps(__spreadValues({}, data), {
                data,
                row,
                col,
                value: inputIndex,
            })
        );
    }

    // utils/src/ggbCode/changeScreaderLabel.js
    function changeScreaderLabel_default() {
        return function () {
            const screaderList = document.querySelectorAll(
                "div[id*='screenReader']"
            );
            const idArray = screaderList.map(function ({ id }) {
                return id;
            });
            const idSet = new Set(idArray);
            if (idSet.length !== idArray.length) {
                screaderList.forEach(function (element, index) {
                    const modifiedIndex = index + 1;
                    element.setAttribute(
                        "id",
                        "screenReader".concat(modifiedIndex)
                    );
                });
            }
        };
    }

    // utils/main.js
    var dontUtils = __spreadProps(__spreadValues({}, src_exports), {
        health: health_exports,
    });
    window.dontUtils = dontUtils;
})();
