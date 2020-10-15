import { Order } from './order';
import { Review } from './Review';
import {Entity,PrimaryGeneratedColumn,Column,BaseEntity, OneToMany, OneToOne, JoinColumn} from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";




@ObjectType()
  @Entity()
  export class Tour extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    name!:string;

    @Field(()=>[String])
    @Column("text",{nullable:true})
    image?: string[];

    @Field()
    @Column()
    description!:string;

    @Field()
    @Column({nullable:true})
    location?:string;

    @Field()
    @Column( { type: "numeric",default:0.00})
    price!:number;

    @Column('int',{nullable:true})
    @Field(()=>[Review])
    @OneToMany(type=>Review,review=>review.tour,{ cascade: ["insert"] })
    reviews?:Review[];
    
    

  }