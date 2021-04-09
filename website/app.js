/* Global Variables */
const baseURL = `http://api.openweathermap.org/data/2.5/weather?zip=`
const apiKey= 'f0dce9c5c6ff7669c5ed6e03543fe91c';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+ '/'+ d.getDate()+'/'+ d.getFullYear();

//begin with clicking on the button
document.getElementById('generate').addEventListener('click', performAction);

//function to get ZIP code and feelings of user and get weather
function  performAction() {
  //get zip code and user feel values
  let zipCode = document.getElementById('zip').value;
  let feel = document.getElementById('feelings').value;

  //check if zipcode has a value
  if ( zipCode ){
    //call function to get weather info from API
    getWeatherData(baseURL, zipCode, apiKey)

    //call function save weather info at the server end point
    .then(function(tempdata){
      postweather('/add', {temp:tempdata, date: newDate, feelings: feel})
    })
    
    //call function update our page with data
    .then((data)=> {    
      updateUI();
    })
  } else{
    alert('Please enter a ZIP Code');
  }
}

//get the weather info from API
const getWeatherData = async ( link, zip, key)=>{
  try {
    //link composition
    const res = await fetch(`${link}${zip}&appid=${key}&units=metric`);
    //get data from weather API created link
    const allData = await res.json();
    //return current temperature
    return allData.main.temp;
  }catch(err) {
  console.log('Error: '+ err);
  }
}

//POST Route function to save weather info at the server end point
const postweather = async ( url ='', weatherData ={})=>{
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(weatherData),
  });
    try {
      const newData = await response.json();
      return newData;
    }catch(err) {
    console.log('Error: '+ err);
    }
}

//update our website with data
const updateUI = async ()=> {
  // GET Route
    const req= await fetch('/all')
    try{
        const allData = await req.json();
        document.getElementById('date').innerText = "Today is: " + allData.date;
        document.getElementById('temp').innerText = "Temperature now is: " + allData.temp+"℃";
        document.getElementById('content').innerHTML = "Your Feeling about weather is: " + allData.feel;
    } catch(err){
        console.log('Error: '+ err);
    } 
}
