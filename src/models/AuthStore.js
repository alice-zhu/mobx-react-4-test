import { observable, action, runInAction } from "mobx"
import { persist,create } from 'mobx-persist'

class AuthStore{
  @persist @observable token = 'fff'

  @action setToken(newToken){
    console.log("setToken",newToken);
    this.token = newToken;
  }

  hasToken = ()=>{
    console.log("checkToken",this.token);
    return this.token
  }
}

const hydrate = create({
  storage: localStorage, 
  jsonify: false
})
console.log(create)
console.log(create({}))
const store = new AuthStore()
export default store
export const authHydrate = hydrate('token', store)
