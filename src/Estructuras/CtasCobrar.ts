import { Table,PrimaryColumn, Column } from 'ionic-orm'
// import {Direcciones} from "../home/Direcciones";
@Table()
export class CtasCobrar {

  @PrimaryColumn("int", { generated: true })
  ID_CC: number;

  @Column()
  IDSU: number;

  @Column()
  IDPtoVta: number;

  @Column()
  IDFV: number;

  @Column()
  IDUS: number;

  @Column()
  IDEP: number;
   
  @Column()
  Fecha: Date;
  
  @Column()
  Tipo: string;

  @Column()
  FormaPago : string;

  @Column()
  Valor: number;

  @Column()
  PorcentajeComision: number;

  @Column()
  Comision: number;

  @Column()
  Estado: string;
}