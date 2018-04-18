import * as React from 'react';
import Cropper from 'cropperjs';
import * as logo from '../../../../assets/images/user-picture-2.png';
import  '../../../../../node_modules/cropperjs/dist/cropper.min.css';
import Button from 'material-ui/Button';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import blur from './blur';

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
            minContainerHeight: 150,
            minContainerWidth: 150,
            modal: false,
            viewMode: 1,
            minCropBoxWidth: 150,
            background: false,
          }
        );
        this.imageHolder.addEventListener('ready', ( e: any ) => {
          let crpCont = document.getElementsByClassName('cropper-container')[0];
          let crpBgd = this.imageToDataUri( this.state.baseImage, 150, 150);
          crpCont.setAttribute(
                    'style',
                    'min-width:150px;'
                    + ' min-height:150px;background-size: cover; background-image: url(\''
                    + crpBgd + '\')');
        });
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
      this.cropperInstance.clear();
      this.cropperInstance.destroy();
      this.cropperInstance = null;
      this.setState({isCropping: false, baseImage: newBase64});
      if ( this.props.imageChanged ) {
        this.props.imageChanged(newBase64);
      }
    }
    // Get new ImageCropped value;
  }
  componentDidMount() {
    // do Somenthing
  }

  imageToDataUri(img: string, width: number, height: number ): string {

    // create an off-screen canvas
    let canvas = document.createElement('canvas');
    let ctx: any = canvas.getContext('2d');
    let imgObj = document.createElement('img');
    imgObj.src = img;
    canvas.width = width;
    canvas.height = height;
    if ( ctx ) {
        ctx.drawImage(imgObj, 0, 0, width, height);
        let imageData = ctx.getImageData(0, 0, width, height);
        ctx.putImageData(blur(imageData, { amount: 2} ), 0, 0);
      }

    // encode image to data-uri with base64 version of compressed image
    return canvas.toDataURL();
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
                                                  borderRadius: '50%',
                                                } : { maxWidth: '100%'};
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
        <label style={{cursor: 'pointer', textAlign: 'center'}} htmlFor="uloadImageFile" className="inner_cropper">
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
