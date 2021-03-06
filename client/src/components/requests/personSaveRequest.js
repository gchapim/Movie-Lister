import axios from 'axios'

const url = '/api/people';

class PersonSaveRequest {
  static save(personId, data, success, error, token) {
    console.log(data);
    let auth = { 'Authorization': token }

    const setSuccess = (response) => {
      success(response.data)
    }

    const setError = (errorMessage) => {
      error(errorMessage)
    }

    personId ? (
      axios.put([url, personId].join('/'), data, { headers: auth })
           .then(response => { setSuccess(response) })
           .catch(error => {
             console.log(error);
             setError(error)
           })
    ) : (
      axios.post(url, data, { headers: auth })
           .then(response => { setSuccess(response) })
           .catch(error => {
             console.log(error);
             setError(error)
           })
    )
  }
}

export default PersonSaveRequest;

