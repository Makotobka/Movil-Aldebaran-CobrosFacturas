import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { SqlManagerProvider } from '../../providers/sql-manager/sql-manager';
import { Chart } from 'chart.js';
import { colorFondoPaste, colorBordePaste } from '../../app/app.config';
import { Facturas } from '../../Estructuras/Facturas';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html',
})
export class PrincipalPage {

  @ViewChild('grafCobro') canvaCobro;
  private totalFacturasPagadas:number=0;
  private totalPersonas:number=0;
  private totalRecaudado:number=0;
  private totalDeuda:number=0;
  private totalDiario:number=0;

  constructor(private modal:ModalController,private sqlMan:SqlManagerProvider ,public navCtrl: NavController, public navParams: NavParams) {
    
  }

  async ionViewWillEnter(){
    await this.calcularValores();
    await this.crearGraficos();
    await this.llenarGraficos();
  }

  private unirClientes(resData:any[]){
    let temp=[]
    for (let i = 0; i < resData.length; i++) {
      const element = resData[i];
      if(temp.length===0){
        temp.push({
          IDCT:element.IDCT,
          CLIENTE: element.CLIENTE,
          Saldo:element.Saldo,
          Total:element.Total
        })
        
      }else{
        let exist:boolean=false;
        for (let j = 0; j < temp.length; j++) {
          const item = temp[j];
          if(element.IDCT === item.IDCT){            
            item.Saldo=item.Saldo.valueOf()+element.Saldo.valueOf();
            item.Total=item.Total.valueOf()+element.Total.valueOf();
            exist=true;
            
            break;
          }          
        }
        if(!exist){
          temp.push({
            IDCT:element.IDCT,
            CLIENTE: element.CLIENTE,
            Saldo:element.Saldo,
            Total:element.Total
          })
          
        }
      }
    }
    return temp;
  }

  private async calcularValores(){
    this.totalDeuda=0;this.totalRecaudado=0;this.totalDiario=0,this.totalFacturasPagadas=0;;
    let listaCobrado = await this.sqlMan.selectData("CtasCobrar","CTA","CTA.saveMovil==true");
    let listaFacturasTotales = await this.sqlMan.selectData("Facturas","F","F.Saldo>0");
    listaFacturasTotales.forEach((fac:Facturas) => {      
      this.totalDeuda = this.totalDeuda.valueOf()+fac.Total.valueOf();
    });
    let listaFacturas=[];
    let hoy:Date = new Date();
    for (let i = 0; i < listaCobrado.length; i++) {
      const element:any = listaCobrado[i];
      if(hoy.getFullYear()===element.Fecha.getFullYear() && hoy.getMonth()===element.Fecha.getMonth() && hoy.getDay()===element.Fecha.getDay()){
        this.totalDiario= this.totalDiario.valueOf()+element.Valor.valueOf();
      }
      listaFacturas.push((await this.sqlMan.selectData("Facturas","F","F.IDFV="+element.IDFV))[0])
      this.totalRecaudado= this.totalRecaudado.valueOf()+element.Valor.valueOf();
    }
    let listaClientes = await this.unirClientes(listaFacturas);    
    this.totalPersonas = listaClientes.length;

    for (let i = 0; i < listaFacturas.length; i++) {
      const element = listaFacturas[i];
      if(element.Saldo===0){
        this.totalFacturasPagadas = this.totalFacturasPagadas.valueOf()+1;    
      }
    }
  }

  crearGraficos(){
    if(this.canvaCobro.nativeElement!=undefined){
      this.canvaCobro = new Chart(this.canvaCobro.nativeElement, { 
        type: 'doughnut',
        data: {
            labels: [
              "Total",
              "Abonado"
            ],            
            datasets: [{      
                label: 'Sin Caja',
                data:[
                  100,
                  35.26
                ],
                backgroundColor: colorFondoPaste,
                borderColor: colorBordePaste,
                borderWidth: 3
            }]           
        },
        options: {
          legend: {
            position: "bottom",
            display: true        
          },
          animation:{
            animateRotate:true,
            animateScale:true
          }
        }
      });
    }
    //------------------ UPDATE ------------------------------
    this.canvaCobro.update()    
  }

  llenarGraficos(){
    this.canvaCobro.data.datasets[0].data = [this.totalDeuda,this.totalRecaudado];
    console.log(this.canvaCobro)
    this.canvaCobro.update() 
  }
  
  logout(){    
    this.sqlMan.selectData("Usuarios","U",'U.isLogin='+true).then((res:any)=>{      
      res[0].isLogin=false;
      this.sqlMan.insertarDatos("Usuarios",res[0]);
      this.navCtrl.setRoot(LoginPage);
    });
  }
}
