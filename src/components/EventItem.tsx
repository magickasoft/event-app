import React from 'react';
// @ts-ignore
import getTokens from '@kiwicom/orbit-components/lib/getTokens';
import ThemeProvider from '@kiwicom/orbit-components/lib/ThemeProvider';
import PictureCard from '@kiwicom/orbit-components/lib/PictureCard';
import Clock from '@kiwicom/orbit-components/lib/icons/Clock';
import Car from '@kiwicom/orbit-components/lib/icons/Car';
import SC from 'styled-components';

interface BasicProps {
  subTitle?: string;
  title?: string;
  label?: string;
  image?: any;
  caption?: any;
  name?: any;
  time?: any;
  duration?: any;
  price?: any;
  age?: any;
  relatedItems?: number;
}

const Container = SC.div`
    padding-bottom: 10px;
`;

const Caption = SC.div`
    font-family: 'Roboto',-apple-system,'.SFNSText-Regular','San Francisco','Segoe UI','Helvetica Neue','Lucida Grande',sans-serif;
    font-size: 21px;
    font-weight: 500;
    color: #0e0e0e;
    line-height: 30px;
    margin-top: 5px;
`;

const Name = SC.div`
    font-family: 'Roboto',-apple-system,'.SFNSText-Regular','San Francisco','Segoe UI','Helvetica Neue','Lucida Grande',sans-serif;
    font-size: 16px;
    font-weight: 400;
    color: #4c4c4c;
    line-height: 24px;
    margin-bottom: 5px;
`;

const Label = SC.div`
    background-color: #fff;
    color: #000;
    padding: 4px;
    border: 1px solid #fff;
    border-radius: 3px;
`;

const Row = SC.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    align-self: center;
`;

const Details = SC.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    align-self: center;
    justify-content: space-between;
`;

const Time = SC.span`
    margin-left: 5px;
    font-family: 'Roboto',-apple-system,'.SFNSText-Regular','San Francisco','Segoe UI','Helvetica Neue','Lucida Grande',sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: #000;
    line-height: 24px;
`;

const Duration = SC.span`
    margin-left: 5px;
    font-family: 'Roboto',-apple-system,'.SFNSText-Regular','San Francisco','Segoe UI','Helvetica Neue','Lucida Grande',sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: #000;
    line-height: 24px;
`;

const Price = SC.div`
    margin-left: 5px;
    font-family: 'Roboto',-apple-system,'.SFNSText-Regular','San Francisco','Segoe UI','Helvetica Neue','Lucida Grande',sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: #000;
    line-height: 24px;
`;

const FooterElement = SC.div`
    font-family: 'Roboto',-apple-system,'.SFNSText-Regular','San Francisco','Segoe UI','Helvetica Neue','Lucida Grande',sans-serif;
    font-size: 16px;
    font-weight: normal;
    color: #908e8e;
    line-height: 24px;
`;

const Footer = SC.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
`;

function EventItem({
  subTitle,
  title,
  label,
  image,
  caption,
  name,
  time,
  duration,
  price,
  age,
  relatedItems,
}: BasicProps) {
  const cLabel = label && <Label>{label}</Label>;
  return (
    <ThemeProvider
      theme={{orbit: {...getTokens(), borderRadiusNormal: '15px'}}}>
      <Container>
        <PictureCard
          height="180px"
          image={image}
          label={cLabel}
          onClick={console.log}
          subTitle={subTitle}
          title={title}
        />
        <Caption>{caption}</Caption>
        <Name>{name}</Name>
        <Details>
          <div>
            {Boolean(time) && (
              <Row>
                <Clock />
                <Time>{time}</Time>
              </Row>
            )}
            {Boolean(duration) && (
              <Row>
                <Car />
                <Duration>{duration}</Duration>
              </Row>
            )}
          </div>
          {Boolean(price) && <Price>&#8381;&nbsp;{price}</Price>}
        </Details>
        <Footer>
          <FooterElement>
            {Boolean(relatedItems) ? `${relatedItems} события` : null}
          </FooterElement>
          {Boolean(age.toString()) && <FooterElement>{age}+</FooterElement>}
        </Footer>
      </Container>
    </ThemeProvider>
  );
}

export default EventItem;
