import Vue from "vue"
import { AclInstaller, AclCreate, AclRule } from "vue-acl"
import router from "@/router"
//import store from '../store/store'

Vue.use(AclInstaller)
let initialRole = "public"

//const userInfo = store.state.auth.AppActiveUser

if(initialRole) {
  initialRole = "admin"
}

export default new AclCreate({
  initial: initialRole,
  notfound: "/pages/not-authorized",
  router,
  acceptLocalRules: true,
  globalRules: {
    admin: new AclRule("admin").generate(),
    editor: new AclRule("editor").or("admin").generate(),
    Authenticated : new AclRule("admin").or("editor").or("Authenticated").generate(),
    public: new AclRule("public").or("admin").or("editor").or("Authenticated").generate(),
  }
})
