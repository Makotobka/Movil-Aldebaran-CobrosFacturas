import { Table,PrimaryColumn, Column } from 'ionic-orm'
// import {Direcciones} from "../home/Direcciones";
@Table()
export class VentasPendientes {

  @PrimaryColumn("int", { generated: true })
  ID_VP: number;

  @Column()
  IDFC: number;

  @Column()
  Fecha: Date;

  @Column()
  TIPO: string;

  @Column()
  Autorizacion: string;

  @Column()
  Numero: string;
   
  @Column()
  FORMAPAGO: string;
  
  @Column()
  SubtotalIVA: number;

  @Column()
  SUBTOTAL0 : number;

  @Column()
  Subtotal: number;

  @Column()
  DESCPORC: number;

  @Column()
  Descuento: number;

  @Column()
  SubtotalIVADesc: number;

  @Column()
  SubtotalIVA0Desc: number;

  @Column()
  IVA: number;

  @Column()
  Total: number;

  @Column()
  Saldo: number;

  @Column()
  ESTADO: string;

  @Column()
  IDPV: number;

  @Column()
  CEDRUC: string;

  @Column()
  PROVEEDOR: string;

  @Column()
  Direccion: string;

  @Column()
  Telefono: string;

  @Column()
  IDUS: number;

  @Column()
  USUARIONOMBRE: string;

  @Column()
  USUARIO: string;

  @Column()
  IDSU: number;

  @Column()
  SUCURSAL: string;

  @Column()
  Administrador: string;

  @Column()
  SUCDIRECCION: string;

  @Column()
  SUCTELEFONO: string;

  @Column()
  IDCI: number;

  @Column()
  CIUDAD: string;
}