import { Table,PrimaryColumn, Column } from 'ionic-orm'

@Table()
export class Usuarios{
  @PrimaryColumn()  IDUS: number;
  @Column({nullable:true})  IDPF: number;
  @Column({nullable:true})  Nombre: string;
  @Column({nullable:true})  Apellido: string;
  @Column({nullable:true})  Login: string;   
  @Column({nullable:true})  Clave: string;
  @Column({nullable:true})  Estado: boolean;  
  @Column({nullable:true})  isLogin: boolean;
}