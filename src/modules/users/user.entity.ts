import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity({
  schema: 'central',
  name: 'pessoa',
})
export class Person {
  @PrimaryColumn()
  ni: string;

  @Column({
    name: 'nome',
    nullable: true,
  })
  name: string;

  @Column({
    name: 'nome_usual',
    nullable: true,
  })
  usualName: string;

  @Column()
  email: string;

  @Column({
    name: 'cod_conf_email',
    nullable: true,
  })
  emailConfCode: string;

  @Column({
    name: 'cod_conf_sms',
    nullable: true,
  })
  smsConfCode: string;

  @Column({
    name: 'eh_cod_validacao',
    default: false,
  })
  isCodeValidation: string;

  @Column({
    name: 'foto_perfil',
    nullable: true,
  })
  profilePhoto: string;

  @Column({
    name: 'data_expiracao',
    nullable: true,
    default: null,
  })
  expirationDate: Date;

  @CreateDateColumn({
    name: 'criado_em',
  })
  createdIn: string;
}
