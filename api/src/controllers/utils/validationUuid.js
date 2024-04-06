const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const isUUID=(id)=>{
    if(uuidRegex.test(id))return true
    else return false
}
module.exports=isUUID