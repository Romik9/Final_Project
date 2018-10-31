import React, {Component} from 'react'
import emptyIcon from '../img/emptyBox.jpg'

class NotFound extends Component{

  render() {
    const {info} = this.props

    return (<div className="empty-wrap">
        <h1 className="empty-info">{info}</h1>
        <div className="empty-img">
          <img src={emptyIcon} alt="empty"/>
        </div>
      </div>

    )
  }
}

export default NotFound