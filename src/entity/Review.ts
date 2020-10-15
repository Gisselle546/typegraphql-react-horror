import { Tour } from './Tour';
import { User } from './User';
import {Entity,PrimaryGeneratedColumn,Column,BaseEntity, ManyToOne,} from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";


@ObjectType()
@Entity()
export class Review extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Field()
    @Column()
    description!:string;

    @Field()
    @Column({default:0})
    rating!:number;

    @Field(()=>User)
    @Column('int',{nullable:true})
    userId!: number;
    @ManyToOne(type=>User,user=>user.reviews)
    user?:User

    @Field(()=>Tour)
    @Column('int',{nullable:true})
    tourId!:number;
    @ManyToOne(type=>Tour, tour=>tour.reviews)
    tour?:Tour

}