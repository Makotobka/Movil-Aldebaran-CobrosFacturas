import { Table,PrimaryColumn, Column } from 'ionic-orm'
// import {Direcciones} from "../home/Direcciones";
@Table()
export class Configuracion {

  @PrimaryColumn("int", { generated: true })
  ID: number;

  @Column({nullable:true})
  Tipo: number;

  @Column({nullable:true})
  Estado: boolean;

  @Column({nullable:true})
  Valor: number;

  @Column({nullable:true})
  Objeto: any;
}