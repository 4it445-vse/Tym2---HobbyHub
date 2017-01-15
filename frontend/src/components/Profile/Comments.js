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
    let { commentedUserId } = this.props
    let comments = []

    api('/Customers/'+commentedUserId+'/toCustomerComments')
      .then((response) => {

        for (let comment of response.data){
          api('/Customers/'+comment.from_user_id)
            .then((_response) => {
              comment.author = _response.data.username
              comments.push(comment)
            })
        }

        this.setState({
          ...this.state,
          comments: comments
        })
      })
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
        {comments.map( c => {
          return <Comment key={c.id} text={c.text} author={c.author} />
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
