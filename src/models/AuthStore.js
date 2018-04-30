import { observable, action, runInAction } from "mobx"
import { persist,create } from 'mobx-persist'

class AuthStore{
  @persist @observable token = ''

  @action setToken(newToken){
    console.log("setToken",newToken);
    this.token = newToken;
  }

  @action clearToken(){
    localStorage.removeItem('auth')
  }

  hasToken = ()=>{
    console.log("checkToken",this.token);
    return this.token
  }
}

const hydrate = create({
})
const store = new AuthStore()
console.log(store)
export default store
export const authHydrate = hydrate('auth', store)
