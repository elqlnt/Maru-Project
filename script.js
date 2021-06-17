function testfunc(){
  console.log('Not available')
};

function call_api(mtd){
  show_popup();
  
  input_data = [{"OperationType": mtd}];

  if (mtd == 'QUERY'){
    var input_keys = {
      "User":document.getElementById('user_input').value,
      "Timestamp":'*',
    };

    input_data[0].Keys = input_keys;

    throw_api(mtd,JSON.stringify(input_data).slice(1,-1));
  }
  
  if (mtd == 'PUT'){
    const date = new Date();
    
    when_val = document.getElementById('when_input').value
    where_val = document.getElementById('where_input').value
    who_val = document.getElementById('who_input').value
    what_val = document.getElementById('what_input').value
  
    if (when_val == '' || where_val == '' || who_val == '' || what_val == ''){
      document.getElementById("data-table").remove();
      document.getElementById("popup-in").innerHTML= '<div id="data-table"></div>';
      document.getElementById("data-table").innerHTML= '<h>Error!!<br>please input all data</h>';
      return;
    }
    
    var input_keys = {
      "User":document.getElementById('user_input').value,
      "Timestamp":Number(String(date.getFullYear())+('00' + (date.getMonth()+ 1 )).slice(-2)+('00' + date.getDate()).slice(-2)+('00' + date.getHours()).slice(-2)+('00' + date.getMinutes()).slice(-2)+('00' + date.getSeconds()).slice(-2)),
      "when":when_val,
      "where":where_val,
      "who":who_val,
      "what":what_val,
    };


    input_data[0].Keys = input_keys;

    throw_api(mtd,JSON.stringify(input_data).slice(1,-1));

    document.getElementById("data-table").remove();
    document.getElementById("popup-in").innerHTML= '<div id="data-table"></div>';
    document.getElementById("data-table").innerHTML= '<h>Thank you for input!</h>';
    
    //mtd = 'SCAN';
  }
  //redefine(case of mtd = 'PUT')
  /*
  input_data = [{"OperationType": mtd}];
  throw_api(mtd,JSON.stringify(input_data).slice(1,-1)).then(json =>
     (function (){
       const from_json = JSON.parse(JSON.stringify(json));
       console.log(from_json.Items);
       var table = new Tabulator(
        "#data-table", {
          layout:"fitColumns",
          height:"600px",
          data:from_json.Items,
          columns:[
            {title:"What", field:"what"},
            {title:"Timestamp", field:"Timestamp"},
            {title:"User", field:"User"},
            {title:"When", field:"when"},
            {title:"Where", field:"where"},
            {title:"Who", field:"who"},
          ]
        })
     }())
  );
  */
};

//return json from api
function throw_api(mtd,operation_string){

  let url = 'https://gkc7kxu0qf.execute-api.ap-northeast-1.amazonaws.com/EBK/dynamoctr';

  operation_option = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
    body: operation_string
  }
  
  return fetch(url,operation_option)
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch(error => {
      alert('Error!');
    });
};

function randomize(){
  show_popup();
  
  input_data = [{"OperationType": 'SCAN'}];

  throw_api('SCAN',JSON.stringify(input_data).slice(1,-1)).then(json =>
    (function (){
      const from_json = JSON.parse(JSON.stringify(json));
 
      var min = 0 ;
      var max = from_json.Items.length ;

      var arr_index_who = Math.floor( Math.random() * (max - min) ) + min;
      var arr_index_when = Math.floor( Math.random() * (max - min) ) + min;
      var arr_index_where = Math.floor( Math.random() * (max - min) ) + min;
      var arr_index_what = Math.floor( Math.random() * (max - min) ) + min;
      var arr_index_user = Math.floor( Math.random() * (max - min) ) + min;
      
      rdm_str = from_json.Items[arr_index_who]['who'] + 'が' + from_json.Items[arr_index_when]['when'] + '' + from_json.Items[arr_index_where]['where'] + 'で' + from_json.Items[arr_index_what]['what'] + 'した。' 
    
      //console.log(rdm_str);

      document.getElementById("data-table").remove();
      document.getElementById("popup-in").innerHTML= '<div id="data-table"></div>';
      document.getElementById("data-table").innerHTML= '<h>' + rdm_str + '</h>';
    }())
 );
}