import Page from 'components/Page';
import Typography from 'components/Typography';
import React from 'react';
import {
} from 'reactstrap';

import {iframe2image} from 'iframe2image';

export class VideoRecognitionPage extends React.Component {
  componentDidMount(){
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');

    canvas.width = 500;
    canvas.height = 600;

    let inner = document.getElementById('inner');

    iframe2image(inner, function (err, img) {
      console.log(err)
      console.log(img)
      if (err) { return console.error(err); }
      context.drawImage(img, 0, 0);
    });
  }

  render(){
    return (
      <Page title="Video recognition" breadcrumbs={[{ name: 'Video recognition', active: true }]}>
        <canvas id="canvas"></canvas>
        <iframe id="inner" width="420" height="315" src="https://www.youtube.com/embed/tgbNymZ7vqY">
        </iframe>
      </Page>
    );
  }
};

export default VideoRecognitionPage;
