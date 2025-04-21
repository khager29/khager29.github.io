function ggbOnInit(name, ggbObject) {
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
      selectedObject,
      editXML,
    } = setupGGB({
      name,
      ggbObject,
      defineKeyboardInstructions,
      buttonClicks,
      statusName: "AAppletStatus",
    });
    const ggbcanvas = getCanvas();
    const getGGBAnalytics = window.makeGetGGBAnalytics({
      name,
      ggbObject,
      getCanvas,
    });

    getGGBAnalytics();

    /*
     * IGNORE above
     * EDIT below
     */

    setAriaLabel(ggbcanvas, "Clothesline Interactive");

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

    function defineButtonClickScripts() {
      // defines button scripts
      // keep this function, but you can delete anything/everything inside it
      return {
        ggbButton1() {},
        ggbButton2() {},
        ggbButton3() {},
        ggbButton4() {},
        ggbButton5() {},
      };
    }

    function defineKeyboardInstructions(obj) {
      // takes a GGB object name as an argument, returns its keyboard text.

      if (ggbObject.getObjectType(obj) === "point") {
        return "Use + or - to move this point.";
      }

      const keyboardInstructions = {
        InputBox1: "Input a value and press enter to submit.",
        ggbButton1: ggbObject.getValue("ggbButton1Enabled")
          ? "Press space to display the starting number and its next 10 numbers."
          : unavailableButtonText,
        ggbButton2: ggbObject.getValue("ggbButton2Enabled")
          ? "Press space to ___."
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
      switch (clientEvent.type) {
        case "select":
          {
            console.log(clientEvent.target);
          }
          break;
      }
    }

    function clickListenerFunction(clickedName) {
      console.log(clickedName);
    }

    function keyit(event) {
      console.log(event);
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
