<template>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6 lg5 xl4>
            <v-card>
                <v-toolbar dark color="blue darken-3">
                    <v-toolbar-title>
                        Acceso al Sistema
                    </v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-text-field v-model="id" autofocus color="accent" label="id" required>
                    </v-text-field>
                    <v-text-field v-model="password" type="password" color="accent" label="Password" required>
                    </v-text-field>
                    <v-flex class="red--text" v-if="errorM">
                        {{errorM}}
                    </v-flex>
                </v-card-text>
                <v-card-actions class="px-3 pb-3">
                    <v-flex text-xs-right>
                        <v-btn  @click="ingresar()" color="primary">Ingresar</v-btn>
                    </v-flex>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
/* COMIENZA CODIGO */
import axios from 'axios';
export default {
    data (){
        return{
            id:'',
            password:'',
            errorM:null
        }
    },
    methods:{
        /* LOGIN */
        ingresar(){
            axios.post('/usuario/login',{'id': this.id, 'password': this.password})
            .then(res =>{
                   //console.log(res.data);
                 return res.data;
            }) 
            /* Si credenciales son correctas redirige a HOME */
                .then(data =>{
                this.$store.dispatch("guardarToken",data.tokenReturn);
                this.$router.push({name: 'home'});
            }) 
         .catch(error =>{
                //console.log(eror);
                this.errorM=null;
                if (error.response.status==404){
                    this.errorM='No existe el usuario o las credenciales son incorrectas.';
                } else{
                    this.errorM='Ocurrió un error con el servidor.';
                }
            });
        }
    }
}
</script>