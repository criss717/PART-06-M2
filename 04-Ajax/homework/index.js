let clickshow=document.getElementById("boton");
let clicksearch=document.getElementById("search");
let clickagg=document.getElementById("agg");
let input=document.getElementById("input");
let showsearch=document.createElement("span");
let clickdelete=document.getElementById("delete");
let inputdelete=document.getElementById("inputDelete");
let showdelete=document.createElement("span");
let inputAgg=document.getElementById("inputAgg");
let showAgg=document.createElement("span");

showfriend= function(){
    lista.innerHTML="";
       
    $.get("http://localhost:5000/amigos", function(data) {
        console.log(data);
                             
       
        for (let i = 0; i < data.length; i++) {
            var sublista=`<li> ${data[i].name} <button onclick="deletefriend(${data[i].id})">X </button> </li>`;
            lista.innerHTML+=sublista;
            
        }
                                    
             
         
    })

}

deletefriend=function(id){
    if(typeof id!=="number"){
        id=inputdelete.value;
        
    }

    $.get(`http://localhost:5000/amigos/${id}`, function(data) {
        console.log(data.name);
        savefriend=data.name;
    
        
    })
    
    $.ajax({
        type: "DELETE",
        url:`http://localhost:5000/amigos/${id}`,
        data: {
        
        
        },  success: function(data1){
            showdelete.innerText=`Tu amigo ${savefriend} fue borrado con exito`;
            sucess.appendChild(showdelete)
            showfriend();
            
            }

    });  
    inputdelete.value="";
         
    }


clickshow.addEventListener("click", showfriend);

   


clicksearch.addEventListener("click", function(e){
    
    let inputtext=input.value;
    
    $.get(`http://localhost:5000/amigos/${inputtext}`, function(data) {
        console.log(data.name);
        showsearch.innerText=data.name;
        amigo.appendChild(showsearch)
      
        
    })
    
    input.value="";
})

clickdelete.addEventListener("click", deletefriend)

clickagg.addEventListener("click", function(e){
   
    // let savefriend
    // $.get(`http://localhost:5000/amigos/${inputtext}`, function(data) {
    //     console.log(data.name);
    //     savefriend=data.name;
      
        
    // })
     
     $.post("http://localhost:5000/amigos", {
        
        name: "Cristian",
        age: 29,
        email: "cristian@henry.com"

     }, function(data3){
            console.log(data3[data3.length-1].name);
             let newfriend=data3[data3.length-1].id;
             showAgg.innerText=`Tu amigo ${newfriend} fue agregado con exito`;
             sucess2.appendChild(showAgg)
    
            
            }
)  
        })   
        