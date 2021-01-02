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
                    <v-text-field v-model="rol" autofocus color="accent" label="rol" required>
                    </v-text-field>
                     <v-text-field v-model="nombre" autofocus color="accent" label="nombre" required>
                    </v-text-field>
                  <v-text-field v-model="tipo_documento" autofocus color="accent" label="tipo_documento" required>
                    </v-text-field>
                     <v-text-field v-model="num_documento" autofocus color="accent" label="num_documento" required>
                    </v-text-field>
                     <v-text-field v-model="direccion" autofocus color="accent" label="direccion" required>
                    </v-text-field>
                     <v-text-field v-model="telefono" autofocus color="accent" label="telefono" required>
                    </v-text-field>
                     <v-text-field v-model="email" autofocus color="accent" label="email" required>
                    </v-text-field>
                     <v-text-field v-model="password" autofocus color="accent" label="password" required>
                    </v-text-field>
                     
                    <v-flex class="red--text" v-if="errorM">
                        {{errorM}}
                    </v-flex>
                </v-card-text>
                <v-card-actions class="px-3 pb-3">
                    <v-flex text-xs-right>
                        <v-btn @click="ingresar()" color="primary">Ingresar</v-btn>
                    </v-flex>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>
<script>
import axios from 'axios';
export default {
    data (){
        return{
            rol:'',
            nombre:'',
            tipo_documento:'',
            num_documento:'',
            direccion:'',
            telefono:'',
            email:'',
            password:'',
            errorM:null
        }
    },
    methods:{
        ingresar(){
            axios.post('usuario/add',
            {rol: this.rol,
            nombre: this.nombre,
            tipo_documento: this.tipo_documento,
            num_documento: this.num_documento,
            direccion: this.direccion,
            telefono: this.telefono,
            email: this.email,
            password: this.password,})
           /*  .then(respuesta =>{
                return respuesta.data;
            })
            .then(data =>{
                this.$store.dispatch("guardarToken",data.tokenReturn);
                this.$router.push({name: 'home'});
            }) */
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

