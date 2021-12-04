//import fs from 'fs';
//import path from 'path';
import got from 'got';
   
//const dataDir = path.join(process.cwd(), 'data');
//const dataDir1 = path.join(process.cwd(), 'data');
const dataURL = 'https://dev-cs55-13-kikima.pantheonsite.io/wp-json/twentytwentyone-child/v1/special';
//Map for each JSON file?? Couldn't get both in one. Therefore paths for higher id numbers not recognized even though paths were constructed.
export async function getAllIds() {
  //const filepath = path.join(dataDir, "persons.json");
  //var filepath1 = path.join(dataDir, "people.json");
  //read file
  //const jsonString = fs.readFileSync(filepath, "utf8");

  
  let jsonString;
  try{
    jsonString= await got(dataURL);
    //console.log('jsonString.body');
  } catch(error){
    jsonString.body =[];
    console.log(error)

};
const jsonObj = JSON.parse(jsonString.body);
  return jsonObj.map(item => {
    return {
      params: {
        
        id: item.ID.toString(),
      
        
      }
    }//extracted id
  });
}
  // filepath1 = path.join(dataDir1, "people.json");
  //read file
  //const jsonString1 = fs.readFileSync(filepath1, "utf8");

 // const jsonObj1 = JSON.parse(jsonString);
 // jsonObj1.map(item1 => {
  //  return {
  //   params: {
  //      id: item1.id.toString(),
        
   //   }
  // }//extracted id
 // });
//}



//separate page for each person's data set
export async function getSortedList() {
  //const filePath = path.join(dataDir, 'persons.json')
  //const jsonString = fs.readFileSync(filePath, 'utf8');
  let jsonString;
  try{
    jsonString= await got(dataURL);
    console.log('jsonString.body');
  } catch(error){
    jsonString.body =[];
    console.log(error)

};

  const jsonObj = JSON.parse(jsonString.body);
  jsonObj.sort(function(a, b) {
    return a.post_title.localeCompare(b.post_title);

  });
  return jsonObj.map(item => {
    return {
      id: item.ID.toString(),
      name: item.post_title
    }
   // console.log(item.name);
  });

}

export async function getData(idRequested) {
//const filePath = path.join(dataDir, 'persons.json');
//const filePath1 = path.join(dataDir, 'friends.json');
//const filePath2 = path.join(dataDir, 'relations.json');
//const jsonString = fs.readFileSync(filePath, 'utf8');
//const jsonString1 = fs.readFileSync(filePath1, 'utf8');
//const jsonString2 = fs.readFileSync(filePath2, 'utf8');
  //read file

  let jsonString;
  try{
    jsonString= await got(dataURL);
    console.log('jsonString.body');
  } catch(error){
    jsonString.body =[];
    console.log(error)

};
const jsonObj = JSON.parse(jsonString.body);
//const jsonObj1 = JSON.parse(jsonString1);
//const jsonObj2 = JSON.parse(jsonString2);

  //find object value with the matching id
  const objMatch = jsonObj.filter(obj => {
    return obj.ID.toString() === idRequested;  
  }
  );
  
//console.log(idRequested);
  let objReturned;
  if (objMatch.length > 0) {
    objReturned = objMatch[0];
  }
  else{
    objReturned ={};
  }
  return objReturned;
}
    
  