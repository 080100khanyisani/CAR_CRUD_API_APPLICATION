function carApp() {
    return {
      cars: [], // Ensure cars is initialized as an empty array
      mostPopularMake: '',
      newCar: {
        color: '',
        make: '',
        model: '',
        reg_number: ''
      },
      regNumberToDelete: '',
  
      
      // Fetch the list of all cars
      fetchCars() {
        axios.get('http://localhost:3000/api/cars')
          .then(response => {
            this.cars = response.data;
          })
          .catch(error => {
            console.error('Error fetching cars: ', error);
          });
      },
  
      // Fetch the most popular make
      fetchMostPopularMake() {
        axios.get('http://localhost:3000/api/mostPopularMake')
          .then(response => {
            this.mostPopularMake = response.data.mostPopularMake;
          })
          .catch(error => {
            console.error('Error fetching most popular make:', error);
          });
      },
  
      // Add a new car
      addCar() {
        axios.post('http://localhost:3000/api/cars', this.newCar)
          .then(() => {
            this.fetchCars(); // Refresh the car list
            this.newCar = { color: '', make: '', model: '', reg_number: '' }; // Reset form
          })
          .catch(error => {
            console.error('Error adding car:', error);
          });
      },
  
      // Delete a car
      deleteCar() {
        axios.delete(`http://localhost:3000/api/cars/${this.regNumberToDelete}`)
          .then(() => {
            this.fetchCars(); // Refresh the car list
            this.regNumberToDelete = ''; // Reset input
          })
          .catch(error => {
            console.error('Error deleting car:', error);
          });
      }
    }
  }
  