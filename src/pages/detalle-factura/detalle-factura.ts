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
    console.log(this.Factura);
  }

  async ionViewDidLoad() {
    //this.ListaCobros = await this.sqlmanselec
    this.ListaCobros = await this.sqlman.selectDetalleCobro(this.Factura.IDFV);
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
          console.log(this.Factura)
          this.sqlman.insertarDatos("CtasCobrar",registro).then(()=>{
            this.sqlman.insertarDatos("Facturas",this.Factura).then(()=>{
              this.ionViewDidLoad();
            })
          })
        }
      });
    }else{
      this.show.showToast("Error al registar el monto")
    }

  }

  eliminarCobro(cta:CtasCobrar){
    if(cta.saveMovil){
      this.Factura.Saldo = this.Factura.Saldo.valueOf()+cta.Valor.valueOf();
      this.sqlman.eliminarData("CtasCobrar",cta).then((res)=>{
        this.sqlman.insertarDatos("Facturas",this.Factura).then(()=>{
          this.ionViewDidLoad();
        })
      })
    }
  }
}
