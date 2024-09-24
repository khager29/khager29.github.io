import { useState } from "react";
import EnabledCheckbox from "./EnabledCheckbox.tsx";
import Checkbox from "./Checkbox.tsx";
import Input from "./Input.tsx";
import markdownContent from "./markdownContent.ts";

const JiraTicketHelper = () => {
  const [variant, setVariant] = useState(false);
  const [lessonInfo, setLessonInfo] = useState("");
  const [storybookLink, setStorybookLink] = useState("");
  const [parentTicketLink, setParentTicketLink] = useState("");
  const [cognitoLink, setCognitoLink] = useState("");
  const [updatedLink, setUpdatedLink] = useState("");
  const [notes, setNotes] = useState("");
  const [tabOrder, setTabOrder] = useState("");
  const [buttons, setButtons] = useState(0);
  const [inputs, setInputs] = useState("");
  const [moveableObjects, setMoveableObjects] = useState(false);
  const [selectableObjects, setSelectableObjects] = useState(false);
  const [preview, setPreview] = useState("");
  const [checked, setChecked] = useState<string[]>([]);

  const handleGenerateMarkdown = () => {
    const content = markdownContent({
      lessonInfo,
      cognitoLink,
      storybookLink,
      updatedLink,
      parentTicketLink,
      notes,
      buttons,
      tabOrder,
      checked,
      selectableObjects,
      moveableObjects,
      variant,
    });
    setPreview(content);
    navigator.clipboard.writeText(content);
  };

  const handleClearForm = () => {
    setVariant(false);
    setLessonInfo("");
    setStorybookLink("");
    setParentTicketLink("");
    setUpdatedLink("");
    setCognitoLink("");
    setNotes("");
    setTabOrder("");
    setButtons(0);
    setInputs("");
    setSelectableObjects(false);
    setMoveableObjects(false);
    setPreview("");
    setChecked([]);
    const selectEl = document.querySelector("select");
    if (selectEl) {
      selectEl.selectedIndex = 0;
    }
  };

  return (
    <>
      <header>
        <h1>Jira Ticket Helper</h1>
      </header>
      <main>
        <select
          onChange={() => {
            setVariant(document.querySelector("select")?.value === "Variant");
          }}
        >
          <option id="parent-choice">Parent</option>
          <option id="variant-choice">Variant</option>
        </select>
        <Input
          className="both"
          labelName="GMTL: "
          value={lessonInfo}
          type="text"
          handleChange={(e) => setLessonInfo(e.target.value)}
        />
        <Input
          className="both"
          labelName="Cognito Link: "
          value={cognitoLink}
          type="text"
          handleChange={(e) => setCognitoLink(e.target.value)}
        />
        <Input
          className="both"
          labelName="Notes: "
          value={notes}
          type="text"
          handleChange={(e) => setNotes(e.target.value)}
        />
        <Input
          className={variant ? "hidden" : "parent-only"}
          labelName="GeoGebra Link: "
          value={updatedLink}
          type="text"
          handleChange={(e) => setUpdatedLink(e.target.value)}
        />
        <Input
          className="both"
          labelName={"Storybook Link: "}
          value={storybookLink}
          type="text"
          handleChange={(e) => setStorybookLink(e.target.value)}
        />
        <Input
          className={!variant ? "hidden" : "variant-only"}
          labelName={"Parent Ticket Link: "}
          value={parentTicketLink}
          type="text"
          handleChange={(e) => setParentTicketLink(e.target.value)}
        />
        <Input
          className={variant ? "hidden" : "parent-only"}
          labelName="Number of buttons: "
          value={buttons}
          type="number"
          min={0}
          handleChange={(e) => setButtons(Number(e.target.value))}
        />
        <EnabledCheckbox
          className={variant ? "hidden" : "parent-only"}
          numButtons={buttons}
          handleChange={(e) => {
            console.log(e);
            const boxes: HTMLInputElement[] = Array.from(
              document.querySelectorAll("[id^='enabledBox']")
            );
            const enabledBoxes: HTMLInputElement[] = boxes.filter(
              (box: HTMLInputElement) => box.checked
            );
            const enabledBoxNames: string[] = enabledBoxes.map(
              (box: HTMLInputElement) => box.id
            );
            setChecked(enabledBoxNames);
          }}
        />
        <Input
          className={variant ? "hidden" : "parent-only"}
          labelName="Number of inputs: "
          type="text"
          value={inputs}
          handleChange={(e) => setInputs(e.target.value)}
        />
        <Checkbox
          className={variant ? "hidden" : "parent-only"}
          labelName="Selectable objects? "
          handleChange={(e) => setSelectableObjects(e.target.checked)}
        />
        <Checkbox
          className={variant ? "hidden" : "parent-only"}
          labelName="Moveable objects? "
          handleChange={(e) => setMoveableObjects(e.target.checked)}
        />
        <Input
          className="both"
          labelName="Tab order: "
          type="text"
          value={tabOrder}
          handleChange={(e) => setTabOrder(e.target.value)}
        />
        <button onClick={handleGenerateMarkdown}>
          Generate and Copy Markdown
        </button>
        <button onClick={handleClearForm}>Clear Form</button>
        <pre>{preview}</pre>
      </main>
    </>
  );
};

export default JiraTicketHelper;
