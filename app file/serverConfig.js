
//property server configs



let urlConfig = {   

  
  middleware: {
      
  dev: {
          
  url: "http://192.168.1.214:8222/"
    
    },
      
  prod: {
         
   url: "http://192.168.1.214:8222/"
     
   }
   
 },

 
   blockchain: {
   
     dev: {
         
   url: "http://192.168.1.214:8777/"
     
   },
    
    prod: {
        
    url: "http://192.168.1.214:8777/"
   
     }
    
  }
 

 };

 

 module.exports = urlConfig;
