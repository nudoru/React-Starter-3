import React from 'react';
import {
  Module, ModuleContainer,
  ModuleTitle
} from '../components/controls/containers/Module';
import Lorem from '../utils/Lorem';
import {
  ComponentH1, ComponentH2, ComponentH3, ComponentH4, ComponentH5,
  ComponentH6, ComponentLabel, ComponentText
} from '../components/controls/common/Atoms';

class Styles extends React.PureComponent {

  render() {
    return <ModuleContainer>
      <Module full className='bg-white'>
        <ModuleTitle>Atoms</ModuleTitle>
        <ComponentH1>Heading 1 {Lorem.text(2, 5)}</ComponentH1>
        <ComponentH2>Heading 2 {Lorem.text(2, 5)}</ComponentH2>
        <ComponentH3>Heading 3 {Lorem.text(2, 5)}</ComponentH3>
        <ComponentH4>Heading 4 {Lorem.text(2, 5)}</ComponentH4>
        <ComponentH5>Heading 5 {Lorem.text(2, 5)}</ComponentH5>
        <ComponentH6>Heading 6 {Lorem.text(2, 5)}</ComponentH6>
        <ComponentText>{Lorem.text(20,20)}</ComponentText>
        <hr/>
        <ComponentLabel>Label</ComponentLabel>
      </Module>
      <Module full>
        <ModuleTitle>CSS Styles</ModuleTitle>
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