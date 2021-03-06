import React, {Component, Fragment} from 'react'
import '../../styles/Employee.css'
import {connect} from 'react-redux'
import Preloader from '../../components/Preloader'
import {withStyles} from '@material-ui/core/styles'
import noPhoto from '../../img/no-photo.png'
import employeeStyles from '../../constants/employeeStylesJSS'
import routes from '../../constants/routes'
import {Link} from 'react-router-dom'
import api from '../../services/Api'
import picture from '../../img/add.png'
import Lightbox from 'react-images'
import filterCollection from '../../components/filterCollection'
import trash from '../../img/delete.png'
import update from '../../img/edit.png'
import { getAllVacancies } from '../../actions/actions'
import { toastr } from 'react-redux-toastr'

class EmployeesPage extends Component {
  constructor (props) {
    super(props)
    this.searchInput = React.createRef()
    this.state = {
      employees: [],
      showOnlyCRM_users: false,
      lightbox: null,
      seacrh: null
    }
  }

  componentWillMount () {
    api.get('/employee')
      .then(response => {
        this.setState({employees: response.data})
      })
  }

  deleteEmployee (id) {
    const toastrConfirmOptions = {
      onOk: () => api.deleteApi(`/employee/${id}`)
    }
    toastr.confirm('Вы уверены, что хотите удалить сотрудника?', toastrConfirmOptions)
  }

  render () {
    const {employees, search} = this.state
    const {classes} = this.props
    let resultEmployee = []
    let searchValue = this.searchInput.value

    if (searchValue && searchValue.toLowerCase()) {
      searchValue = searchValue.toLowerCase()
    }

    if (search) {
      resultEmployee = filterCollection(employees, searchValue, true, 'forename', 'surname', 'info', 'position.title', 'phoneNumber')
    } else {
      resultEmployee = employees
    }

    if (!this.state.employees) {
      return <Preloader/>
    } else {
      return (
        <Fragment>
          <div className="add_and_history add_and_history--employee">
            <input
              className="employee-search"
              type="text"
              placeholder="Поиск"
              onChange={() => this.setState({search: true})}
              ref={input => this.searchInput = input}
            />
            <Link to={routes.addNewEmployee.href}>
              <img alt="add comment" src={picture}/>
            </Link>
          </div>
          <ul className="employeeList">

            {resultEmployee.map(employee => {
              return <li className="employeeList__elem" key={employee.id}>
                <div className="employee-fotoWrap">
                  {employee.image ? <div
                    onClick={() => this.setState({lightbox: employee.image})}>
                    <img src={employee.image} alt=""/>
                    <Lightbox
                      isOpen={this.state.lightbox === employee.image}
                      images={[{src: employee.image}]}
                      onClickImage={() => this.setState({lightbox: null})}
                      onClose={() => this.setState({lightbox: null})}
                    />
                  </div> : <div><img src={noPhoto} alt="#"/></div>}
                </div>
                <div className="employee-wrapInfo">
                  <h3 className="employee-data">
                    {employee.forename + ' ' + employee.surname}
                  </h3>
                  <h4 className="employee-tel">
                    <a href={'tel:' + employee.phoneNumber}>{employee.phoneNumber}</a>
                  </h4>
                  <p className="employee-info">
                    {employee.info}
                  </p>
                </div>
                <div className="employee-page__elem-buttons">
                  <button onClick={() => this.deleteEmployee(employee.id)}
                    className={classes.buttons}>
                    <img alt="trash" src={trash}/>
                  </button>
                  <button className={classes.buttons}>
                    <Link
                      to={{pathname: routes.updateEmployee.href + employee.id, state: employee}}>
                      <img alt="update" src={update}/>
                    </Link>
                  </button>
                </div>
              </li>
            })}
          </ul>
        </Fragment>
      )
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllVacancies: () => dispatch(getAllVacancies())
  }
}

const mapStateToProps = (state) => {
  return {
    vacancies: state.vacancies,
    positions: state.startData.positions,
    currentUser: state.startData.currentUser,
    employees: state.employees
  }
}

export default withStyles(employeeStyles)(connect(mapStateToProps, mapDispatchToProps)(EmployeesPage))
