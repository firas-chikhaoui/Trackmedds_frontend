import React, { Component } from 'react';
import { Formik,Field,ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Select from 'react-select';
import PropTypes from 'prop-types';

 // @ts-ignore
import colors from "assets/css/colors.scss";

const CustomInput = ({field,form,...props}) =>{
  return(     
      <input {...field} {...props} className="form-control textname"/>
  )
  }

  const CustomcheCkbox = ({field,form,...props}) =>{
    return(
        <input {...field} {...props} />
    )
    }
  
  const CustomInputarea = ({field,form,...props}) =>{
      return(
          <textarea rows="6" {...field} {...props} className="form-control textname"></textarea>
      )
      }
  
  const CustomError = (props) =>{
    return(
  <div className="text-danger">{ props.children }</div>
  )
  }



const { themeBr } = colors;

export default class Reclamation extends Component {

  state = {
    selectedOption: null,
    selectedOptionbis: null,
  };
  constructor(props) {
    super(props)
    this.state = {
      url_api: process.env.REACT_APP_SERVER_URL,
      pharmacie:"",
      medicament:"",
    }
}
handleChangeselect = selectedOption => {
  this.setState(
    { selectedOption }
  );
};
handleChangeselectbis = selectedOptionbis => {
  this.setState(
    { selectedOptionbis }
  );
};

  
  userSchema = Yup.object().shape({
    nom: Yup.string().required("Le nom est obligatoire."),
    subject: Yup.string().required("Le sujet est obligatoire."),
    checkbox: Yup.string().required("checkbox est obligatoire."),
    phone: Yup.string().min(10,"10 caractères minimum").required("Le numéro de téléphone est obligatoire."),
    email: Yup
      .string()
      .email("Merci de saisir une adresse email valide")
      .required("L’adresse email est obligatoire."),
    message: Yup.string().min(20,"20 caractères minimum").required("Message est obligation."),
    });

  componentDidMount() {
      axios.get(this.state.url_api + `/reclamation/searchbis`)
      .then(res => {
        this.setState({
          options : res.data.map(option => ({
          value: option.first_name,
          label: option.first_name+' ('+option.last_name+')'
        }))
       }) 
          console.log(this.state.options);
        })
        .catch(err => console.log(err))

        axios.get(this.state.url_api + `/reclamation/search`)
      .then(res => {
        this.setState({
          optionsbis : res.data.map(option => ({
          value: option.nproduct,
          label: option.nproduct
        }))
       }) 
        //  console.log(this.state.optionsbis);
        })
        .catch(err => console.log(err))
     };
    

  render() {
   
    const { selectedOption,selectedOptionbis } = this.state;
    return (
      <section className="pb-5 reclamation" style={{paddingTop:'80px'}}>
      <div className="container">
         <div className="row">
                 <div className="col-lg-12 col-md-12 text-center pfull-div">
                     <div className="row">
                     <div className="col-lg-2 col-md-2"></div>
                     <div className="col-lg-8 col-md-8">
                     <h1 className="mb-5" style={{color:themeBr}}>Reclamation</h1>

                     <Formik 
                     onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {

            if(this.state.selectedOption!==undefined){
              this.setState({ pharmacie: this.state.selectedOption.value })
            }else{
              this.setState({ pharmacie: "" })
            }

            if(this.state.selectedOptionbis!==undefined){
              this.setState({ medicament : this.state.selectedOptionbis.value })
            }else{
              this.setState({ medicament : "" })
            }


             const userObject = {
              name: values.nom,
              email: values.email,
              subject: values.subject,
              phone: values.phone,
              message: values.message,
              pharmacie: this.state.pharmacie,
              medicament: this.state.medicament,
            };

            console.log(values);

            axios.post(this.state.url_api+`/reclamation/add`, userObject)
              .then((res) => {
                  console.log(res.data)
              }).catch((error) => {
                  console.log(error)
              });


            setSubmitting(true);
          }, 400);
        }}
initialValues={ {nom:'',phone:'',email:'',subject:'',checkbox:'',message:''} }
validationSchema={ this.userSchema }
>
  {({
handleSubmit,
isSubmitting,
      }) => (
        <form onSubmit={ handleSubmit } >
        <div className="form-group">
                <Field name="nom" type="text" placeholder="Nom complet" component={CustomInput}  />
                <ErrorMessage name="nom" component={CustomError} />
        </div>
                <div className="form-group">
				<Field name="email" type="email" placeholder="Adresse email" component={CustomInput} />
                <ErrorMessage name="email" component={CustomError} />
                </div>
                <div className="form-group">
                <Field name="phone" type="text" placeholder="Numéro de téléphone" component={CustomInput} />
                <ErrorMessage name="phone" component={CustomError} />
                </div>
                <div className="form-group">
                  <div className="row">
                  <div className="col-lg-6">
                  <Select
        value={selectedOption}
        isClearable
        onChange={this.handleChangeselect}
        options={this.state.options}
      />
                  </div>
                  <div className="col-lg-6">
                  <Select
        value={selectedOptionbis}
        isClearable
        onChange={this.handleChangeselectbis}
        options={this.state.optionsbis}
      />
                  </div>
                  </div>
      </div>
                <div className="form-group">
                <Field name="subject" type="text" placeholder="Sujet" component={CustomInput} />
                <ErrorMessage name="subject" component={CustomError} />
                </div>
                <div className="form-group">
                <Field name="message" placeholder="Message" component={CustomInputarea} />
                <ErrorMessage name="message" component={CustomError} />
                </div>
      <fieldset className="text-left privacy">
                <div className="fieldset-inner">
                <legend>Politique de confidentialité</legend>
                    <div  className="formRow">
                        <div className="checkboxGroupWrap">
                            <div className="checkboxWrap">
                            <label>
                            <Field name="checkbox" type="checkbox" value="J’ai lu les informations et je suis d’accord" component={CustomcheCkbox} />
                            J’ai lu les informations et je suis d’accord. *)</label>
                            <ErrorMessage name="checkbox" component={CustomError} />
                            </div>
                        </div>
                    </div>		
                </div>


        </fieldset>
        <div className="form-group text-right">
        <button className="btnsend btn btn-primary btn-xs mt-3 mt-5" type="submit" disabled={ isSubmitting } > {isSubmitting ? "Envoyé :)" : "Envoyer"}</button>
			</div>

      </form>
      )
  }
</Formik>



     </div>
     </div>
     </div>
     </div>
     </div>
     </section>
    );
  }
}

Reclamation.propTypes = {
  name: PropTypes.string,
  neighbourhood:PropTypes.string
};