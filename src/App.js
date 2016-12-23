import React from 'react';
import './App.css';
import Card from './Card';
import Taylor from '../public/images/taylor.jpg';
import Brittanie from '../public/images/brittanie.jpg';
import Randy from '../public/images/randy.jpg';
import Nhi from '../public/images/nhi.jpg';
import Joe from '../public/images/joe.jpg';
import Jordan from '../public/images/jordan.jpg';
import Dalton from '../public/images/dalton.jpg';
import Jen from '../public/images/jen.jpg';
import Mikey from '../public/images/mikey.jpg';
import Jeff from '../public/images/jeff.jpg';
import Anna from '../public/images/anna.jpg';
import Jasmine from '../public/images/jasmine.jpg';
import Jane from '../public/images/jane.jpg';
import Jayvie from '../public/images/jayvie.jpg';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.getFriends = this.getFriends.bind(this);
    this.state = { friends: [], selectView: true, count: 0, compare: [], matching: false, matched: 0 };
  }

  componentDidMount() {
    window.jQuery('select').material_select();
  }

  shuffle = (array) => {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

  getFriends(e) {
    e.preventDefault();
    let chosenFriends = this.refs;
    let friendsArr = [];
    let friendObj = {};
    let friendObj2 = {}
    let id = 0;
    Object.keys(chosenFriends).forEach(function(key) {
      if(chosenFriends[key].selected) {
        friendObj = { id: ++id,friend: chosenFriends[key], flipped: false };
        friendsArr.push(friendObj);
        friendObj2 = { id: ++id,friend: chosenFriends[key], flipped: false };
        friendsArr.push(friendObj2);
      }
    });
    let friends = this.shuffle(friendsArr);
    this.setState({ friends: friends, selectView: false });
  }

  selectForm() {
    return(
      <div>
        <div className='row'>
          <h4 className='center white-text'>Select Your Friends</h4>
          <form className="col s10 offset-s1 input-field text-white" onSubmit={this.getFriends}>
            <select multiple>
              <option ref='taylor' data-icon={Taylor} className="circle">Taylor</option>
              <option ref='randy' data-icon={Randy} className="circle">Randy</option>
              <option ref='brittanie' data-icon={Brittanie} className="circle">Brittanie</option>
              <option ref='nhi' data-icon={Nhi} className="circle">Nhi</option>
              <option ref='joe' data-icon={Joe} className="circle">Joe</option>
              <option ref='jordan' data-icon={Jordan} className="circle">Jordan</option>
              <option ref='dalton' data-icon={Dalton} className="circle">Dalton</option>
              <option ref='jen' data-icon={Jen} className="circle">Jen</option>
              <option ref='mikey' data-icon={Mikey} className="circle">Mikey</option>
              <option ref='jeff' data-icon={Jeff} className="circle">Jeff</option>
              <option ref='anna' data-icon={Anna} className="circle">Anna</option>
              <option ref='jasmine' data-icon={Jasmine} className="circle">Jasmine</option>
              <option ref='jane' data-icon={Jane} className="circle">Jane</option>
              <option ref='jayvie' data-icon={Jayvie} className="circle">Jayvie</option>
            </select>
            <label>Select Your Friends</label>
            <div className='center'>
              <button type="submit" className='btn teal'>START</button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  cardClicked = (card) => {
    if(!this.state.matching) {
      let friends = this.state.friends.map( friend => {
        if(card.id === friend.id) {
          card.flipped = true;
          return card;
        }
        return friend;
      });

      this.setState({ friends: friends, count: ++this.state.count, compare: [card, ...this.state.compare] });
      if(this.state.count === 2) {
        this.setState({ matching: true });
        if(card.id === this.state.compare[0].id) {
          window.Materialize.toast('Nice Try', 3000);
          this.setState({ count: 0, compare: [], matching: false });
          card.flipped = false;
        }
        setTimeout(() => {
          this.compare(this.state.compare[0], this.state.compare[1]); },
          1000
        );
      }
    }
  }

  compare = (first, second) => {
    if(first.friend.value === second.friend.value) {
      window.Materialize.toast('Nice!', 3000);
      this.setState({ count: 0, compare: [], matching: false, matched: ++this.state.matched });
      if(this.state.matched === this.state.friends.length / 2) {
        window.Materialize.toast('Congratz!!', 7000);
      }
    } else {
      let friends = this.state.friends.map( friend => {
        if(friend.id === first.id) {
          first.flipped = false;
          return first;
        }
        if(friend.id === second.id) {
          second.flipped = false;
          return second;
        }
        return friend
      })
      window.Materialize.toast('Nope', 3000);
      this.setState({ friends: friends, count: 0, compare: [], matching: false });
    }
  }

  render() {
    if(this.state.selectView) {
      return this.selectForm()
    } else {
      let cards = this.state.friends.map( card => {
        return(
          <Card
            key={card.id}
            img={card.friend.dataset.icon}
            card={card}
            flipped={card.flipped}
            cardClicked={this.cardClicked}
          />
        );
      });

      return (
        <div>
          <div className='row'>
            {cards}
          </div>
        </div>
      )
    }
  }
}

export default App;
