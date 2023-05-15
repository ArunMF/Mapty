'use strict';

// localStorage.clear();
const form= document.querySelector('.form');
const div1= document.querySelector('.div1');
const div2= document.querySelector('.div2');
const div3= document.querySelector('.div3');
const div5=document.querySelector('.div5');
const type= document.querySelector('.type');
const distance= document.querySelector('.distance');
const duration= document.querySelector('.duration');
const cadence= document.querySelector('.cadence');
const elevation= document.querySelector('.elevation');
const inputType= document.querySelector('.runORcycle');
const inputDistance= document.querySelector('.dist');
const inputDuration= document.querySelector('.dur');
const inputCadence= document.querySelector('.cad');
const inputElevation= document.querySelector('.elev');

// Type selecting function
function selectType(){
   let x=document.querySelector('.runORcycle');
   let y=x.value;
   console.log(y); 
   if(y=="Cycling")
   {  cadence.classList.add("hidden");
      elevation.classList.remove("hidden");   }
   else if(y=="Running")
   {  cadence.classList.remove("hidden");
      elevation.classList.add("hidden");   }
}

div1.addEventListener('click',function(){
   div3.classList.add("hidden");
 });


// Load map
let map,mapEvent;
if(navigator.geolocation)
    navigator.geolocation.getCurrentPosition(
        function (position){
          const {latitude}= position.coords;
          const {longitude}= position.coords;

          const coords= [latitude,longitude];

         map = L.map('map').setView(coords, 15);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
           attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

      //   Clicking on a point on the map
        map.on('click',function(mapE){
           mapEvent=mapE;
           console.log(mapEvent.latlng);

         //   Opening form
           div3.classList.remove("hidden"); 
           form.addEventListener('submit',function(e){
            e.preventDefault();
            console.log(mapEvent);
            let ty=inputType.value;
            let di=inputDistance.value;
            let dur=inputDuration.value;
            let cad=inputCadence.value;
            let elv=inputElevation.value;
            let avg=di/dur;
            console.log(di);
            let d= new Date();
            let a= d.toDateString();
            let {lat,lng}= mapEvent.latlng;
            div3.classList.add("hidden");
            
            for(let i=1;i>0;i++){
               if(localStorage.getItem(`mdiv${i}`)===null){
                  // creating div tag to save record
                 let box = 
               `<div class="div5" id="mdiv${i}"><br>&nbsp;
               <p class="typeValue" id="typeValue${i}"></p>
               &emsp;<p class="distValueRun" id="distValueRun${i}"></p>&nbsp;
               <p class="distValueRun" id="distValueCycle${i}"></p>&nbsp;
               <p class="distValueRun" id="durValue${i}"></p>&nbsp;
               <p class="distValueRun" id="timeValue${i}"></p>&nbsp;
               <p class="distValueRun" id="stepValue${i}"></p>&nbsp;
               <p class="distValueRun" id="speedValue${i}"></p>
   
           </div>
           <br>`;
           
           // Save Div tag to LocalStorage
           localStorage.setItem(`mdiv${i}`,box);
           div1.innerHTML+=localStorage.getItem(`mdiv${i}`);
           localStorage.setItem(`latlng${i}`,mapEvent.latlng);
           

            // If selected type is "Running"
            if(ty=="Running"){
               if(!(di>0) || !(dur>0) || !(cad>0))
               {
                  alert("Inputs have to be positive numbers.");
               }else {

         // Saving running records to LocalStorage
           localStorage.setItem(`inputType${i}`,ty);
           localStorage.setItem(`inputDistance${i}`,di);
           localStorage.setItem(`inputDuration${i}`,dur);
           localStorage.setItem(`inputCadence${i}`,cad);
           localStorage.setItem(`avg${i}`,avg);
           localStorage.setItem(`day${i}`,a);
               let typee=localStorage.getItem(`inputType${i}`);
               let datee=localStorage.getItem(`day${i}`);
               let dis=localStorage.getItem(`inputDistance${i}`);
               let durr=localStorage.getItem(`inputDuration${i}`);
               let av=localStorage.getItem(`avg${i}`);
               let cade=localStorage.getItem(`inputCadence${i}`);

               // Displaying running records after submitting
               document.getElementById(`mdiv${i}`).style.borderColor="#73ff00";
               document.getElementById(`typeValue${i}`).innerHTML=`${typee} on ${datee}`;
               document.getElementById(`distValueRun${i}`).innerHTML=`&#127939;${dis}Km`;
               document.getElementById(`durValue${i}`).innerHTML=`&#8986;${durr}Min`;
               document.getElementById(`timeValue${i}`).innerHTML=`&#9889;${av}Min/Km`;
               document.getElementById(`stepValue${i}`).innerHTML=`&#128099;${cade}SPM`; 

               // Running record marked on the map
               // let {lat,lng}=localStorage.getItem(`latlng${i}`);
               L.marker([lat,lng])
               .addTo(map)
               .bindPopup(L.popup({
               maxWidth:250,
               minWidth:100,
               autoClose:false,
               closeOnClick:false,
               className:'running-popup',
         }))
         .setPopupContent(`${typee} on <br> ${datee}`)
         .openPopup();
               }
            } 

            // If the selcted type is "Cycling"
            else if(ty=="Cycling"){ 
               if(!(di>0) || !(dur>0) || !(elv>0))
               {
                  alert("Inputs have to be positive numbers.");
               }else{

         // Saving cycling records to LocalStorage
           localStorage.setItem(`inputType${i}`,ty);
           localStorage.setItem(`inputDistance${i}`,di);
           localStorage.setItem(`inputDuration${i}`,dur);
           localStorage.setItem(`avg${i}`,avg);
           localStorage.setItem(`inputElevation${i}`,elv);
           localStorage.setItem(`day${i}`,a);
           let typee=localStorage.getItem(`inputType${i}`);
           let datee=localStorage.getItem(`day${i}`);
           let dis=localStorage.getItem(`inputDistance${i}`);
               let durr=localStorage.getItem(`inputDuration${i}`);
               let av=localStorage.getItem(`avg${i}`);
               let eleve=localStorage.getItem(`inputElevation${i}`);

               // Displaying cycling records after submitting
               document.getElementById(`mdiv${i}`).style.borderColor="#ff0000";
               document.getElementById(`typeValue${i}`).innerHTML=`${typee} on ${datee}`;
               document.getElementById(`distValueCycle${i}`).innerHTML+=`&#128692;${dis}Km`;
               document.getElementById(`durValue${i}`).innerHTML=`&#8986;${durr}Min`;
               document.getElementById(`timeValue${i}`).innerHTML=`&#9889;${av}Min/Km`;
               document.getElementById(`speedValue${i}`).innerHTML=`&#128185;${eleve}M`; 
               
               // Cycling record marked on the map
               L.marker([lat,lng])
               .addTo(map)
              .bindPopup(L.popup({
                  maxWidth:250,
                  minWidth:100,
                  autoClose:false,
                  closeOnClick:false,
                  className:'cycling-popup',
               }))
              .setPopupContent(`${typee} on <br> ${datee}`)
         .openPopup();
               }
            }
               
               break;
    }
    else {
      continue;
    }
            }
          
          });
})
        },
        function(){
            alert("Could not get your position");
        }
    );

    

