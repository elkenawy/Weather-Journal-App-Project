

/* Global Variables */
const url = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const APIKey = '&appid=c3ed1b9b0a10c05bf88dcdd3163389e3&units=metric' ;

// Create a new date instance dynamically with JS

let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();



// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click',action);


function action(){
  const zip = document.getElementById('zip').value;
  const content = document.getElementById('feelings').value;
    if(!zip || !content){
          alert('Please fill the required data!');
          return;
      }
  weatherData(url,zip,APIKey)
  .then(data=>{
    console.log(data)
    postData('/add',{date:newDate, temp:data.main.temp, content:content});
    updateUI();
  });
};

// Get Data Information From Api 

const weatherData = async (url, zip, APIKey)=>{
  const res = await fetch(`${url}${zip}${APIKey}`)
  try {
    const data = res.json();
    console.log(data)
    return data
  }catch(error){
    console.log('error',error)
  }
}

//  Post Data To Server 
const postData =async(url='', data = {})=>{
  console.log(data);
  const response = await fetch(url, {
    method:'POST',
    credentials:'same-origin',
    headers:{
      'Content-Type':'application/json',
    },
    body:JSON.stringify(data)
  });
  try{
    const newData = await response.json();
    console.log(newData)
    return newData;
  }catch(err){
    console.log('error',err)
  }
}

// Update UI 
const updateUI = async()=>{
  const request = await fetch('/all')
  try{
    const allData = await request.json();
    console.log(allData)
    document.getElementById('date').innerHTML = `Date:${allData.date}`;
    document.getElementById('temp').innerHTML = `Temperature:${allData.temp}`;
    document.getElementById('content').innerHTML = `I feel:${allData.content}`;
  }catch(err){
    console.log('error',err);
  }
}


