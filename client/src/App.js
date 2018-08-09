import React, { Component } from 'react'
import './styles/App.css'
import Home from './pages/Home'
import { Link, Route, Switch } from 'react-router-dom'
import Comments from './pages/comments/Comments'
import CommentsHistory from './pages/comments/CommentsHistory'
import CreateNewComments from './pages/comments/CreateNewComments'
import routes from './constants/routes'

class App extends Component {
  render () {
    return (
      <div className="container">
        <header className="header">
          <Link to={routes.home.href} className="header__title">{routes.home.name}</Link>
        </header>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/comments' component={Comments}/>
          <Route exact path='/comments/history' component={CommentsHistory}/>
          <Route exact path='/comments/new' component={CreateNewComments}/>
        </Switch>
      </div>
    )
  }
}

export default App
