import React, {Component} from 'react'
import routes from "../constants/routes";
import { Link } from 'react-router-dom'

const Employees = () => {
    return (
        <div className="container">
            <div className="user_list">
                <div className="employee">
                </div>

class Employees extends Component {
    render() {
        return (
            <div className="container">
                <nav className="navigation">
                    <ul>
                        <li><Link to={routes.employeeList.href}>{routes.employeeList.name}</Link></li>
                        <li><Link to={routes.vacancies.href}>{routes.vacancies.name}</Link></li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default Employees
