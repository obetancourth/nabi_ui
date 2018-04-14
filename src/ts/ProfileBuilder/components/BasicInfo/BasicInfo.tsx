import * as React from 'react';
import Typography from 'material-ui/Typography';
import ImageUploader from './ImageUploader';

interface BasicInfoProps {
  changeAvatar: (email: string, avatar: string) => void;
}
const BasicInfo = ( props: BasicInfoProps ) => {
  return (
    <div>
      {/* This typography element is temporary, TODO: remove typography */}
      <Typography variant="title" className="nabi-margin-top-medium nabi-margin-bottom-medium">
          Basic Info
      </Typography>
      <ImageUploader imageChanged={(avatar: string) => {props.changeAvatar('', avatar); }}/>
    </div>
  );
};

export default BasicInfo;
