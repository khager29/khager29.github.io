type MarkdownContentProps = {
  lessonInfo: string;
  cognitoLink: string;
  storybookLink: string;
  updatedLink: string;
  parentTicketLink: string;
  notes: string;
  buttons: number;
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
  buttons,
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
[Link to Storybook Preview](${storybookLink}) 
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
**Ignore**
    `;
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
