type MarkdownContentProps = {
    lessonInfo: string;
    cognitoLink: string;
    storybookLink: string;
    updatedLink: string;
    parentTicketLink: string;
    notes: string;
    buttons: number;
    dropdowns: number;
    options: {
        [key: string]: number;
    };
    inputs: number;
    tabOrder: string;
    checked: string[];
    selectableObjects: boolean;
    moveableObjects: boolean;
    variant: boolean;
};
const MarkdownContent = ({
    lessonInfo,
    cognitoLink,
    storybookLink,
    updatedLink,
    parentTicketLink,
    notes,
    tabOrder,
    checked,
    dropdowns,
    options,
    buttons,
    inputs,
    selectableObjects,
    moveableObjects,
    variant,
}: MarkdownContentProps) => {
    const buttonBarData = ({
        checked,
        buttons,
    }: {
        checked: string[];
        buttons: number;
    }): string => {
        let buttonText = "";
        console.log(checked);
        for (let index = 0; index < buttons; index++) {
            buttonText += `Button ${index + 1}: ${checked.includes("enabledBox" + (index + 1).toString()) ? "Enabled" : "Disabled"}\n`;
        }
        return buttonText;
    };
    const dropdownData = ({
        options,
    }: {
        options: { [key: string]: number };
    }): string => {
        let optionString = "";
        const alphabet = "abcdefghijklmnopqrstuvwxyz";
        console.log(options);
        for (let i = 1, L = Object.keys(options).length; i < L; i++) {
            optionString += `### Scenario __ - Selecting Options for Dropdown ${i}\n`;
            for (let j = 1; j <= options[i]; j++) {
                optionString += `**Scenario __ ${alphabet[j - 1]} - ___**
**When** ___
**Then** ___\n`;
            }
        }
        return optionString;
    };
    if (variant) {
        return `
## General Info
### GMTL
${lessonInfo}
### Cognito Link
[Link](${cognitoLink}) 
### Notes
${!notes || notes === "" ? "None" : notes}
## Storybook Link
${storybookLink !== "" ? `[Link to Storybook Preview](${storybookLink})` : `Link to Storybook Preview`}
## Acceptance Criteria 
### Universal 
See [universal acceptance criteria](https://greatminds.atlassian.net/wiki/x/GgAc2g) 
### On Initialization
**Button Bar:**
${buttonBarData({ checked, buttons }).trim()}
**On Stage:**

## Accessibility
**Tab Order:** ${"status, i icon, ".concat(tabOrder)}
## [Base Applet](${parentTicketLink})
**Ignore**`;
    }
    return `
## General Info
### GMTL
${lessonInfo}
### Cognito Link
[Link](${cognitoLink}) 
### Notes
${!notes || notes === "" ? "None" : notes}
## Storybook Link
[Link to Storybook Preview](${storybookLink}) 
## Updated GeoGebra Applet
[Link](${updatedLink}) 
## Acceptance Criteria 
### Universal 
See [universal acceptance criteria](https://greatminds.atlassian.net/wiki/x/GgAc2g) 
### On Initialization
**Button Bar:**
${buttonBarData({ checked, buttons }).trim()}
**On Stage:**
${dropdowns >= 1 ? dropdownData({ options }) : ``}
${
    inputs == 1 && buttons >= 1
        ? `### Scenario __ - Entering Inputs
**Scenario __ a - Enter valid inputs**
**When** the user enters a valid value for input box (___)
**Then** the user deselects the input (tabs or clicks out of the input)
**Then** the ___ button enables
**Scenario __ b - Enter invalid values**
**Given** the user enters an invalid values for input box
**Then** the user deselects the input (tabs or clicks out of the input)
**Then** the __ button remains disabled
**And** an error message appears
### Scenario __ - Pressing Buttons
**Scenario __ - Press Button: __ (correct input case)**
**Given** the user entered a correct value in the input box(es)
**When** the user presses the __ button
**Then** __
**Scenario __ - Press Button: __ (incorrect input case)**
**Given** the user entered an incorrect but valid value in the input box
**When** the user presses the __ button
**Then** __`
        : inputs == 2 && buttons >= 1
          ? `###Scenario __ - Entering Inputs
**Scenario __ a - Enter valid inputs**
**When** the user enters a valid value for input box 1 (___)
**And** the user enters a valid value for input box 2 (____)
**Then** the user deselects the input (tabs or clicks out of the input)
**Then** the ___ button enables
**Scenario __ b - Enter invalid values**
**Given** the user enters an invalid values into one or more input boxes
**Then** the user deselects the input (tabs or clicks out of the input)
**Then** the __ button remains disabled
**And** an error message appears
### Scenario __ - Pressing Buttons
**Scenario __ - Press Button: __ (correct input case)**
**Given** the user entered a correct value in the input box(es)
**When** the user presses the __ button
**Then** __

**Scenario __ - Press Button: __ (incorrect input case)**
**Given** the user entered an incorrect but valid value in the input box
**When** the user presses the __ button
**Then** __`
          : ``
}
${
    (buttons >= 1 && inputs <= 0) || (buttons >= 2 && inputs >= 1)
        ? `### Scenario __ - Press Button: __
**When** the user presses the __ button
**Then** __`
        : ``
}

${
    selectableObjects
        ? `### Scenario __ - Selecting Points
**When** a point is selected
**Then** the point’s direction indicators are visible
**And** the direction indicators for the non-selected point are hidden`
        : ``
}
${
    moveableObjects
        ? `### Scenario __ - Moving Points
**When** the user moves the point __
**Then** __`
        : ``
}
## Accessibility
**Tab Order:** ${"status, i icon, ".concat(tabOrder)}
**Error Messaging:** (coming soon)`;
};

export default MarkdownContent;
