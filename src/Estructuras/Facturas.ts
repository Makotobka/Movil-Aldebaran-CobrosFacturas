import { Table,PrimaryColumn, Column } from 'ionic-orm'
// import {Direcciones} from "../home/Direcciones";
@Table()
export class Facturas {

  @PrimaryColumn()  IDFV: number;
  @Column({nullable:true})  Fecha: Date;
  @Column({nullable:true})  TIPO: string;
  @Column({nullable:true})  Autorizacion: string;
  @Column({nullable:true})  Numero: string;   
  @Column({nullable:true})  FORMAPAGO: string;
  @Column({nullable:true})  COMISIONPORC: number;  
  @Column({nullable:true})  Comision: number;
  @Column({nullable:true})  SubtotalIVA: number;
  @Column({nullable:true})  SUBTOTAL0 : number;
  @Column({nullable:true})  Subtotal: number;
  @Column({nullable:true})  DESCPORC: number;
  @Column({nullable:true})  Descuento: number;
  @Column({nullable:true})  SubtotalIVADesc: number;
  @Column({nullable:true})  SubtotalIVA0Desc: number;
  @Column({nullable:true})  IVA: number;
  @Column({nullable:true})  Total: number;
  @Column({nullable:true})  Saldo: number;
  @Column({nullable:true})  ESTADO: string;
  @Column({nullable:true})  IDCT: number;
  @Column({nullable:true})  CEDRUC: string;
  @Column({nullable:true})  CLIENTE: string;
  @Column({nullable:true})  Direccion: string;
  @Column({nullable:true})  Telefono: string;
  @Column({nullable:true})  IDUS: number;
  @Column({nullable:true})  USUARIONOMBRE: string;
  @Column({nullable:true})  USUARIO: string;
  @Column({nullable:true})  IDPT: number;
  @Column({nullable:true})  PUNTOVENTA: string;
  @Column({nullable:true})  AutorizacionFA: number;
  @Column({nullable:true})  AutorizacionNV: number;
  @Column({nullable:true})  Serie1: string;
  @Column({nullable:true})  Serie2: string;
  @Column({nullable:true})  SecuenciaFA: number;
  @Column({nullable:true})  SecuenciaNV: number;
  @Column({nullable:true})  IDSU: number;
  @Column({nullable:true})  SUCURSAL: string;
  @Column({nullable:true})  Administrador: string;
  @Column({nullable:true})  SUCDIRECCION: string;
  @Column({nullable:true})  SUCTELEFONO: string;
  @Column({nullable:true})  IDCI: Number;
  @Column({nullable:true})  CIUDAD: String;
  @Column({nullable:true})  IDEP: Number;
  @Column({nullable:true})  VENDEDOR: String;
  @Column({nullable:true})  IDCG: Number;
  @Column({nullable:true})  CATEGORIACLIENTE: String;

}