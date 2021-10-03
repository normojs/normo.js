export default `
function set(path, value){
  let paths = path.split('/')
  let newNode = {}
  let subNode = null
  paths.forEach((key, index)=>{
    if(index == 0){
      // 第一个
      let node = {}
      node[key] = {}
      newNode = node
      subNode = node[key]
    }else if(index == paths.length - 1){
      // 最后一个
      subNode[key] = value
    }else{
      let node = subNode
      node[key] = {}
      subNode = node[key]
    }
  })
  return newNode
}
`