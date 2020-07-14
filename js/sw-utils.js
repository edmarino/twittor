//sw-utils.js
//archivo auxiliar de SW
//para pasar cierta lógica acá


//Guarda en el cache dinámico
function actualizaCacheDinamico(dynamicCache,req,res){
	if(res.ok){
		return caches.open(dynamicCache).then(cache=>{
			cache.put(req,res.clone());
			return res.clone();
		});//caches.open(dynamicCache).then(cache=>{});
	}else{
		return res;
	}//if(res.ok){
}//function actualizaCacheDinamico(){