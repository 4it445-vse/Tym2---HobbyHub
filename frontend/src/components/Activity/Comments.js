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
    this._onAddComment = this._onAddComment.bind(this)
    this._renderComments = this._renderComments.bind(this)
  }

  componentDidMount(){
    //let { commentedActivityId } = this.props
    let comments = []

    api('/ActivityHasComments')
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
      return(
        <Comment
          text="Zatím událost nikdo neokomentoval. Buďte první, kdo vyjádří svůj názor!"
          author=""
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

  _onAddComment(){
    this.props.history.push('/createActivityComment/'+this.props.commentedActivityId)
  }

  render() {
    return (
      <div>
        <h3>Komentáře</h3>
        <button
          onClick={this._onAddComment}
          type="button"
          bsStyle="default"
          className="btn btn-default">
            Přidat komentář
        </button>
        {this._renderComments()}
      </div>
    )
  }
}
