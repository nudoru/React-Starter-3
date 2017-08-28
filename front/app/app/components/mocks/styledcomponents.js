import React from "react";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";

import RHUTheme from "../theme/rh.js";

// https://www.npmjs.com/package/styled-components-theme

const ContentHeader = styled.p`
  font-family: ${props => props.theme.fontStacks.header};
  font-size: ${props => props.theme.metrics.fontSizeLarge};
  line-height: 2.4rem;
  margin: 0;
  margin-bottom: 2rem;
  padding: 0;
  color: ${props => props.theme.colors.headings};
`;

const ContentRegular = styled.p`
  font-family: ${props => props.theme.fontStacks.content};
  font-size: ${props => props.theme.metrics.fontSize};
  line-height: 2.4rem;
  margin: 0;
  padding: 0;
  color: ${props => props.theme.colors.headings};
`;

const ContentSmall = ContentRegular.extend`
  font-size: ${props => props.theme.metrics.fontSizeSmall};
  line-height: 2rem;
`;

const ContentTiny = ContentRegular.extend`
font-size: ${props => props.theme.metrics.fontSizeTiny};
line-height: 1.4rem;
`;

const H1 = ContentHeader.withComponent("h1").extend`
  font-size: 4.2rem;
  font-weight: 700;
  line-height: 4rem;
  margin-top: .5rem;
`;

const H2 = ContentHeader.withComponent("h2").extend`
  font-size: 2.2rem;
  font-weight: 700;
  text-transform: uppercase;
`;

const H3 = ContentHeader.withComponent("h3").extend`
  font-size: 2.2rem;
  font-weight: 700;
`;

const H4 = ContentHeader.withComponent("h4").extend`
  font-size: 1.8rem;
  font-weight: 700;
`;

const H5 = ContentHeader.withComponent("h5").extend`
  font-size: 1.6rem;
  font-weight: 700;
  text-transform: uppercase;
`;

const H6 = ContentHeader.withComponent("h6").extend`
  font-size: 1.6rem;
  font-weight: 700;
`;

const Content = (props) => {
  if(props.small) {
    return <ContentSmall>{props.children}</ContentSmall>;
  } else if(props.tiny) {
    return <ContentTiny>{props.children}</ContentTiny>;
  } else {
    return <ContentRegular>{props.children}</ContentRegular>
  }
};

export const StyledComponents = () => {
  console.log(RHUTheme);
  return (
    <ThemeProvider theme={RHUTheme}>
      <div>
        <H1>Lorem Ipsum is simply dummy text of the printing and typesetting industry</H1>
        <H2>Lorem Ipsum is simply dummy text of the printing and typesetting industry</H2>
        <H3>Lorem Ipsum is simply dummy text of the printing and typesetting industry</H3>
        <H4>Lorem Ipsum is simply dummy text of the printing and typesetting industry</H4>
        <H5>Lorem Ipsum is simply dummy text of the printing and typesetting industry</H5>
        <H6>Lorem Ipsum is simply dummy text of the printing and typesetting industry</H6>
        <Content>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</Content>
        <Content small>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</Content>
        <Content tiny>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</Content>
      </div>
    </ThemeProvider>
  );
};
