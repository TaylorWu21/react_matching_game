import React from 'react';
import Background from '../public/images/background.jpg';

class Card extends React.Component {
  onCardClick = () => {
    this.props.cardClicked(this.props.card);
  }

  render() {
    return(
      <div className="col s4 m2">
        <div className='center-align'>
          <img
            id={this.props.card.id}
            className="image hoverable responsive-img"
            src={this.props.flipped? this.props.img : Background}
            alt={this.props.card.value}
            onClick={ () => this.onCardClick()}
          />
        </div>
      </div>
    );
  }
}

export default Card;
