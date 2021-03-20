import React from 'react';
import PictureCard from '@kiwicom/orbit-components/lib/PictureCard';
import SC from 'styled-components';

interface BasicProps {
  subTitle?: string;
  title?: string;
  label?: string;
  image?: any;
}

const Container = SC.div`

`;

const Caption = SC.div`
    font-family: 'Roboto',-apple-system,'.SFNSText-Regular','San Francisco','Segoe UI','Helvetica Neue','Lucida Grande',sans-serif;
    font-size: 21px;
    font-weight: 500;
    color: #0e0e0e;
    line-height: 25px;
`;

const Name = SC.div`
font-family: 'Roboto',-apple-system,'.SFNSText-Regular','San Francisco','Segoe UI','Helvetica Neue','Lucida Grande',sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: #ccc;
    line-height: 24px;
`;

const Label = SC.div`
    background-color: #fff;
    color: #000;
    padding: 4px;
    border: 1px solid #fff;
    border-radius: 3px;
`;

function EventItem({subTitle, title, label, image}: BasicProps) {
  return (
    <Container>
      <PictureCard
        height="300px"
        image={
          image || {
            code: 'moscow_ru',
            name: 'moscow_ru',
            original: '385x320',
            placeholder: '385x320',
          }
        }
        label={<Label>{label || 'Рекомендация'}</Label>}
        onClick={console.log}
        subTitle={subTitle || 'subTitle'}
        title={title || 'title'}
      />
      <Caption>Выставка "мечты о море"</Caption>
      <Name>Выставка "мечты о море"</Name>
    </Container>
  );
}

export default EventItem;
