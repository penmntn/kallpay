import Vue from "vue"
import { AclInstaller, AclCreate, AclRule } from "vue-acl"
import router from "@/router"
//import store from '../store/store'

Vue.use(AclInstaller)
let initialRole = "administrador"

//const userInfo = store.state.auth.AppActiveUser

if(initialRole) {
  initialRole = "empresa"
}

export default new AclCreate({
  initial: initialRole,
  notfound: "/pages/not-authorized",
  router,
  acceptLocalRules: true,
  globalRules: {
    empresa: new AclRule("empresa").generate(),
    administrador: new AclRule("administrador").generate(),
    estudiante: new AclRule("estudiante").generate(),
    Authenticated : new AclRule("estudiante").or("administrador").or("empresa").or("Authenticated").generate(),
    public: new AclRule("public").or("estudiante").or("administrador").or("empresa").or("Authenticated").generate(),
  }
})
