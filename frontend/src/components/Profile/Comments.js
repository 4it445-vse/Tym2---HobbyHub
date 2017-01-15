import React, { Component } from 'react';
import { Well } from 'react-bootstrap';

import api from '../../api.js';

const Comment = (props) => (
  <Well>
    <p><em>{props.text}</em></p>
    <p className="text-right"><em>- {props.author}</em></p>
  </Well>
);

export class Comments extends Component {

  constructor(props) {
    super(props);
    this.state = {
      comments: []
    }
  }

  componentDidMount(){

  }

  _renderComments(){
    let { comments } = this.state

    if(comments.length === 0){
      // render default comment
      return(
        <Comment
          text="Zatím Vás slovně nikdo neohodnotil!"
          author="HobbyHub"
        />
      )
    }
    return (
      <div>
        {comments.map( comment => {
          return <Comment text={comment.text} author={comment.author} />
        })}
      </div>
    )
  }

  render() {
    return (
      <div>
        <h3>Napsali o mně</h3>
        {this._renderComments()}
      </div>
    )
  }
}
