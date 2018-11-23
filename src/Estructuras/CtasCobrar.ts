import { Table,PrimaryColumn, Column } from 'ionic-orm'
// import {Direcciones} from "../home/Direcciones";
@Table()
export class CtasCobrar {

  @PrimaryColumn("int", { generated: true })
  IDCC: number;

  @Column({nullable:true})
  IDSU: number;

  @Column({nullable:true})
  IDPT: number;

  @Column({nullable:true})
  IDFV: number;

  @Column({nullable:true})
  IDUS: number;

  @Column({nullable:true})
  IDEP: number;

  @Column({nullable:true})
  Fecha: Date;
   
  @Column({nullable:true})
  Tipo: string;
  
  @Column({nullable:true})
  FormaPago: string;

  @Column({nullable:true})
  Valor : number;

  @Column({nullable:true})
  Saldo: number;

  @Column({nullable:true})
  PorcentajeComision: number;

  @Column({nullable:true})
  Comision: number;

  @Column({nullable:true})
  Estado: number;

  @Column({nullable:true,default:false})
  saveMovil: boolean;
}