function HightLight({filter, str}) {
    if (!filter) return str
    const regExp = new RegExp(filter, "ig")
    const matchValue = str.match(regExp)
    if (matchValue) {
      return str.split(regExp).map((symbol, index, array) => {
        if (index < array.length - 1) {
          const c = matchValue.shift()
          return (<div class="hightlight"  key={index}>{symbol}<span>{c}</span></div>)
}
return symbol
})
}
return str
}
  export default HightLight