import React, { Component } from 'react';
import { Link } from 'react-router';
import { Well } from 'react-bootstrap';

import './Comments.css'

import api from '../../api.js';

const Comment = (props) => (
  <Well className="comment-well">
    <p><em>{props.text}</em></p>
    <p className="text-right"><em>- {props.author}</em></p>
  </Well>
);

const AddCommentButton = (props) => (
  <Link
    to={'/createActivityComment/'+props.commentedActivityId}
    id="createCommentLink">
    <h4>Přidat komentář</h4>
  </Link>
);

export class Comments extends Component {

  constructor(props) {
    super(props);
    this._renderComments = this._renderComments.bind(this)
    this.state = {
      comments: []
    }
  }

  componentDidMount(){
    let commentedActivityId = parseFloat(this.props.commentedActivityId)

    api('/ActivityHasComments')
      .then((response) => {

        let relatedComments = response.data.filter(function(c) {
          return c.activity_id === commentedActivityId
        })

        for (let comment of relatedComments){
          api('/Customers/'+comment.from_user_id)
            .then((_response) => {
              comment.author = _response.data.username
              this.setState({
                ...this.state,
                comments: relatedComments
              })
            })
        }
      })
  }

  _renderComments(){
    let { comments } = this.state

    if(comments.length === 0){
      return(
        <Comment
          text="Zatím událost nikdo neokomentoval. Buďte první, kdo vyjádří svůj názor!"
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
    let { commentedActivityId } = this.props
    return (
      <div>
        <h3>Komentáře</h3>
        <AddCommentButton commentedActivityId={ commentedActivityId }/>
        {this._renderComments()}
      </div>
    )
  }
}
