import axios from '../../http/axios/index.js'
import query from '../../querys/administrador.js'
export default {
    async getEncuestas(/*{ commit, state }*/){
        try{
            let res = await axios.post('/graphql',{'query' : query.queryEncuestas})
            return res
        }
        catch ( err ){
            return err
        }
    },
}