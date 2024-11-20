export default function createDOMElement(
  tag,
  textContent,
  att1,
  attVal1,
  att2,
  attVal2,
  att3,
  attVal3,
  att4,
  attVal4,
  att5,
  attVal5,
) {
  const element = document.createElement(tag); // eslint-disable-line
  if (textContent) {
    element.textContent = textContent;
  }
  if (att1) {
    element.setAttribute(att1, attVal1);
  }
  if (att2) {
    element.setAttribute(att2, attVal2);
  }
  if (att3) {
    element.setAttribute(att3, attVal3);
  }
  if (att4) {
    element.setAttribute(att4, attVal4);
  }
  if (att5) {
    element.setAttribute(att5, attVal5);
  }
  return element;
}

export const test = 'DOM Content Loaded! :)';
