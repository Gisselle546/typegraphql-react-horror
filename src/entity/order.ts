import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
    Double, 
   
  } from "typeorm";
  import { Field, Int, ObjectType } from "type-graphql";
  
import { User } from "./User";

  @ObjectType()
  @Entity()
  export class Order extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Field()
    @Column()
    quantity!:number;
    
    @Field()
    @Column({nullable:true})
    reservation?: string;
  
    
    @Field()
    @Column({ type: "float"})
    total?:number;

    @Field(()=>User)
    @Column('int',{nullable:true})
    userId!: number;
    @ManyToOne(type=>User,user=>user.orders)
    user?:User


  }