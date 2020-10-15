import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany,
   
  } from "typeorm";
  import { Field, Int, ObjectType } from "type-graphql";
  import { Review } from './Review';
  import { Order } from './order';
  
  @ObjectType()
  @Entity()
  export class User extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    name!:string;
  
    @Field()
    @Column({unique:true})
    email!:string;
  
    @Field()
    @Column()
    password!: string;
  
    @Field()
    @Column({nullable:true})
    avatar?:string;

    @Column('int',{nullable:true})
    @Field(()=>[Review])
    @OneToMany(type=>Review,review=>review.user,{ cascade: ["insert"] })
    reviews?:Review[];


    @Column('int',{nullable:true})
    @Field(()=>[Order])
    @OneToMany(type=>Order,order=>order.user,{ cascade: ["insert"] })
    orders?:Order[];
    
  }