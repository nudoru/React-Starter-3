import React from 'react';
import {
  Module, ModuleContainer,
  ModuleTitle
} from '../components/containers/Module';
import Lorem from '../utils/Lorem';


class Styles extends React.PureComponent {

  render() {
    return <ModuleContainer>
      <Module full>
        <ModuleTitle>Base Text</ModuleTitle>
        <TextStyles/>
      </Module>
    </ModuleContainer>;
  }
}

export default Styles;


const TextStyles = () => {
  return (
    <div>
      <h1>H1 {Lorem.text(2, 5)}</h1>
      <h2>H2 {Lorem.text(2, 5)}</h2>
      <h3>H3 {Lorem.text(2, 5)}</h3>
      <h4>H4 {Lorem.text(2, 5)}</h4>
      <h5>H5 {Lorem.text(2, 5)}</h5>
      <h6>H6 {Lorem.text(2, 5)}</h6>
      <p><a href='http://www.google.com'>Paragraph</a> {Lorem.paragraph(5, 10)}</p>
      <p>Paragraph {Lorem.paragraph(5, 10)}</p>
      <pre>Pre {Lorem.text(5, 15)}</pre>
      <blockquote>Blockquote {Lorem.paragraph(5, 10)}</blockquote>
      <ul>
        <li>{Lorem.text(10, 30)}</li>
        <li>{Lorem.text(10, 30)}</li>
        <li>{Lorem.text(10, 30)}</li>
      </ul>
      <ol>
        <li>{Lorem.text(10, 30)}</li>
        <li>{Lorem.text(10, 30)}</li>
        <li>{Lorem.text(10, 30)}</li>
      </ol>
      <ul>
        <li>{Lorem.text(10, 20)}
          <ul>
            <li>{Lorem.text(10, 30)}</li>
            <li>{Lorem.text(10, 30)}</li>
            <li>{Lorem.text(10, 30)}</li>
          </ul>
        </li>
        <li>{Lorem.text(10, 20)}
          <ol>
            <li>{Lorem.text(10, 30)}</li>
            <li>{Lorem.text(10, 30)}</li>
            <li>{Lorem.text(10, 30)}</li>
          </ol>
        </li>
        <li>{Lorem.text(10, 30)}</li>
      </ul>
    </div>
  );
};