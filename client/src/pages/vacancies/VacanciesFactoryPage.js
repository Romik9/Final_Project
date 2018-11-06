import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import Preloader from '../../components/Preloader'
import {getAllVacancies} from "../../actions/actions";
import Select from 'react-select'

class VacanciesFactoryPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      toUpdate: false,
      successAction: '',
      id: null,
      positionId: null,
      info: null,
      salary: null,
      status: null,
      publication: null,
      sendingData: false,
      positionIdError: null,
      infoError: null
    };
  }

  createVacancy = () => {
    const {toUpdate, sendingData} = this.state;

    if (!sendingData) {
      axios({
        url: '/vacancy',
        method: toUpdate ? 'PUT' : 'POST',
        data: toUpdate ? {
            id: this.state.id,
            positionId: this.positionId.value,
            info: this.info.value,
            salary: this.salary.value,
            status: this.status.value,
            publication: this.state.publication
          }
          : {
            positionId: this.positionId.value,
            info: this.info.value,
            salary: this.salary.value
          },
      })
        .then((response) => this.setState({
          successAction: toUpdate ? 'Вакансия изменена успешно' : 'Создана новая вакансия'
        }))
        .then(() => this.props.history.push('/employees/vacancies'))
    }
  };

  componentWillMount() {
    const item = this.props.location.state;

    if (item) {
      this.setState({
        id: item.id,
        positionId: item.positionId,
        status: item.status,
        salary: item.salary,
        info: item.info,
        publication: item.publication,
        toUpdate: true
      })
    }
  }



  render() {
    const {positions} = this.props;
    const {positionId, status, salary, info, toUpdate} = this.state;

    const styles = {
      dropdownIndicator: (base, state) => ({
      }),

      placeholder: (base, state) => ({
      }),
      valueContainer: (base, state) => ({
      }),
      control: (base, state) => ({
      }),
      indicatorsContainer: (base, state) => ({

      }),
      input: (base, start) => ({
        display: "none"
      })
    }

    let options = []

    positions.map(position =>
      options.push({value: position.id, label: position.title})
    )

    let placeholder = options[0].label

    let positionSelect =
      <Select
        className="vacancy__select"
        classNamePrefix="react-select"
      styles={styles}
        options={options}
        ref={(input) => this.positionId = input}
        placeholder={"Позиция"}
      />

    if (!positions) {
      return <Preloader/>
    } else return (
      <div className="container vacancy__wrap">
        <div>
            <div className="vacancy__wrap-select">
            {positionSelect}
            </div>
            {toUpdate &&
            <p> Status: </p>}
            {toUpdate && <select ref={(input) => this.status = input} defaultValue={status}>
              <option key='1' value='OPENED'> OPENED</option>
              <option key='2' value='CLOSED'> CLOSED</option>
            </select>}
            <div className="vacancy__wrap-select">
            <input className="vacancy__salary"
                   type="text"
                   ref={(input) => this.salary = input}
                   defaultValue={salary}
                   placeholder="Зарплата"/>
            </div>
            <div className="vacancy__wrap-textarea">
            <textarea
              className="vacancy__textarea"
              rows="5"
              placeholder={'Привет друг, что бы ты хотел мне написать?'}
              ref={(input) => this.info = input}
              defaultValue={info}/>
            </div>
          <div className="vacancy__btns">
          <button
              className="vacancy__create"
              onClick={this.createVacancy}
              value={this.props.location.state ? "Изменить вакансию" : "Добавить вакансию"}>
            {this.props.location.state ? "Изменить вакансию" : "Добавить вакансию"}
            </button>
          </div>
        </div>
        <p>{this.state.successAction}</p>
      </div>
    )
  }
}

const mapStateToProps = ({startData}) => {
  return {
    positions: startData.positions
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    // updateVacancy: () => dispatch(updateVacancy()),
    // addNewVacancy: () => dispatch(addNewVacancy()),
    getAllVacancies: () => dispatch(getAllVacancies()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(VacanciesFactoryPage)