import { observable } from 'mobx'
import { create, persist } from 'mobx-persist'
 
class SomeItem {
    @persist @observable  name = 'some'
    @persist @observable count = 0
}
 
class SomeStore {
    @persist('object') @observable         obj = { a: 1, b: 2 }
    @persist('list')   @observable     numList = [1,2,3,4]
    @persist('object', SomeItem) @observable s = new SomeItem
    @persist('list', SomeItem)   @observable l = []
}
 
const hydrate = create({
   
    jsonify: false  // if you use AsyncStorage, here shoud be true
                    // default: true
})
 
// create the state
export const someStore = new SomeStore()
 
hydrate('some', someStore)
    // post hydration
    .then(() => console.log('some hydrated'))