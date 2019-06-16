import React, { Component } from 'react';

import './EditUser.css';

import { Formik } from 'formik';
import Api from '../../../api/api';


class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = { userid: 1 }
  }

  async componentDidMount() {


    let userdetails = await Api.fetchUserDetails(this.state.userid);

    this.setState(userdetails);
    console.log(this.state)
  }


  render() {
    //TODO: Adicionar um scroll para os eventos
    return (
      <div className="row">
        <div className="edit-form">
        <Formik
      validate={values => {
        let errors = {};
        if (!this.state.password) {
          errors.password = 'Required';
        }
        if (!this.state.name) {
            errors.name = 'Required';
        }
        if (!this.state .email) {
            errors.email = 'Required';
        }else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(this.state.email)
          ) {
            errors.email = 'Invalid email address';
          }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        const a = await Api.fetchUpdateUser(this.state);
        //Redirecionar para as páginas
        if(a===true){
          alert("Detalhes alterados");
        }else{
          alert("Erro ao atualizar detalhes")
        }
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
        <div className="edit-user">
            <p className="">Password:</p>
            <input
              className="editpassword"
                placeholder="Password"
                type="password"
                name="password"
                onChange={(event) => this.setState({password : event.target.value})}
                onBlur={handleBlur}
                value={this.state.password}
            />
            <p className="error-info">{errors.password && touched.password && errors.password}</p>
          </div>
        <div className="edit-user">
            <p className="">Name:</p>
            <input
                className="editname"
                placeholder="Name"
                type="text"
                name="name"
                onChange={(event) => this.setState({name : event.target.value})}
                onBlur={handleBlur}
                value={this.state.name}
            />
            <p className="error-info">{errors.name && touched.name && errors.name}</p>
          </div>
          <div className="edit-user">
            <p className="">Email:</p>
            <input
                className="editemail"
                placeholder="user@email.com"
                type="email"
                name="email"
                onChange={(event) => this.setState({email : event.target.value})}
                onBlur={handleBlur}
                value={this.state.email}
            />
            <p className="error-info">{errors.email && touched.email && errors.email}</p>
          </div>
          <div className="button-container">
          <button className="btn-1" type="submit" disabled={isSubmitting}>
            Save Changes
          </button>
                  </div>
                </form>
              )}
          </Formik>
        </div>
      </div>
    );
  }
}

export default EditUser;