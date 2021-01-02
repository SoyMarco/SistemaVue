<template>
  <v-layout align-start>
    <v-flex>
      <v-card>
        <v-card-title>
          Categoria
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Busqueda"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>

          <!-- AGREGAR NUEVA CATEGORIA -->
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Nuevo
              </v-btn>
            </template>
            
            <v-card>
              <v-card-title>
                <span class="headline">Nueva categoria</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.nombre"
                        label="Nombre"
                        autofocus
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.descripcion"
                        label="descripcion"
                      ></v-text-field>
                    </v-col>
                     
                      <v-col cols="12" sm="6" md="4" v-show="editedItem.valida">
                     <div class="red--text" v-for="v in editedItem.validaMensaje" :key="v" v-text="v"></div>
                    </v-col>
                    
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancelar
                </v-btn>
                <v-btn color="blue darken-1" text @click="guardar">
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!--TERMINA AGREGAR NUEVA CATEGORIA -->

          <!-- ACTIVAR O DESACTIVAR CATEGORIA -->
          <v-dialog v-model="editedItem.adModal" max-width="500px">
            <v-card>
              <v-card-title class="headline" v-if="editedItem.adAccion==1">
                <span class="headline">Desactivar Item</span>
                </v-card-title>

              <v-card-title class="headline" v-else-if="editedItem.adAccion==2">
                <span class="headline">Activar Item</span>
                </v-card-title>
            <v-card-text>
              Estas a punto de <span v-if="editedItem.adAccion==1">DESACTIVAR</span>
              <span v-if="editedItem.adAccion==2">ACTIVAR</span> el item {{editedItem.adNombre}}
            </v-card-text>
            <v-card-actions>
               <v-spacer></v-spacer>
               <v-btn @click="activarDesactivarCerrar()" color="yellow darken-4" text="text">Cancelar</v-btn>
               <v-btn v-if="editedItem.adAccion==1" @click="desactivar()" color="orange darken-4" text="text">Desactivar</v-btn>
            <v-btn v-if="editedItem.adAccion==2" @click="activar()" color="green darken-4" text="text">Activar</v-btn>
           
            </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- TERMINA ACTIVAR O DESACTIVAR CATEGORIA -->

        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="categorias"
          :search="search"
          class="elevation-1"
        >
          <template v-slot:[`item.estado`]="{ item }">
            <v-chip>
              <div v-if="item.estado === 1">
                <span class="green--text"> Activo</span>
              </div>
              <div v-else ><span class="red--text"> Inactivo</span></div>
            </v-chip>
          </template>
          <template v-slot:[`item.acciones`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)"> edit </v-icon>
            <template v-if="item.estado ===1">
                 <v-icon small @click="activarDesactivar(2,item)"> block </v-icon>
            </template>
          <template v-else>
                 <v-icon small @click="activarDesactivar(1,item)"> check </v-icon>
          </template>
            </template>
          

          <template v-slot:no-data>
            <v-btn color="primary" @click="listar()"> Resetear </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
/* COMIENZA CODIGO */
import axios from "axios";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    search: "",
    categorias: [],
    headers: [
      { text: "Nombre", value: "nombre", sortable: true },
      { text: "Descripcion", value: "descripcion", sortable: false },
      { text: "Estado", value: "estado", sortable: false },
      { text: "Acciones", value: "acciones", sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      id:'',
      nombre: "",
      descripcion: "",
      estado: "",
      valida: 0,
      validaMensaje:[],
      adModal:0,
      adAccion:0,
      adNombre:'',
      adId:''
    },
    defaultItem: {
      nombre: "",
      descripcion: "",
      estado: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.listar();
  },

  methods: {
    getColor(estado) {
      if (estado) {
        return "green";
      } else {
        return "red";
      }
    },
    listar() {
      const me = this;
      axios
        .get("/categoria/list")
        .then(function (response) {
          // console.log(response);
          me.categorias = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

      limpiar(){
        this.editedItem.id='';
        this.editedItem.nombre='';
        this.editedItem.descripcion='';
        this.editedItem.valida=0;
                this.editedItem.validaMensaje=[];
                this.editedItem.editedIndex=-1;
},

 validar(){ let i=0;
                this.editedItem.valida=0;
                this.editedItem.validaMensaje=[];
                if(!this.editedItem.nombre.length){
                    this.editedItem.validaMensaje.push('Error en NOMBRE*');
                    i++;
                    console.log(i);
                }
                if(!this.editedItem.descripcion.length){
                    this.editedItem.validaMensaje.push('Error en DESCRIPCION*');
                    i++;
                    console.log(i);
                }
                if (i>0){
                  this.editedItem.valida=1;
                  console.log( this.editedItem.validaMensaje)
                    console.log( i)
                } 
               
                return this.editedItem.valida;
            },

guardar(){
  let me=this;
  if (this.validar()){
    return;
  }
  if(this.editedItem.editedIndex >-1){
//CODIGO PARA EDITAR
 axios.put('/categoria/update',{'nombre':this.editedItem.nombre,'descripcion':this.editedItem.descripcion, 'id':this.editedItem.id,})
    .then(function(response){
        me.limpiar();
        me.close();
        me.listar();
            })
            .catch(function(error){
              console.log(error);
            });
  }else{ 
    //CODIGO PARA GUARDAR
    axios.post('/categoria/add',{'nombre':this.editedItem.nombre,'descripcion':this.editedItem.descripcion})
    .then(function(response){
        me.limpiar();
        me.close();
        me.listar();
            })
            .catch(function(error){
              console.log(error);
            })
          };
        },
        
     editItem (item) {
                this.editedItem.id=item.id;
                this.editedItem.nombre=item.nombre;
                this.editedItem.descripcion=item.descripcion;
                this.dialog = true;
                this.editedItem.editedIndex=1;
            },

//ACTIVAR O DESACTIVAR CATEGORIA
   activarDesactivar(accion,item){
     this.editedItem.adModal=1;
     this.editedItem.adNombre=item.nombre;
     this.editedItem.adId=item.id;
if(item.estado==1){
  this.editedItem.adAccion=1;
}else if(item.estado==2){
  this.editedItem.adAccion=2;
}else{
this.editedItem.adModal=0;
}
   },
activarDesactivarCerrar(){
  this.editedItem.adModal=0;
},
//ACTIVAR
   activar(){
     let me= this;
axios.put('/categoria/activar',{'id':this.editedItem.adId})
    .then(function(response){
      me.editedItem.adModal=0;
       me.editedItem.adAccion=0;
      me.editedItem.adNombre='';
      me.editedItem.adId=''; 
        me.listar();
            })
            .catch(function(error){
              console.log(error);
            });
   },
   //DESACTIVAR
   desactivar(){
let me=this;
axios.put('/categoria/desactivar',{'id':this.editedItem.adId})
    .then(function(response){
      me.editedItem.adModal=0;
       me.editedItem.adAccion=0;
      me.editedItem.adNombre='';
      me.editedItem.adId=''; 
        me.listar();
            })
            .catch(function(error){
              console.log(error);
            });
   },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.editedItem.phone='';
  this.editedItem.nombre='';
  this.editedItem.descripcion='';
        this.dialog = false;
       /*  this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        }); */
      },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

  },
};
</script>
