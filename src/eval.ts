// @ts-ignore
import vm from "@microflows/nodevm";
let incode = ''
let result: Promise<any>
const fetcher = ()=>{
  return Promise.resolve(incode)
}
export const _eval = function(code:string){
  if(incode === code && result){
    return result
  }
  incode = code
  result = vm('', fetcher)
  return result
}
