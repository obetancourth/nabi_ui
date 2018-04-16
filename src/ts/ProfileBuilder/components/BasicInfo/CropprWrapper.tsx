import * as React from 'react';
import Cropper from 'cropperjs';
import * as logo from '../../../../assets/images/user-picture-2.png';
import  '../../../../../node_modules/cropperjs/dist/cropper.min.css';
import Button from 'material-ui/Button';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';

interface CropprState {
  isLoading: boolean;
  isCropping: boolean;
  baseImage: any;
}

interface CropprProps {
  originalImage?: any;
  imageChanged?(avatar: string): void;
}

const styles = (theme: Theme) => ({
  inIfiniteSpace: {
    display: 'block',
    top: '-100px',
    left: '-500px',
  }
});

type PropsWithStyles = CropprProps & WithStyles<'inIfiniteSpace'>;

class CropprWrapper extends React.Component<PropsWithStyles, CropprState> {
  cropperInstance: any;
  imageHolder: any;
  fileUpload: any;
  constructor(props: PropsWithStyles) {
    super(props);

    this.state = {
      isLoading: false,
      isCropping: false,
      baseImage: props.originalImage || logo,
    };

    this.cropperInstance = null;
    this.imageOnClick = this.imageOnClick.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleCrop = this.handleCrop.bind(this);
  }

  onFileChange(e: any ) {
    let picFiles: any = e.target.files;
    let onePic: any = picFiles[0];

    if (FileReader && picFiles && picFiles.length) {
       let fr = new FileReader();
       fr.onload =  () => {
           this.setState({isCropping: true, baseImage: fr.result});
       };
       fr.readAsDataURL(onePic);
    }

  }

  componentDidUpdate() {
    if ( this.state.isCropping ) {
        // this.cropperInstance  = new Croppr(this.imageHolder, { aspectRatio : 1, startSize : [150, 150, 'px'] });
        this.cropperInstance  = new Cropper(
          this.imageHolder,
          {
            aspectRatio: 1,
            minContainerHeight: 320,
            viewMode: 1,
            minCropBoxWidth: 150,
          }
        );
    }
  }

  imageOnClick(e: any) {
    e.preventDefault();
    e.stopPropagation();
  }

  handleCrop(e: any) {
    e.preventDefault();
    e.stopPropagation();
    let newBase64 = this.cropperInstance.getCroppedCanvas(
      {
        minWidth: 150,
        maxWidth: 300,
        fillColor: '#ffffff',
        imageSmoothingQuality: 'high'
      }
    ).toDataURL();
    if (newBase64) {
      this.cropperInstance.destroy();
      this.setState({isCropping: false, baseImage: newBase64});
      if ( this.props.imageChanged ) {
        console.log(this.props.imageChanged);
        this.props.imageChanged(newBase64);
      }
    }
    // Get new ImageCropped value;
  }
  componentDidMount() {
    // do Somenthing
  }

  render() {
    let currentLogo = this.state.baseImage ;
    let actions = null;
    if ( this.state.isCropping ) {
      actions = (<Button color="primary" onClick={this.handleCrop} variant="raised">Change Photo</Button>);
    }
    const imgStyle = ( !this.state.isCropping ) ? {
                                                  width: '140px',
                                                  height: '140px',
                                                  maxWidth: '100%',
                                                } : { maxWidth: '100%' };
    return (
      <div>
        <input
          className={this.props.classes.inIfiniteSpace}
          style={{position: 'fixed'}}
          id="uloadImageFile"
          type="file"
          onChange={this.onFileChange}
          ref={(e) => { this.fileUpload = e; }}
          disabled={this.state.isCropping}
        />
        <label style={{cursor: 'pointer'}} htmlFor="uloadImageFile">
             <img ref={(e) => { this.imageHolder = e; }} src={currentLogo} style={imgStyle}/>
        </label>
        <div style={{textAlign: 'right'}}>
          {actions}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)<CropprProps>(CropprWrapper);
