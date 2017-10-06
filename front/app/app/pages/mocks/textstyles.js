import React from 'react';
import Lorem from '../../utils/Lorem';

export const TextStyles = () => {
  return (
    <div>
      <h1>H1 {Lorem.text(2, 5)}</h1>
      <h2>H2 {Lorem.text(2, 5)}</h2>
      <h3>H3 {Lorem.text(2, 5)}</h3>
      <h4>H4 {Lorem.text(2, 5)}</h4>
      <h5>H5 {Lorem.text(2, 5)}</h5>
      <h6>H6 {Lorem.text(2, 5)}</h6>
      <p><a href='http://www.google.com'>Paragraph</a> {Lorem.paragraph(5, 10)}</p>
      <button type="button" className="btn btn-primary">Primary</button>
      <button type="button" className="btn btn-secondary">Secondary</button>
      <button type="button" className="btn btn-success">Success</button>
      <button type="button" className="btn btn-danger">Danger</button>
      <button type="button" className="btn btn-warning">Warning</button>
      <button type="button" className="btn btn-info">Info</button>
      <button type="button" className="btn btn-light">Light</button>
      <button type="button" className="btn btn-dark">Dark</button>
      
      <button type="button" className="btn btn-link">Link</button>
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