import React, { Component } from 'react';
import UploadImages from './UploadImages';
import SheduleImages from './SheduleImages/SheduleImages';
import { withRouter } from 'react-router-dom'
import generateId from 'js/utils/generateId';

class HomePage extends Component {
  state = {
    images: localStorage.getItem('images') || []
  }
  
  handleUploadChange = (e) => {
    const { images } 
    if (e && ((e.target && e.target.files) || (e.dataTransfer && e.dataTransfer.files))) {
      let imageFile = e.target.files[0] || e.dataTransfer.files[0];
      let fr = new FileReader();
      fr.onload = () => {
        let image = fr.result;
        const idImage = generateId()
        this.setState(prevState => ({ images: [...prevState.images, { image, imageFile, idImage}] }));
        const images = JSON.stringify([{ image, imageFile, idImage}])
        localStorage.setItem(`images`, images );
      }
      fr.readAsDataURL(imageFile);
    }
  }

  redirectEditElement = idImage => () => {
    this.props.history.push(`/editable:${idImage}`)
  }

  render(){
    const { images } = this.state;
    return (
      <React.Fragment>
        <UploadImages handleUploadChange={this.handleUploadChange} />
        <SheduleImages redirectEditElement={this.redirectEditElement} images={images} />
      </React.Fragment>
    );
  }
};

export default withRouter(HomePage);
