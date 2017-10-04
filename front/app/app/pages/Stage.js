import React from 'react';

import {
  Card,
  CardBody,
  CardTitle,
  CardSubTitle,
  CardText,
  CardLink,
  CardHeader,
  CardXHeader,
  CardFooter
} from '../components/controls/presentational/Card';

class Stage extends React.Component {

  render () {
    return <div className='full-window-cover-center risky_concrete'>
      <Card width='400px' dropShadow='xl'>
        <CardXHeader height='150px' horizontal='right' vertical='bottom' className='morpheus_den p-2'><h2>Cool header</h2></CardXHeader>
        <CardHeader>Header</CardHeader>
        <CardBody>
          <CardTitle>This is a card!</CardTitle>
          <CardSubTitle>Subtitles are cool</CardSubTitle>
          <CardText>Card! Card! Card! Card! </CardText>
          <CardLink href="http://www.google.com">Link text</CardLink>
        </CardBody>
        <CardFooter>Footer</CardFooter>
      </Card>
    </div>;
  }
}

Stage.defaultProps = {};
Stage.propTypes    = {};

export default Stage;
