import { CtasCobrar } from './../../Estructuras/CtasCobrar';
import { SqlManagerProvider } from './../../providers/sql-manager/sql-manager';
import { Facturas } from './../../Estructuras/Facturas';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import { ShowProvider } from '../../providers/show/show';
import { Usuarios } from '../../Estructuras/Usuarios';
import { IfObservable } from 'rxjs/observable/IfObservable';

/**
 * Generated class for the DetalleFacturaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle-factura',
  templateUrl: 'detalle-factura.html',
})
export class DetalleFacturaPage {

  public Factura:Facturas
  public ListaCobros:CtasCobrar[]=[];
  public sumaCtsCobrar=0;
  private isCambio=false;

  constructor(private show:ShowProvider,private sqlman:SqlManagerProvider,public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
    this.Factura = this.navParams.get("Fact");
  }

  async ionViewDidLoad() {
    //this.ListaCobros = await this.sqlmanselec
    this.ListaCobros = await this.sqlman.selectDetalleCobro(this.Factura.IDFV);
    console.log(this.ListaCobros)
    this.sumaCtsCobrar=0;
    for (let i = 0; i <  this.ListaCobros.length; i++) {
      const element =  this.ListaCobros[i];      
      this.sumaCtsCobrar = this.sumaCtsCobrar.valueOf()+element.Valor.valueOf();
    }
  }

  async anadirCobro(){    
    this.show.showAlertInputs("AÑADIR COBRO",[{
        text:'Cancelar',
        handler: data=>{
          
        }
      },{
        text:'Registrar',
        handler: data=>{
          this.guardarCobros(data.Valor);
        }
      }
     ],[
        {
          name:'Valor',
          placeholder:'Valor',
          type: 'number'
        }
      ]);
  }

  async guardarCobros(valor:number){
    if(valor<=this.Factura.Saldo && (this.Factura.Saldo-valor)>=0 && valor>0 ){
      let Login = await this.sqlman.selectData("Usuarios","U",'U.isLogin='+true).then((resUsuario:Usuarios[])=>{
        if(resUsuario.length>0){
  
          this.isCambio=true;
          this.Factura.Saldo = this.Factura.Saldo.valueOf()-valor.valueOf();
          if(this.Factura.Saldo.valueOf()<=0.009){
            this.Factura.Saldo = 0;
          }
          let registro = {
            IDSU:this.Factura.IDSU,
            IDPT:this.Factura.IDPT,
            IDFV:this.Factura.IDFV,
            IDUS:resUsuario[0].IDUS,
            IDEP:null,
            Fecha:new Date,
            Tipo:"C",
            FormaPago:"EFECTIVO",
            Valor:valor,
            Saldo:this.Factura.Saldo,
            PorcentajeComision:0,
            Comision:0,
            Estado:true,
            saveMovil:true
          }
  
          this.sqlman.insertarDatos("CtasCobrar",registro).then(()=>{
            this.sqlman.insertarDatos("Facturas",this.Factura).then(()=>{
              this.ionViewDidLoad();
            })
          })
        }
      });
    }else{
      console.log("Error al registar el monto")
      this.show.showToast("Error al registar el monto")
    }

  }

  async editarRegistro(fila:CtasCobrar){
    if(fila.saveMovil){
      let temp:any = (await this.sqlman.selectData("Configuracion","C",'C.Tipo=="montoPagoCobrar"'))[0];
      let textoValor=undefined;
      if(temp.Estado){
        textoValor="Valor Anterior: $ "+fila.Valor;
      }
      this.show.showAlertInputs("EDITAR COBRO",
        [ 
          {
            text:'Cancelar'
          },   
          {
            text:'Eliminar',
            handler: data=>{
              this.eliminarCobro(fila);
            }
          }
        ],[],textoValor);
    }
    
  }

  eliminarCobro(cta:CtasCobrar){
    if(cta.saveMovil){
      this.Factura.Saldo = this.Factura.Saldo.valueOf()+cta.Valor.valueOf();
      this.sqlman.eliminarData("CtasCobrar",cta).then((res)=>{
        console.log("Eliminado ",res);
        this.sqlman.insertarDatos("Facturas",this.Factura).then(()=>{
          console.log("Editado Completo");
          this.ionViewDidLoad();
        })
      })
    }
  }

  editarCobro(cta:CtasCobrar,valor:number){
    if(cta.saveMovil){
      if(valor<=this.Factura.Saldo && (this.Factura.Saldo-valor)>=0 && valor>0 ){
        let res:number = valor.valueOf() - cta.Valor.valueOf();   
        if(res>=0){
          this.Factura.Saldo = this.Factura.Saldo.valueOf()-res.valueOf();
        }else{
          this.Factura.Saldo = this.Factura.Saldo.valueOf()+(res.valueOf()*-1);
        }
        cta.Saldo = this.Factura.Saldo;
        cta.Valor = valor;
        this.sqlman.insertarDatos("CtasCobrar",cta).then(()=>{
          this.sqlman.insertarDatos("Facturas",this.Factura).then(()=>{
            console.log("Editado Completo");
            this.ionViewDidLoad();
          })
        })
      }else{
        this.show.showToast("Error al registar el monto")
      }
    }
  }
}