// Display saved records
// After reload
function myFunction(L){
   for(let i=1;localStorage.getItem(`mdiv${i}`)!=null;i++){
        div1.innerHTML+=localStorage.getItem(`mdiv${i}`);
        let typee=localStorage.getItem(`inputType${i}`);
               let datee=localStorage.getItem(`day${i}`);
               let dis=localStorage.getItem(`inputDistance${i}`);
               let durr=localStorage.getItem(`inputDuration${i}`);
               let av=localStorage.getItem(`avg${i}`);
               let cade=localStorage.getItem(`inputCadence${i}`);
               let eleve=localStorage.getItem(`inputElevation${i}`);

               if(typee==="Running"){
               document.getElementById(`mdiv${i}`).style.borderColor="#73ff00";
               document.getElementById(`typeValue${i}`).innerHTML=`${typee} on ${datee}`;
               document.getElementById(`distValueRun${i}`).innerHTML=`&#127939;${dis} Km`;
               document.getElementById(`durValue${i}`).innerHTML=`&#8986;${durr} Min`;
               document.getElementById(`timeValue${i}`).innerHTML=`&#9889;${av} Min/Km`;
               document.getElementById(`stepValue${i}`).innerHTML=`&#128099;${cade} SPM`; 
               } else if(typee==="Cycling"){
               document.getElementById(`mdiv${i}`).style.borderColor="#ff0000";
               document.getElementById(`typeValue${i}`).innerHTML=`${typee} on ${datee}`;
               document.getElementById(`distValueCycle${i}`).innerHTML=`&#128692;${dis} Km`;
               document.getElementById(`durValue${i}`).innerHTML=`&#8986;${durr} Min`;
               document.getElementById(`timeValue${i}`).innerHTML=`&#9889;${av} Min/Km`;
               document.getElementById(`speedValue${i}`).innerHTML=`&#128185;${eleve} M`; 
               }
    }
}
myFunction();