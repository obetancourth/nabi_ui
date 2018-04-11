import * as React from 'react';
import Typography from 'material-ui/Typography';
import ImageUploader from './ImageUploader';

const BasicInfo = () => {
  return (
    <>
      {/* This typography element is temporary, TODO: remove typography */}
      <Typography variant="title" className="nabi-margin-top-medium nabi-margin-bottom-medium">
          Basic Info
      </Typography>
      <ImageUploader />
    </>
  );
};

export default BasicInfo;
