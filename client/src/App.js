import React, { Component } from 'react'
import './styles/App.css'
import Home from './pages/Home'
import { Link, Route, Switch, withRouter } from 'react-router-dom'
import Comments from './pages/shifts/Shifts'
import ShiftsHistory from './pages/shifts/ShiftsHistory'
import CreateNewComments from './pages/shifts/CreateNewShift'
import Tasks from './pages/Tasks'
import MyTasks from './pages/tasks/MyTasks'
import Employees from './pages/Employees'
import EmployeeList from './pages/EmployeeList'
import Vacancies from './pages/Vacancies'
import WashingData from './pages/WashingData'
import SalesNumbers from './pages/washingDate/SalesNumbers'
import Lodgers from './pages/washingDate/Lodgers'
import routes from './constants/routes'
import { connect } from 'react-redux'
import {
  addAllLocation,
  addAllPositions,
  addAllSchedules, addAllUsers,
  addCurrentUser, addFrequencies,
  addShift,
  addTaskStatuses
} from './actions/actions'
import Preloader from './components/Preloader'
import { startData } from './utils/Utills'
import CreateNewTask from './pages/tasks/CreateNewTask'

class App extends Component {
  componentDidMount () {
    startData(
      data => { this.props.addUser(data) },
      data => { this.props.addAllPositions(data) },
      data => { this.props.addSchedules(data) },
      data => { this.props.addAllLocation(data) },
      data => { this.props.addShift(data) },
      data => { this.props.addStatuses(data) },
      data => { this.props.addFrequencies(data) },
      data => { this.props.addAllUsers(data) }
    )
  }

  render () {
    if (!this.props.user ||
      !this.props.schedules ||
      !this.props.positions ||
      !this.props.comments ||
      !this.props.locations ||
      !this.props.statuses ||
      !this.props.frequencies) {
      return (
        <Preloader/>
      )
    }
    return (
      <div className="container">
        <header className="header">
          <Link to={routes.home.href} className="header__title">{routes.home.name}</Link>
        </header>
        <Switch>
          <Route exact path={routes.home.href} component={Home}/>
          <Route exact path={routes.employees.href} component={Employees}/>
          <Route exact path={routes.employeesList.href} component={EmployeeList}/>
          <Route exact path={routes.vacancies.href} component={Vacancies}/>
          <Route exact path={routes.comments.href} component={Comments}/>
          <Route exact path={routes.commentsHistory.href} component={ShiftsHistory}/>
          <Route exact path={routes.addNewComments.href} component={CreateNewComments}/>
          <Route exact path={routes.updateComment.href + ':commentId'} component={CreateNewComments}/>
          <Route exact path={routes.tasks.href} component={Tasks}/>
          <Route exact path={routes.tasks.createNewTask.href} component={CreateNewTask}/>
          <Route exact path={routes.tasks.myTasks.href} component={MyTasks}/>
          <Route exact path={routes.washingData.href} component={WashingData}/>
          <Route exact path={routes.washingData.salesNumbers.href} component={SalesNumbers}/>
          <Route exact path={routes.washingData.lodgers.href} component={Lodgers}/>
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = ({comments, startData}) => {
  return {
    user: startData.currentUser,
    positions: startData.positions,
    schedules: startData.schedules,
    comments: comments.lastComments,
    locations: startData.locations,
    statuses: startData.statuses,
    frequencies: startData.frequencies
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (data) => {
      dispatch(addCurrentUser(data))
    },
    addAllPositions: (data) => {
      dispatch(addAllPositions(data))
    },
    addSchedules: (data) => {
      dispatch(addAllSchedules(data))
    },
    addAllLocation: (data) => {
      dispatch(addAllLocation(data))
    },
    addShift: (data) => {
      dispatch(addShift(data))
    },
    addStatuses: (data) => {
      dispatch(addTaskStatuses(data))
    },
    addFrequencies: (data) => {
      dispatch(addFrequencies(data))
    },
    addAllUsers: (data) => {
      dispatch(addAllUsers(data))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))