import './index.less' // 引入css
import './css/main/index.css'
import A from './a'

class Animal {
  constructor (name) {
    this.name = name
  }
  getName () {
    return this.name
  }
}


const dog = new Animal('dog')
console.log('aa')
console.log('aa')

A()